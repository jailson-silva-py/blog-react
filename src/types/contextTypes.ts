import { ReactNode, SetStateAction } from "react"

export interface ChildrenType {

    children:ReactNode

}

export interface createContextUserType {

    usuarioLogado: Usuario | null,
    setUsuarioLogado:React.Dispatch<SetStateAction<Usuario | null>>

}

export interface createContextLoadingType {

    loading: boolean
    setLoading:React.Dispatch<SetStateAction<boolean>>

}

export type CounterActionMessageDispatch = {type:'MOSTRAR'} | {type:'ESCONDER'} | {type:'RESET'}