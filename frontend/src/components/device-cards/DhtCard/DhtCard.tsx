import BaseCard from "../../BaseCard/BaseCard"
import { useEffect, useState } from "react"
import { timestampToDateStr } from "../../../helpers"
import './DhtCard.css'

interface DhtEntry {
    id: number;
    timestamp: string;
    temperature: number;
    humidity: number;
}

const DhtCard = () => {
    const [dhtData, setDhtData] = useState<DhtEntry[]>([])

    const fetchDhtData = () => {
        fetch('http://192.168.0.128:5000/dht')
            .then(res => res.json())
            .then((data) => {
                setDhtData(data)
            })
    }

    useEffect(() => {
        fetchDhtData();

        const intervalId = setInterval(() => {
            fetchDhtData();
        }, 1000);

        return () => clearInterval(intervalId)
    }, [])

    return (
        <BaseCard>
            <h2>Warunki atmosferyczne</h2>
            <div className="pms-card__last-update">Ostatnia aktualizacja: {timestampToDateStr(dhtData[0]?.timestamp)}</div>
            <div className="dht-card__entry">Temperatura: <span className="dht-card__value">{dhtData[0]?.temperature}°C</span></div>
            <div className="dht-card__entry">Wilgotność: <span className="dht-card__value">{dhtData[0]?.humidity}%</span></div>
        </BaseCard>
    )
}

export default DhtCard