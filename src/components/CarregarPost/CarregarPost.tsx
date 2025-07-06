import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react'
import CodigoFormatado from './CodigoFormatado'
import remarkGfm from 'remark-gfm'
import useManualFetch from '../../hooks/useManualFetch'

interface Iprops {

    conteudoCompleto?:boolean,
    nome:string

}

const allComponents = {

        p: ({children, ...props}:any) => (

            <p role='article' {...props}>
                {children}
            </p>

        ),

        pre: ({children, ...props}:any) => (

             <pre aria-label="codigo-formatado" {...props}>{children}</pre>

        ),
        code:CodigoFormatado

}

const verificaString = (dados:unknown):string => {

    if (typeof dados !== 'string') return ''

    const [, segundo] = dados.split(/\n\s*\n/)

    return segundo?.trim()

}

const CarregarPost = ({conteudoCompleto=false, nome}:Iprops) => {

    const [conteudo, setConteudo] = useState("")
    const {getDados} = useManualFetch()
    
    useEffect(() => {

        const carregarDados = async () => {

            const dados = await getDados("/posts/"+nome+".md", false)

            conteudoCompleto ? setConteudo(dados) : setConteudo(verificaString(dados))
            
        }

        carregarDados()

    }, [nome])

    return (
        <>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={allComponents}>{conteudo}</ReactMarkdown>
        </>
    )


}

export default CarregarPost