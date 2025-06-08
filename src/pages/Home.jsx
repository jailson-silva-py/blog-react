import foto from '../assets/img/foto.png'
import classes from '../styles/Home.module.css'
import PostsExternos from '../components/PostsExternos'

const url = "http://localhost:3000/posts/?principal=true"

const Home = () => {
    

    return (
        <>
        <main id='content'>

            <div className={classes.cabecalhoHome}>

            <img className={classes.imgCabecalho} src={foto} alt="foto-perfil" />
            <div className={classes.textCabecalho}>
            <h1>Jailson S.Pereira</h1>
            <h3>Desenvolvedor front-end</h3>
            <i>Tecnologias: React, Javascript, CSS, HTML</i>
            </div>

            </div>

            <p className={classes.descricao}>

                Sou desenvolvedor front-end com foco em criar interfaces modernas, responsivas e centradas
                na experiência do usuário. Tenho domínio em React, JavaScript, HTML e CSS, além de uma boa
                base em bancos de dados SQL, o que me permite entender bem o fluxo completo de dados entre
                o front e o back-end. Curioso por natureza e sempre em evolução, gosto de transformar 
                ideias em aplicações funcionais, limpas e performáticas.

            </p>

            <h1>Principais posts</h1>

            <PostsExternos urlPosts={url}/>



        </main>

        </>

    )

}

export default Home