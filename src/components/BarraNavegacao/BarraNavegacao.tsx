import { NavLink } from 'react-router-dom'
import classes from './BarraNavegacao.module.css'
import { FaUserCircle, FaPowerOff, FaBars } from 'react-icons/fa'
import { useAutenticacaoContext } from '../../hooks/useAutenticacaoContext'
import TextoEIcone from '../TextoEIcone/TextoEIcone'
import { useRef, useState, useMemo } from 'react'
import useViewport from '../../hooks/useViewport'
import useOutClickElement from '../../hooks/useOutClickElement'

const BarraNavegacao = () => {

    const { usuarioLogado, logout } = useAutenticacaoContext()
    
    const [menuSuspenso, setMenuSuspenso] = useState(false)
    const [menuMobile, setMenuMobile] = useState(false)

    const refMenuSuspenso = useRef<HTMLUListElement | null>(null)
    const refMenuMobile = useRef<HTMLLIElement| null>(null)
    const { viewport } = useViewport(1080)
    
    //Esse hook vai chamar a função quando o usuário clicar fora do MenuMobile
    useOutClickElement(refMenuMobile, () => {

        setMenuMobile(false)

    })

    let getClasseLink = ({ isActive }: { isActive: boolean }) => {

        return `${classes.linkMenu} ${isActive ? classes.selecionado : ""}`

    }

    let classeDropdown = useMemo(() => {

        return `${classes.menuSuspenso} ${classes.listaMenu} 
    ${menuSuspenso ? classes.mostrar : classes.esconder}`

    }, [menuSuspenso])
    
    return (
        <nav className={classes.navMenu}>

            <ul className={classes.listaMenu}>

                {viewport &&
                    <li className={`${classes.itemMenu} ${classes.menuMobile}`}
                    onClick={() => setMenuMobile((prev) => !prev)}>
                        <FaBars size={48}/>
                    </li>}
               

                <li className={`${classes.itemMenu} ${classes.itemMenuContentMobile} 
                ${viewport && !menuMobile &&  classes.esconder}`} ref={refMenuMobile}>

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
                        {/* Se logado mostra um icone com o nome do usuario, se não mostra o link pra página login */}
                        {usuarioLogado ?
                            <li className={`${classes.itemMenu} ${classes.itemUsuario}`}
                                onMouseEnter={() => setMenuSuspenso(true)} onMouseLeave={() => setMenuSuspenso(false)}>
                                <div className={classes.contentDropdownUsuario}>
                                <TextoEIcone texto={usuarioLogado.usuario}
                                    tamanho={32} Icone={FaUserCircle} borda={true} />
                                <ul ref={refMenuSuspenso} className={classeDropdown} aria-label="dropdown-profile">

                                    <li className={classes.menuSuspensoItem}>

                                        <TextoEIcone texto="Logout" tamanho={32} Icone={FaPowerOff} acao={logout} />

                                    </li>

                                </ul>
                                </div>
                            </li> :

                            <li className={`${classes.itemMenu} ${classes.itemUsuario} `}>
                             
                                <NavLink to='/login/' className={getClasseLink}>Login</NavLink>
                              
                            </li>

                        }

                    </ul>

                </li>




            </ul>
        </nav>

    )

}

export default BarraNavegacao