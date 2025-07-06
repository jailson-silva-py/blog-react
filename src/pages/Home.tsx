import foto from '../assets/img/foto.png'
import classes from '../styles/Home.module.css'
import PostsExternos from '../components/PostsExternos/PostsExternos'

const url = "http://localhost:3000/posts/?principal=true"

const Home = () => {
    

    return (
        <>
        <main id='content'>

            <div className={classes.cabecalhoHome} role='cabecalho-home'>

            <img className={classes.imgCabecalho} src={foto} alt="foto-perfil" />
            <div className={classes.textCabecalho}>
            <h1 aria-label='nome-autor'>Jailson S.Pereira</h1>
            <h3 aria-label='area-autor'>Desenvolvedor front-end</h3>
            <i>Tecnologias: React, Javascript, CSS, HTML e Typescript</i>
            </div>

            </div>

            <p className={classes.descricao}>

                Como dev front-end, concentro-me em entregar UIs responsivas e
                centradas no usuário. Tenho experiência prática com HTML, CSS,
                JavaScript, TypeScript e React, e uma base em SQL que me ajuda
                a mapear todo o caminho dos dados. Curioso por natureza e sempre
                em evolução, gosto de transformar ideias em aplicações funcionais,
                limpas e performáticas.

            </p>

            <h1>Principais posts</h1>

            <PostsExternos urlPosts={url}/>



        </main>

        </>

    )

}

export default Home