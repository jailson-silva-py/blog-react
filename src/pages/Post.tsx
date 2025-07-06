import { useParams } from "react-router-dom"
import PostInterno from '../components/PostInterno/PostInterno'
import Comentarios from "../components/Comentarios/Comentarios"
import FormularioComentario from "../components/FormularioComentario/FormularioComentario"

const Post = () => {
    
    const {id} = useParams()

    return (

        <>
            <main id="content">
            <PostInterno id={id}/>
            <FormularioComentario postId={id}/>
            <Comentarios postId={id}/>
            </main>

        </>

    )

}

export default Post