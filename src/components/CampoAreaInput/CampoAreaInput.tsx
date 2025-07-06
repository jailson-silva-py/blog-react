import { ChangeEvent } from 'react'
import classes from './CampoAreaInput.module.css'

interface Iprops {

    dica:string,
    texto:string,
    funcaoChangeInput?:(e:ChangeEvent<HTMLTextAreaElement>) => void
    valorInput?:string

}

const pegarTextoAria = (texto:string) => {

    var novoTexto = texto.trim().toLocaleLowerCase()

    novoTexto = novoTexto.includes(':') ? novoTexto.replace(':', ''): novoTexto

    return novoTexto

}

const CampoAreaInput = ({dica, texto, funcaoChangeInput, valorInput}:Iprops) => {


    return (

        <label className={classes.campoForm} aria-label={pegarTextoAria(texto)}>
            <span className={classes.campoTitulo}>{texto}</span>
            <textarea value={valorInput} onChange={funcaoChangeInput} placeholder={dica} rows={5}
            className={`${classes.padraoInput} ${classes.areaInput}`} required />
        </label>

    )

}

export default CampoAreaInput