import { ChangeEvent, useState } from 'react'
import LinkAlternativo from '../components/LinkAlternativo/LinkAlternativo'
import CampoInput from '../components/CampoTextInput/CampoTextInput'
import Formulario from '../components/Formulario/Formulario'
import BotaoSubmit from '../components/BotaoSubmit/BotaoSubmit'
import { useAutenticacaoContext } from '../hooks/useAutenticacaoContext'
import classes from '../styles/Login.module.css'
import useMensagemContext from '../hooks/useMensagemContext'
import Toast from '../components/Toast/Toast'
import useManualFetch from '../hooks/useManualFetch'
import Loading from '../components/Loading/Loading'
import { API } from '../api'


const Login = () => {

    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const {usuarioLogado, setUsuarioLogado, logout} = useAutenticacaoContext()
    const {state, dispatch} = useMensagemContext()
    const {getDados} =  useManualFetch()


    const handleSubmit = async (e:ChangeEvent<HTMLInputElement>) => {

        e.preventDefault();
        const url = `${API}/usuarios?usuario=${usuario}&&senha=${senha}`
        
        let dados = await getDados(url)

        if (!usuarioLogado && dados.length > 0) {
            
            setUsuarioLogado(dados[0])
            dispatch({type:'MOSTRAR'})
            setSenha("")
            

        } else if (dados.length <= 0) {

            alert("Usuário ou senha incorreta.")

        } else {

            alert("Usuário já está logado")

        }
    }

    const changeUsuario = (e:ChangeEvent<HTMLInputElement>) => {

        let valor = e.target.value

        // Mantém apenas letras e ponto
        valor = valor.replace(/[^a-zA-Z.]/g, '')

        setUsuario(valor)
        

    }

    const changeSenha = (e:ChangeEvent<HTMLInputElement>) => {
        
        let valor = e.target.value
        setSenha(valor)

    }

    return (

        <>
            <main id="content">
            
            {!usuarioLogado && <Formulario handleSubmit={handleSubmit}>
                <h1>Login</h1>
                <CampoInput texto="Usuário:" valorInput={usuario}
                funcaoChangeInput={changeUsuario} dica="Digite o nome do usuário..."/>
                <CampoInput senha={true} texto="Senha:" valorInput={senha}
                funcaoChangeInput={changeSenha} dica="Digite sua senha..."/>
                <LinkAlternativo caminho='/criar_conta/' texto="Criar conta"/>
                <BotaoSubmit texto="Enviar"/>

            </Formulario>}

            {usuarioLogado && (
                <div className={classes.logoutContent}>
                <h1>Bem-vindo {usuarioLogado.usuario}!</h1>

                <p>Você está atualmente logado. Para  fazer logout
                    <strong className={classes.btnLogOut} onClick={() => {logout()}}>Clique aqui</strong>
                </p>
                </div>
            )}

            </main>
            <Toast mostrarToast={state.mostrarMensagem} dispatch={dispatch} duracaoMs={2000}>
            Você fez login com sucesso!
            </Toast>
            <Loading />
        
        </>

    )

}

export default Login