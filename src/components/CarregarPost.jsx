import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react'
import CodigoFormatado from './CodigoFormatado'
import remarkGfm from 'remark-gfm'

const CarregarPost = ({conteudoCompleto=false, nome}) => {

    
    const [conteudo, setConteudo] = useState("")

    useEffect(() => {

        const carregarDados = async () => {

            const dados = await fetch("/posts/"+nome+".md")
            const texto = await dados.text()

            if (conteudoCompleto) setConteudo(texto)

            else {
                
                let paragrafoUnico = texto.split('\n\n')[1]
                setConteudo(paragrafoUnico)
                
            }
            

        }

        carregarDados()

    }, [nome])

    return (

        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{code:CodigoFormatado}}>{conteudo}</ReactMarkdown>

    )


}

export default CarregarPost