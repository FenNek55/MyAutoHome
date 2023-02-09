import BaseCard from "../../BaseCard/BaseCard"
import { useEffect, useState } from "react"
import { timestampToDateStr } from "../../../helpers"
import type { DhtEntry } from "../../../types"
import './DhtCard.css'

interface DhtCardProps {
    dhtData: DhtEntry[]
}

const DhtCard = ({dhtData}: DhtCardProps) => {
    const [dhtDataState, setDhtDataState] = useState<DhtEntry[]>([])

    useEffect(() => {
        setDhtDataState(dhtData)
    }, [dhtData])

    return (
        <BaseCard>
            <h2>Warunki atmosferyczne</h2>
            <div className="pms-card__last-update">Ostatnia aktualizacja: {timestampToDateStr(dhtDataState[0]?.timestamp)}</div>
            <div className="dht-card__entry">Temperatura: <span className="dht-card__value">{dhtDataState[0]?.temperature}°C</span></div>
            <div className="dht-card__entry">Wilgotność: <span className="dht-card__value">{dhtDataState[0]?.humidity}%</span></div>
        </BaseCard>
    )
}

export default DhtCard