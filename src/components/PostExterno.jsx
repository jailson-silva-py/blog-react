import CarregarPosts from './CarregarPost'

const PostExterno = ({id}) => {

    const nome = 'post-'+id

    return (

        
        <CarregarPosts nome={nome}/>
        

    )

}

export default PostExterno