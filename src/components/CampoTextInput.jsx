import classes from './CampoTextInput.module.css'

const CampoInput = ({funcaoChangeInput, valorInput, texto, dica}) => {

    return (

        <label className={classes.campo}>
                            
            <span className={classes.campoTitulo}>{texto}</span>
            <input className={classes.campoInput} type="text" 
            placeholder={dica}
            value={valorInput}
            onChange={funcaoChangeInput} required/>
        
        </label>

    )

}

export default CampoInput