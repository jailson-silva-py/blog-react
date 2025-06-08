import { useContext, createContext, useReducer } from 'react'


export const MensagemContext = createContext()

const initialState = {

    mostrarMensagem:false,

}

const reducer = (state, action) => {

    switch (action.type) {

        case 'MOSTRAR':
            return {...state, mostrarMensagem:true}

        case 'ESCONDER':
            return {...state, mostrarMensagem:false}

        case 'RESET':
            return {...initialState}

    }

} 

export const MensagemContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (

        <MensagemContext.Provider value={{state, dispatch}}>{children}</MensagemContext.Provider>

    )

}

