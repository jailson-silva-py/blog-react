import { FormEventHandler, ReactNode } from 'react'
import classes from './Formulario.module.css'

interface Iprops {

    children:ReactNode,
    handleSubmit:FormEventHandler,

}

const Formulario = ({children, handleSubmit}:Iprops) => {

    return (

        <form className={classes.formulario} onSubmit={handleSubmit} role='form'>

                {children}

        </form>

    )

}

export default Formulario