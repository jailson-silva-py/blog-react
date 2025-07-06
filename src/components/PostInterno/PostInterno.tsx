import classes from './PostInterno.module.css'
import CarregarPost from '../CarregarPost/CarregarPost'

const PostInterno = ({id}:{id:string | undefined}) => {
    
    const nome = 'post-'+id
    
    return <div className={classes.paragrafosContent} aria-label="post-interno">
        <CarregarPost nome={nome} conteudoCompleto={true}/>
        </div>

}

export default PostInterno