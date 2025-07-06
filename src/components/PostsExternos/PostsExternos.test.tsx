import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import PostsExternos from "./PostsExternos"

const posts = [
                {
      "id": 0,
      "titulo": "Como comecei no Front-End",
      "conteudo": "Compartilho minha jornada de aprendizado em HTML, CSS e React...",
      "dataPostagem": "2025-05-15",
      "principal": true
    },
    {
      "id": 1,
      "titulo": "5 Dicas para melhorar seu código em JavaScript",
      "conteudo": "Neste post, falo sobre práticas simples que deixam seu JS mais limpo e eficiente...",
      "dataPostagem": "2025-05-20",
      "principal": true
    },
    {
      "id": 2,
      "titulo": "Organizando seu projeto React com boas práticas",
      "conteudo": "A estrutura de pastas pode fazer toda a diferença na escalabilidade do seu app...",
      "dataPostagem": "2025-05-25",
      "principal": true
    },
]

describe('Teste do componente PostsExternos', () => {

    afterEach(() => {
        cleanup()
        vi.resetAllMocks()
    })
    it('Deve conter a quantidade correta de Posts', async () => {
       

        globalThis.fetch = vi.fn().mockResolvedValue({

            ok:true,
            json:async () => posts

        })

        const url = 'http://localhost:3000/posts/'
        render(
        <MemoryRouter>
            <PostsExternos urlPosts={url}/>
        </MemoryRouter>)

        const articles = await screen.findAllByRole('post-externo')

      
        expect(articles).toHaveLength(3)
        

    })

    it('Deve ter um titulo, data e conteudo em cada post', async () => {

        const texto = '# titulo do post'+'\n\n'+'a'.repeat(100)

        globalThis.fetch = vi.fn(async (input:RequestInfo | URL):Promise<Response> => {

            const url = typeof input === 'string'? input:(input as Request).url

           if(url.includes('http://localhost:3000/posts/')) {

            return new Response(JSON.stringify([posts[0]]), {

                status:200,

            })

           }

           else if (url.includes('.md')) {

            return new Response(texto,{

                status:200,

            })

           }

           throw new Error(`Url não solicida nem as
           info do post e nem o o conteúdo`)

        })

        const url = 'http://localhost:3000/posts/'
        render(
        <MemoryRouter>
            <PostsExternos urlPosts={url}/>
        </MemoryRouter>)

        const titulo = await screen.findByRole('post-titulo')
        const data = await screen.findByRole('post-data-criacao')
        const conteudo = await screen.findByRole('article')

        expect(titulo).toBeInTheDocument()
        expect(data).toBeInTheDocument()
        expect(conteudo).toBeInTheDocument()
        
    })

    

})