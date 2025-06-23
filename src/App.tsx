import './App.css'
import {Outlet} from 'react-router-dom'
import BarraNavegacao from './components/BarraNavegacao/BarraNavegacao'
import Rodape from './components/Rodape/Rodape'

function App() {
  

  return (
    <>
      <BarraNavegacao/>
      <Outlet/>
      <Rodape/>
    </>
  )
}

export default App
