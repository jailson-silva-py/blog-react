import { NavLink } from "react-router-dom"
import PostExterno from "../PostExterno/PostExterno"
import classes from './PostsExternos.module.css'
import useFetch from "../../hooks/useFetch"

const PostsExternos = ({urlPosts}:{urlPosts:string}) => {

    const {items}:{items:PostType[]} = useFetch(urlPosts)

    return (
        <>
        <section className={classes.pricipaisPosts} role='posts-externos'>

                {items.map((item) => (

                    <article key={item.id} className={classes.post} role="post-externo">

                        <h1 role="post-titulo" title={item.titulo}>
                            <NavLink className={classes.postLink} 
                        to={`/posts/${item.id}`}>{item.titulo}</NavLink></h1>
                        <i role="post-data-criacao">{item.dataPostagem}</i>
                        <PostExterno id={`${item.id}`}/>

                    </article>

                ))}

        </section>

        </>

    )

}

export default PostsExternos