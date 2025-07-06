import { ReactNode } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Iprops {

    node:any,
    children:ReactNode,
    className:string,
    inline:boolean


}

const CodigoFormatado:any = ({ node, inline, className, children, ...props }:Iprops) => {
    const linguagem = /language-(\w+)/.exec(className || '')
    
    // Processamento mais robusto do conteúdo
    const conteudo = Array.isArray(children)
        ? children.map(child => (typeof child === 'string' ? child : String(child))).join('')
        : String(children || '').replace(/\n$/, '') // Remove quebra de linha final
    
    
    // Se não for código inline e se a linguagem for definida
    if (!inline && linguagem) {
        const realLinguagem = linguagem[1]
        
        return (
            <SyntaxHighlighter
                style={vscDarkPlus}
                language={realLinguagem}
                PreTag="div"
                showLineNumbers={false} // Opcional: mostrar números das linhas
                wrapLines={true} // Opcional: quebrar linhas longas
                {...props}
            >
                {conteudo}
            </SyntaxHighlighter>
        )
    }
    
    // Caso seja inline ou sem linguagem predefinida
    return (
        <code className={className} {...props}>
            {children}
        </code>
    )
}

export default CodigoFormatado