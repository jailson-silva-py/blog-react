import { createContext, useReducer} from 'react'
import { ChildrenType, CounterActionMessageDispatch } from '../types/contextTypes'

interface CounterState {

    mostrarMensagem:boolean

}


type ContextM = {state:CounterState,
    dispatch:React.Dispatch<CounterActionMessageDispatch>}


export const initialState = {

    mostrarMensagem:false,

}

export const MensagemContext = createContext<ContextM>({
    state:initialState,
    dispatch:() => {}})

export const reducer = (
    state:CounterState,
    action:CounterActionMessageDispatch
    ):CounterState => {

    switch (action.type) {

        case 'MOSTRAR':
            return {...state, mostrarMensagem:true}

        case 'ESCONDER':
            return {...state, mostrarMensagem:false}

        default:
            return {...state}

    }

} 

export const MensagemContextProvider = ({children}:ChildrenType) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (

        <MensagemContext.Provider value={{state, dispatch}}>
            {children}
        </MensagemContext.Provider>

    )

}

