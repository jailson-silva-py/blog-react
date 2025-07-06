import classes from '../styles/Contato.module.css'
import { useState, useCallback } from 'react'
import CampoTextInput from '../components/CampoTextInput/CampoTextInput'
import CampoAreaInput from '../components/CampoAreaInput/CampoAreaInput'
import Formulario from '../components/Formulario/Formulario'
import BotaoSubmit from '../components/BotaoSubmit/BotaoSubmit'

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

                <label className={classes.emailContent} role='email-send-simplify'>
                <span onClick={copiar} className={classes.email} 
                aria-label='email-copy'>{email}</span>
                <a href="mailto:j4ilsonsilv4pereir4@gmail.com">Enviar E-mail</a>
                </label>
                </section>

                <section className={classes.entreEmContato}>

                <h1>Mande uma mensagem:</h1>

                <Formulario handleSubmit={() => {}}>

                    <CampoTextInput dica="Seu nome..." texto="Nome:"/>

                    <CampoTextInput dica="Seu e-mail..." texto="E-mail:"/>
                    
                    <CampoAreaInput dica="Seu comentário..." texto="Comentário:"/>

                    <BotaoSubmit texto="Enviar"/>

                </Formulario>

                </section>


            </main>

        </>

    )

}


export default Contact