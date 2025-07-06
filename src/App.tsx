import './App.css'
import {Outlet} from 'react-router-dom'
import BarraNavegacao from './components/BarraNavegacao/BarraNavegacao'
import Rodape from './components/Rodape/Rodape'
import BotaoMudaTema from './components/BotaoMudaTema/BotaoMudaTema'

function App() {
  

  return (
    <>
      <BarraNavegacao/>
      <Outlet/>
      <BotaoMudaTema/>
      <Rodape/>
    </>
  )
}

export default App
