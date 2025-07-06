import { ChangeEvent, ChangeEventHandler, InputEventHandler } from 'react'
import classes from './CampoTextInput.module.css'

interface Iprops {

    funcaoChangeInput?:ChangeEventHandler<HTMLInputElement>, 
    valorInput?:string,
    texto:string,
    dica:string,
    senha?:boolean

}


const pegarTextoAria = (texto:string) => {

    var novoTexto = texto.trim().toLocaleLowerCase()

    novoTexto = novoTexto.includes(':') ? novoTexto.replace(':', ''): novoTexto

    return novoTexto

}

const CampoInput = ({funcaoChangeInput, valorInput, texto, dica, senha=false}:Iprops) => {

    return (

        <label className={classes.campo} aria-label={pegarTextoAria(texto)}>
                            
            <span className={classes.campoTitulo}>{texto}</span>
            <input className={classes.campoInput} type={senha ? 'password':'text'} 
            placeholder={dica}
            value={valorInput}
            onChange={funcaoChangeInput} required/>
        
        </label>

    )

}

export default CampoInput