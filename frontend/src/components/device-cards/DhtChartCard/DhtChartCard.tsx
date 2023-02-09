import BaseCard from "../../BaseCard/BaseCard"
import { timestampToDateStr, agregateDhtEntriesByHour } from "../../../helpers"
import type { DhtEntry } from "../../../types"
import { useEffect } from "react"
import Chart from 'chart.js/auto';
import './DhtChartCard.css'

interface DhtCardProps {
    dhtData: DhtEntry[]
}

const DhtChartCard = ({dhtData}: DhtCardProps) => {
    useEffect(() => {
        if(dhtData.length !== 0) {
            const dhtAgregatedData = agregateDhtEntriesByHour(dhtData)
            const dhtChart = new Chart('dht-chart', {
                type: 'line',
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
                data: {
                    labels: dhtAgregatedData.map((entry) => entry.hour),
                    datasets: [
                        {
                            label: 'Temperatura',
                            data: dhtAgregatedData.map((entry) => entry.temperature),
                        },
                        {
                            label: 'Wilgotność',
                            data: dhtAgregatedData.map((entry) => entry.humidity),
                        }
                    ]
                },
            })

            return () => {
                dhtChart.destroy()
            }
        }
    }, [dhtData])

    return (
        <div className="dht-chart-card">
            <BaseCard>
                <h2>Warunki atmosferyczne w czasie</h2>
                <div className="dht-chart-card__wrapper">
                    <canvas id="dht-chart"></canvas>
                </div>
            </BaseCard>
        </div>
    )
}

export default DhtChartCard