import classes from './BotaoSubmit.module.css'

const BotaoSubmit = ({texto}:{texto:string}) => {

    return (

        <div aria-label="btn-container">
        <input type="submit" value={texto} className={classes.btnEnviar}/>
        </div>

    )

}

export default BotaoSubmit