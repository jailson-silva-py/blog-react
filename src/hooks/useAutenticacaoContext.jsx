import { useContext } from 'react'
import { AutenticacaoContext } from '../context/AutenticacaoContext'


export const useAutenticacaoContext = () => {

    const {usuarioLogado, setUsuarioLogado} = useContext(AutenticacaoContext)
    console.log(useContext(AutenticacaoContext))

    const logout = () => {

        localStorage.removeItem('usuario')
        setUsuarioLogado(null)

    }
    
    return { usuarioLogado, setUsuarioLogado, logout}

}