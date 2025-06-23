import classes from '../styles/Sobre.module.css'

const Sobre = () => {

    return (

        <>
        
      <main id="content">
      <section className={classes.sessao}>
        <h1>Sobre o Blog</h1>
        <p>
          Este blog foi criado com o propósito de compartilhar experiências, aprendizados e reflexões sobre desenvolvimento web, com foco especial em React JS.
        </p>
      </section>

      <section className={classes.sessao}>
        <h2>Missão</h2>
        <p>
          Tornar o conhecimento acessível de forma prática, direta e gratuita, ajudando desenvolvedores
          a evoluírem com conteúdos úteis e bem explicados. Demonstrar o conhecimento do autor através de
          boas práticas de programação com o intuito de utilizar o blog para representatividade.
        </p>
      </section>

      <section className={classes.sessao}>
        <h2>Tecnologias Utilizadas</h2>
        <ul>
          <li>React JS com React Router</li>
          <li>Componentes funcionais e hooks: useMemo, useCallback, useEffect, useState, custom hooks ...</li>
          <li>CSS Modular para estilos isolados, menos verbosos e com nomes autoexplicativos. </li>
          <li>Markdown (.md) para gerenciamento de posts.</li>
          <li>Consumo de dados de APIs (Simulação) com json-server.</li>
          <li>Search Queries para a filtragem do conteúdo</li>
        </ul>
      </section>

      <section className={classes.sessao}>
        <h2>Sobre o Autor</h2>
        <p>
          Desenvolvido por Jailson Silva Pereira, entusiasta de tecnologia e apaixonado por 
          desenvolvimento front-end. Formado em Técnico em informática e atualmente 
          aprendendo TypeScript (06/06/2025). Este projeto representa um espaço para aprendizado contínuo
          e contribuição com a comunidade em uma jornada de aperfeiçoamento das referentes tecnologias.
        </p>
      </section>
    </main>

        </>

    )

}

export default Sobre