import { createContext, useState, useEffect, ReactNode } from 'react'
import { createContextUserType } from '../types/contextTypes';

interface Iprops {

    children:ReactNode

}

export const AutenticacaoContext =  createContext<createContextUserType>({

    usuarioLogado:null,
    setUsuarioLogado:() => {}

});

export const AutenticacaoContextProvider = ({children}:Iprops) => {

    const [usuarioLogado, setUsuarioLogado] = useState(() => {

        const dados = localStorage.getItem('usuario')
        
        return dados ? JSON.parse(dados): null

    });

    useEffect(() => {

        usuarioLogado && localStorage.setItem('usuario', JSON.stringify(usuarioLogado))

    }, [usuarioLogado])


    return (

        <AutenticacaoContext.Provider value={{usuarioLogado, setUsuarioLogado}}>
            {children}
        </AutenticacaoContext.Provider>

    )

}

