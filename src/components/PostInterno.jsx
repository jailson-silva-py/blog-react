import classes from './PostInterno.module.css'
import CarregarPost from './CarregarPost'

const PostInterno = ({id}) => {
    const nome = 'post-'+id
    
    return <div className={classes.paragrafosContent}><CarregarPost nome={nome} conteudoCompleto={true}/></div>

}

export default PostInterno