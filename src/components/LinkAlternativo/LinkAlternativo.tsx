import { Link } from "react-router-dom" 
import classes from './LinkAlternativo.module.css'

interface Iprops {

    texto:string,
    caminho:string,

}

const LinkAlternativo = ({texto, caminho}:Iprops) => {

    return (

        <div className={classes.linkContent} aria-label="content-link-alternativo">
            <Link to={caminho} className={classes.link}>{texto}</Link>
        </div>

    )

}

export default LinkAlternativo