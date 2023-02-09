import BlindsCard from './components/device-cards/BlindsCard/BlindsCard'
import PmsCard from './components/device-cards/PmsCard/PmsCard'
import DhtCard from './components/device-cards/DhtCard/DhtCard'
import DhtChartCard from './components/device-cards/DhtChartCard/DhtChartCard'
import type { DhtEntry } from './types'
import { useState, useEffect } from 'react'
import './App.css'


function App() {
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
    }, 60000);

    return () => clearInterval(intervalId)
}, [])

  return (
    <>
      <div className='container container--root'>
        <h1 className="app__title">MyAutoHome</h1>
        <div className='app__grid'>
          <BlindsCard name='Żaluzje sypialnia' openLink='http://192.168.0.136/open' closeLink='http://192.168.0.136/close'/>
          <PmsCard/>
          <DhtCard dhtData={dhtData}/>
          <DhtChartCard dhtData={dhtData}/>
        </div>
      </div>
      <div className='app__background'></div>
    </>
  )
}

export default App
