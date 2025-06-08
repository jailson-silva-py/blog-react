import { useContext } from 'react'
import { MensagemContext } from '../context/MensagemContext'

const useMensagemContext = () => {

    const {state, dispatch} = useContext(MensagemContext)

    return {state, dispatch}

}

export default useMensagemContext