import Formulario from "../Formulario/Formulario"
import CampoAreaInput from "../CampoAreaInput/CampoAreaInput"
import classes from "./FormularioComentario.module.css"
import { FaRegStar, FaStar } from "react-icons/fa"
import { ChangeEvent, FormEvent, ReactElement, useEffect, useState, useMemo } from 'react'
import BotaoSubmit from "../BotaoSubmit/BotaoSubmit"
import useMensagemContext from "../../hooks/useMensagemContext"
import Toast from "../Toast/Toast"
import useManualFetch from "../../hooks/useManualFetch"
import CampoTextInput from "../CampoTextInput/CampoTextInput"
import { useAutenticacaoContext } from "../../hooks/useAutenticacaoContext"
import { API } from "../../api"


 
const FormularioComentario = ({postId}:{postId:string | undefined}) => {
 
    const [numEstrelas, setNumEstrelas] = useState(0)
    const[estrelas, setEstrelas] = useState<ReactElement[]>([])
    const [hovered, setHovered] = useState<number | null>(null)
    const { dispatch, state } = useMensagemContext()
    const { usuarioLogado } = useAutenticacaoContext()
    const { getDados, setDados } = useManualFetch()


    const [titulo, setTitulo] = useState('')
    const [comentario, setComentario] = useState('')

    const comentarioAtual = useMemo(() => `${API}/comentarios?postId=${
            postId}&autor=${usuarioLogado?.usuario}`, [usuarioLogado])

    const classeEstrelaHovered = (indice:number) => {

        if (hovered != null || hovered != undefined) {

            return hovered >= indice ? classes.hovered : ''

        }

    }

    const handleEstrelas = (indice:number) => () => {

        setNumEstrelas(indice+1)

    } 

    const handleSubmit = (e:FormEvent) => {

        const url = `${API}/comentarios`
        e.preventDefault()

        if (numEstrelas <= 0) {

            dispatch({type:'MOSTRAR'})
            return
        }

        else if (!usuarioLogado) {

            window.alert('É preciso estar logado para Comentar')

        }

        (async () => {

                const dados = await getDados(comentarioAtual)

                if (dados.length === 0) { 
                    await setDados(url, {
                    postId, titulo, estrelas:numEstrelas, conteudo:comentario, 
                    autor:usuarioLogado?.usuario})    
                }

                return        
    
        })()


    }

    const changeTitulo = (e:ChangeEvent<HTMLInputElement>) => {

        setTitulo(e.target.value)

    }

    const changeComentario = (e:ChangeEvent<HTMLTextAreaElement>) => {

        setComentario(e.target.value)

    }
 
    useEffect(() => {

        setEstrelas(() => {

            const totalEstrelas:ReactElement[] = []
    
            if (numEstrelas > 0) {
               
                Array.from({length: numEstrelas}, (_, k) => {

                    totalEstrelas.push(<FaStar size={38} role={`estrela-cheia`}/>)

                })
            }

            const estrelasFaltando = totalEstrelas.length > 0 ? 5 - totalEstrelas.length : 5

            Array.from({length:estrelasFaltando}, (_, k) => {
    
                totalEstrelas.push(<FaRegStar role={`estrela-vazia`} 
                size={38}/>)

            })

            return totalEstrelas

        })

    }, [numEstrelas, ])

    useEffect(() => {
        (async () => {

        await getDados(comentarioAtual).then((comentarioAntigo) => {

                if(comentarioAntigo && comentarioAntigo.length > 0) {
                    [comentarioAntigo] = comentarioAntigo
                    setTitulo(comentarioAntigo.titulo)
                    setComentario(comentarioAntigo.conteudo)
                    setNumEstrelas(comentarioAntigo.estrelas)

                }

                return

            })
        
        
        
        })()
    }, [])
    
    return (
        <>
        <Formulario handleSubmit={handleSubmit}>
            <div className={classes.tituloEstrelas}>Avalie o post</div>
            <ul className={classes.estrelasContent} >
                
                {estrelas.map((valor, indice) => {

                    return (
                    <li key={indice} onClick={handleEstrelas(indice)}
                    aria-label={`estrela-${indice+1}`}
                    className={classeEstrelaHovered(indice)}
                    onMouseEnter={() => setHovered(indice)} onMouseLeave={() => setHovered(null)}>
                        {valor}
                    </li>)

                })}
            </ul>

            <CampoTextInput dica="Coloque o título..." texto="Título:" 
            valorInput={titulo} funcaoChangeInput={changeTitulo}/>
            <CampoAreaInput texto="Escreva um comentário:" valorInput={comentario}
            dica="Digite seu comentário" funcaoChangeInput={changeComentario}/>
            <BotaoSubmit texto="Enviar"/>
        </Formulario>
        <Toast mostrarToast={state.mostrarMensagem}  dispatch={dispatch} 
        duracaoMs={2000}>Coloque sua avaliação</Toast>
        </>

    )

}

export default FormularioComentario