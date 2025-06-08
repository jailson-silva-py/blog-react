import classes from './Formulario.module.css'

const Formulario = ({children, handleSubmit}) => {

    return (

        <form className={classes.formulario} onSubmit={handleSubmit}>

                {children}

        </form>

    )

}

export default Formulario