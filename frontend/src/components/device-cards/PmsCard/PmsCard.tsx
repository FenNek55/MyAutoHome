import { useState, useEffect } from "react";
import { timestampToDateStr } from "../../../helpers";
import BaseCard from "../../BaseCard/BaseCard";
import './PmsCard.css';

interface PmsEntry {
    id: number;
    timestamp: string;
    pm1: number;
    pm25: number;
    pm10: number;
}

const getPmClass = (pm: number, pmType: 'pm1' | 'pm25' | 'pm10') => {
    const types = {
        pm1: {
            good: 10,
            medium: 20,
        },
        pm25: {
            good: 20,
            medium: 40,
        },
        pm10: {
            good: 30,
            medium: 60,
        }
    }

    if (pm <= types[pmType].good) {
        return 'pms-card__value--good';
    } else if (pm <= types[pmType].medium) {
        return 'pms-card__value--medium';
    } else if (pm > types[pmType].medium) {
        return 'pms-card__value--bad';
    }

    return ''
}

const PmsCard = () => {
    const [pmsData, setPmsData] = useState<PmsEntry[]>([]);

    const fetchPmsData = () => {
        fetch('http://192.168.0.128:5000/pms')
            .then(res => res.json())
            .then((data) => {
                setPmsData(data)
            })
    }

    useEffect(() => {
        fetchPmsData();

        const intervalId = setInterval(() => {
            fetchPmsData();
        }, 60000);

        return () => clearInterval(intervalId);
    }, [])

    return (
        <BaseCard>
            <h2 className="pms-card__title">Jakość powietrza</h2>
            <div className="pms-card__last-update">Ostatnia aktualizacja: {timestampToDateStr(pmsData[0]?.timestamp)}</div>
            <div className="pms-card__label">PM 1.0: 
                <span className={`pms-card__value ${getPmClass(pmsData[0]?.pm1, 'pm1')}`}> {pmsData[0]?.pm1} µg/m3</span>
            </div>
            <div className="pms-card__label">PM 2.5: 
                <span className={`pms-card__value ${getPmClass(pmsData[0]?.pm25, 'pm25')}`}> {pmsData[0]?.pm25} µg/m3</span>
            </div>
            <div className="pms-card__label">PM 10:
                <span className={`pms-card__value ${getPmClass(pmsData[0]?.pm10, 'pm10')}`}> {pmsData[0]?.pm10} µg/m3</span>
            </div>
        </BaseCard>
    )
}

export default PmsCard;