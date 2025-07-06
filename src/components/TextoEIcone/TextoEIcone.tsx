import { MouseEventHandler } from 'react'
import classes from './TextoEIcone.module.css'
import { IconType } from 'react-icons'

interface Iprops {
    
    texto:string,
    tamanho:number,
    Icone:IconType,
    acao?:MouseEventHandler<HTMLDivElement>,
    borda?:boolean,
    centralizado?:boolean

}


const TextoEIcone = ({texto, tamanho, Icone, borda=false, centralizado=true, acao}:Iprops) => {

    const classeContent = `${classes.content} ${borda && classes.borda} 
    ${centralizado && classes.centralizado} ${borda && classes.borda}`

    return (

        <div aria-label={`icone-${texto.toLocaleLowerCase()}-container`}
        className={classeContent} onClick={acao}>
            <Icone size={tamanho} role={`icone-${texto.toLocaleLowerCase()}`}/>
            <span className={classes.texto}>{texto}</span>
        </div>

    )

}

export default TextoEIcone