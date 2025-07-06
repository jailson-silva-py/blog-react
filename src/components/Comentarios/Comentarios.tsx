import useFetch from '../../hooks/useFetch'
import {FaStar, FaRegStar} from 'react-icons/fa'
import classes from './Comentarios.module.css'
import {API} from '../../api'

interface Iprops {

    postId:string | undefined

}

const gerarEstrelasVazias = (item:ComentarioType) => {
    

    if (item.estrelas < 5) {

        let numEstrelasVazias = 5 - item.estrelas
        return Array.from({length: numEstrelasVazias}, ( _ , i) => (
        <FaRegStar key={i} className={classes.estrela} role="estrela-vazia"/>
    ))
        
    }

}

const Comentarios = ({postId}:Iprops) => {
    const url = `${API}/comentarios?postId=${postId}`
    const {items} = useFetch(url)
    return (
        
        <section className={classes.comentarios} role="comentarios">

            <h1>Comentários</h1>

            {items.length > 0 ? items.map((item:ComentarioType) => (

                <article key={item.id} className={classes.comentario}>
                    
                    <h2 className={classes.comentarioTitulo}>{item.titulo}</h2>
                    <i aria-label="autor-comentario" 
                    className={classes.comentarioAutor}>Autor: {item.autor}</i>
                    <span className={classes.estrelas} aria-label="estrelas">

                        {Array.from({length: item.estrelas}, ( _ , i) => (

                            <FaStar key={i} className={classes.estrela} role="estrela"/>

                        )) }
                        {gerarEstrelasVazias(item)}

                    </span>
                    <p className={classes.conteudo} aria-label="conteudo-comentario">

                        {item.conteudo}

                    </p>


                </article>)
                
                ) :
                
                <h3>Atualmente não possui nenhum comentário</h3>
                }

        </section>

    )

}

export default Comentarios