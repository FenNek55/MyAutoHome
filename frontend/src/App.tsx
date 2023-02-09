import BlindsCard from './components/device-cards/BlindsCard/BlindsCard'
import PmsCard from './components/device-cards/PmsCard/PmsCard'
import DhtCard from './components/device-cards/DhtCard/DhtCard'
import './App.css'

function App() {
  return (
    <div className='container container--root'>
      <h1 className="app__title">MyAutoHome</h1>
      <div className='app__grid'>
        <BlindsCard name='Żaluzje sypialnia' openLink='http://192.168.0.136/open' closeLink='http://192.168.0.136/close'/>
        <PmsCard/>
        <DhtCard/>
      </div>
    </div>
  )
}

export default App
