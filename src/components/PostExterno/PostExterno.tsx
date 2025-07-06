import CarregarPosts from '../CarregarPost/CarregarPost'

const PostExterno = ({id}:{id:string | undefined}) => {

    const nome = 'post-'+id

    return (

        
        <CarregarPosts nome={nome}/>
        

    )

}

export default PostExterno