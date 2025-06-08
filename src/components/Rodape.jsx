import {FaLinkedin, FaGithub} from 'react-icons/fa'
import classes from './Rodape.module.css'

const Rodape = () => {

    return (

        <footer className={classes.rodapeHome}>
            
            <a href="https://www.linkedin.com/in/jailson-silva-pereira-4b655b346" className={classes.verticalTextoIcone}>
                <FaLinkedin size={48}/>
                <span>Linkedin</span>
            </a>
            <a href="https://github.com/jailson-silva-py" className={classes.verticalTextoIcone}>
                <FaGithub size={48}/>
                <span>Github</span>
            </a>

        </footer>

    )

}

export default Rodape