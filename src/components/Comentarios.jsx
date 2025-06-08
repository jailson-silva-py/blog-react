import useFetch from '../hooks/useFetch'
import {FaStar, FaRegStar} from 'react-icons/fa'
import classes from './Comentarios.module.css'

const gerarEstrelasVazias = (item) => {
    

    if (item.estrelas < 5) {

        let numEstrelasVazias = 5 - item.estrelas
        return Array.from({length: numEstrelasVazias}, ( _ , i) => (
        <FaRegStar key={i} className={classes.estrela}/>
    ))
        
    }

}

const Comentarios = ({postId}) => {
    const url = 'http://localhost:3000/comentarios?postId='+postId
    const {items} = useFetch(url)
    return (
        
        <section className={classes.comentarios}>

            <h1>Comentários</h1>

            {items.map((item) => (

                <article key={item.id} className={classes.comentario}>
                    
                    <h2>{item.titulo}</h2>
                    <i>Autor: {item.autor}</i>
                    <span className={classes.estrelas}>

                        {Array.from({length: item.estrelas}, ( _ , i) => (

                            <FaStar key={i} className={classes.estrela}/>

                        )) }
                        {gerarEstrelasVazias(item)}

                    </span>
                    <p className={classes.conteudo}>

                        {item.conteudo}

                    </p>


                </article>)
                
                )}

        </section>

    )

}

export default Comentarios