import { useState, useCallback, ChangeEvent, Dispatch, SetStateAction, FormEventHandler, FormEvent } from 'react'
import Formulario from '../components/Formulario/Formulario'
import CampoTextInput from '../components/CampoTextInput/CampoTextInput'
import BotaoSubmit from  '../components/BotaoSubmit/BotaoSubmit'
import useManualFetch from '../hooks/useManualFetch'
import {useNavigate} from 'react-router-dom'
import useMensagemContext from '../hooks/useMensagemContext'
import Loading from '../components/Loading/Loading'
import { API } from '../api'

const CriarConta = () => {

    const [usuario, setUsuario] = useState("")
    const [senha1, setSenha1] = useState("")
    const [senha2, setSenha2] = useState("")
    const {state, dispatch} = useMensagemContext()
    const {getDados, setDados} = useManualFetch()
    const navegar = useNavigate()

    const changeUsuario = (e:ChangeEvent<HTMLInputElement>) => {
        
        let valor = e.target.value
        valor = valor.replace(/[^a-zA-Z0-9.]/g, '')
        setUsuario(valor)

    }

    const changeSenha = (
        setter: Dispatch<SetStateAction<string>>
    ) => (e:ChangeEvent<HTMLInputElement>) => {
        
        let valor = e.target.value
        setter(valor)

    }

    const handleSubmit = useCallback( async (e:FormEvent) => {

        if (senha1 != senha2){alert("As senhas precisam ser iguais!"); return}
        const url = `${API}?usuario=${usuario}`
        e.preventDefault();
        let dados = await getDados(url)

     

        if (dados.length > 0){
            
            window.alert("Esse usuário já existe")

        } else {

            console.log(dados)
            const rep = await setDados(`${API}/usuarios/`, {usuario, senha:senha1})
            dispatch({type:"MOSTRAR"})
            rep && navegar('/login/')

        }


    }, [usuario, senha1, senha2])

    return (
        <>
        <main id="content">
            <Formulario handleSubmit={handleSubmit}>

                <CampoTextInput texto="Usuário:" dica="Digite seu usuário..." valorInput={usuario}
                funcaoChangeInput={changeUsuario}/>

                <CampoTextInput senha={true} texto="Senha:" dica="Digite sua senha..." valorInput={senha1}
                funcaoChangeInput={changeSenha(setSenha1)}/>

                <CampoTextInput texto="Confirmação de senha:" dica="Confirme sua senha..." valorInput={senha2}
                funcaoChangeInput={changeSenha(setSenha2)}/>

                <BotaoSubmit texto="Enviar"/>

            </Formulario>
        </main>
        <Loading />
        </>

    )

}

export default CriarConta