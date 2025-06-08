import classes from './CampoAreaInput.module.css'

const CampoAreaInput = ({dica, texto}) => {

    return (

        <label className={classes.campoForm}>
            <span className={classes.campoTitulo}>{texto}</span>
            <textarea placeholder={dica} rows="5"
            className={`${classes.padraoInput} ${classes.areaInput}`} required />
        </label>

    )

}

export default CampoAreaInput