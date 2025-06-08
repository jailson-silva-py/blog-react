import classes from '../styles/Contato.module.css'
import { useState, useCallback, use } from 'react'

const email = "j4ilsonsilv4pereir4@gmail.com"


const Contact = () => {

    const [copiado, setCopiado] = useState(false)
    const copiar =  useCallback(() => {

    navigator.clipboard.writeText(email)
    .then(() => {

        setCopiado(true)
        setTimeout(() => setCopiado(false), 2000)

    })

    .catch((err) => {

        console.error("Erro ao copiar: ", err)

    })
    }, [])
    

    return (

        <>
        
            <main id="content">

                {copiado && <span className={classes.toast}>E-mail copiado com sucesso!</span>}

                <section className={classes.intro}>
                <h1 className={classes.titulo}>Entre em contato</h1>

                <label className={classes.emailContent}>
                <span onClick={copiar} className={classes.email}>{email}</span>
                <a href="mailto:j4ilsonsilv4pereir4@gmail.com">Enviar E-mail</a>
                </label>
                </section>

                <section className={classes.entreEmContato}>

                <h1>Mande uma mensagem:</h1>

                <form className={classes.formulario}>

                <label className={classes.campoForm}>
                <span className={classes.campoTitulo}>Nome:</span>
                <input type="text" placeholder="Seu nome" className={classes.padraoInput} required />
                </label>

                <label className={classes.campoForm}>
                <span className={classes.campoTitulo}>E-mail:</span>
                <input type="email" placeholder="Seu e-mail" className={classes.padraoInput} required />
                </label>

                <label className={classes.campoForm}>
                <span className={classes.campoTitulo}>Título:</span>
                <textarea placeholder="Sua mensagem" rows="5"
                className={`${classes.padraoInput} ${classes.areaInput}`} required />
                </label>
                <button type="submit" className={classes.padraoSubmit}>Enviar</button>
                </form>
                </section>


            </main>

        </>

    )

}


export default Contact