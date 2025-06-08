import { NavLink } from 'react-router-dom'
import classes from './BarraNavegacao.module.css'

const BarraNavegacao = () => {

    let getClasseLink = ({isActive}) => {

        return `${classes.linkMenu} ${isActive ? classes.selecionado : ""}`

    }

    return (
        <nav className={classes.navMenu}>
        <ul className={classes.listaMenu}>

            <li className={classes.itemMenu}>
                <NavLink to='/' 
                className={getClasseLink}>
                    Home
                </NavLink>
            </li>
            
            <li className={classes.itemMenu}>
                <NavLink to='/contato/' 
                className={getClasseLink}>
                Contato
                </NavLink>
            </li>

            <li className={classes.itemMenu}>
                <NavLink to='/posts/' 
                className={getClasseLink}>
                Blog
                </NavLink>
            </li>

            <li className={classes.itemMenu}>
                <NavLink to='/sobre/' 
                className={getClasseLink}>
                Sobre
                </NavLink>
            </li>

            <li className={`${classes.itemMenu} ${classes.itemUsuario}`}>

                

            </li>
            

        </ul>
        </nav>
        
    )

} 

export default BarraNavegacao