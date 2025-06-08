import { useState } from 'react'
import LinkAlternativo from '../components/LinkAlternativo'
import CampoInput from '../components/CampoTextInput'
import Formulario from '../components/Formulario'
import BotaoSubmit from '../components/BotaoSubmit'
import { useAutenticacaoContext } from '../hooks/useAutenticacaoContext'
import classes from '../styles/Login.module.css'
import useMensagemContext from '../hooks/useMensagemContext'
import Toast from '../components/Toast'


const Login = () => {

    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const {usuarioLogado, setUsuarioLogado, logout} = useAutenticacaoContext()
    const {state, dispatch} = useMensagemContext()


    const handleSubmit = async (e) => {

        e.preventDefault();
        const url = 'http://localhost:3000/usuarios?usuario='+usuario+'&&'+'senha='+senha
        
        let rev = await fetch(url)
        let resultado = await rev.json()

        if (!usuarioLogado && resultado.length > 0) {
            
            setUsuarioLogado(resultado[0])

        } else if (resultado.length <= 0) {

            alert("Usuário ou senha incorreta.")

        } else {

            alert("Usuário já está logado")

        }
    }

    const changeUsuario = (e) => {

        let valor = e.target.value

        // Mantém apenas letras e ponto
        valor = valor.replace(/[^a-zA-Z.]/g, '')

        setUsuario(valor)
        

    }

    const changeSenha = (e) => {
        
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
                <CampoInput texto="Senha:" valorInput={senha}
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
            Conta Criada Com Sucesso
            </Toast>
        
        </>

    )

}

export default Login