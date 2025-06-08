import { Link } from "react-router-dom" 
import classes from './LinkAlternativo.module.css'

const LinkAlternativo = ({texto, caminho}) => {

    return (

        <div className={classes.linkContent}>
            <Link to={caminho} className={classes.link}>{texto}</Link>
        </div>

    )

}

export default LinkAlternativo