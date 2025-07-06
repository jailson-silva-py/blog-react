import { createContext, ReactNode, SetStateAction, useLayoutEffect, useState } from "react";

interface Iprops {

    tema: 'light' | 'dark',
    setTema: React.Dispatch<SetStateAction<'light' | 'dark'>>

}

export const TemaContext = createContext<Iprops>({tema:'dark', setTema:() => {}})

export const TemaContextProvider = ({children}:{children:ReactNode}) => {

    const [tema, setTema] = useState<'light' | 'dark'>((() => {

        const temaI = localStorage.getItem('tema')

        return (temaI === 'light' || temaI==='dark') ? temaI : 'dark'

    }))

    useLayoutEffect(() => {
      
        document.documentElement.setAttribute('data-theme', tema)
        localStorage.setItem('tema', tema)
       
    }, [tema, ])

    return (
    <TemaContext.Provider value={{tema, setTema}}>
        {children}
    </TemaContext.Provider>)

}