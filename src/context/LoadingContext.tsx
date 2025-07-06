import { createContext, useState } from 'react'
import { ChildrenType, createContextLoadingType } from '../types/contextTypes';


export const LoadingContext = createContext<createContextLoadingType>({loading:false, setLoading:() => {}});

export const LoadingContextProvider = ({children}:ChildrenType) => {

    const [loading, setLoading] = useState(false)

    return (

        <LoadingContext.Provider value={{loading, setLoading}}>{children}</LoadingContext.Provider>

    )

}