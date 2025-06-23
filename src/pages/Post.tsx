import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import PostInterno from '../components/PostInterno/PostInterno'
import Comentarios from "../components/Comentarios/Comentarios"

const Post = () => {
    const {id} = useParams()
    const url = "http://localhost:3000/posts/"+id
    const {items} = useFetch(url)
    console.log(items)
    return (

        <>
            <main id="content">
            <PostInterno id={id}/>
            <Comentarios postId={id}/>
            </main>

        </>

    )

}

export default Post