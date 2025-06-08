import { createContext, useState, useEffect} from 'react'

export const AutenticacaoContext =  createContext();

export const AutenticacaoContextProvider = ({children}) => {

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

