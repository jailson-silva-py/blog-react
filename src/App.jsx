import { useState } from 'react'
import './App.css'
import {Outlet} from 'react-router-dom'
import BarraNavegacao from './components/BarraNavegacao'
import Rodape from './components/Rodape'

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
