import classes from './BotaoSubmit.module.css'

const BotaoSubmit = ({texto}) => {

    return (

        <div>
        <input type="submit" value={texto} className={classes.btnEnviar}/>
        </div>

    )

}

export default BotaoSubmit