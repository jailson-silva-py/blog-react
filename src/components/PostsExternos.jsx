import { NavLink } from "react-router-dom"
import PostExterno from "./PostExterno"
import classes from './PostsExternos.module.css'
import useFetch from "../hooks/useFetch"


const PostsExternos = ({urlPosts}) => {

    const {items} = useFetch(urlPosts)

    return (

        <section className={classes.pricipaisPosts}>

                {items.map((item) => (

                    <article key={item.id} className={classes.post}>

                        <h1><NavLink className={classes.postLink} 
                        to={`/posts/${item.id}`}>{item.titulo}</NavLink></h1>
                        <i>{item.dataPostagem}</i>
                        <PostExterno id={item.id}/>

                    </article>

                ))}

        </section>

    )

}

export default PostsExternos