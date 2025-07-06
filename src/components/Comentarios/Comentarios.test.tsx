import {render, screen, cleanup} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Comentarios from './Comentarios'

describe('Testando componente comentários', () => {

    afterEach(cleanup)

    it('Deve ter um título(da sessão comentários)', async () => {

    

        render(<MemoryRouter><Comentarios postId='7'/></MemoryRouter>)

        const titulo = await screen.findByText('Comentários')

        expect(titulo).toBeInTheDocument()

    })

    it('Deve ter um titulo, autor, estrelas, e conteúdo em cada comentário', async () => {

        globalThis.fetch = vi.fn().mockResolvedValue({

            ok:true,
            json: async () => [{
      "id": 0,
      "postId": 0,
      "titulo": "Inspirador!",
      "estrelas": 5,
      "conteudo": "Muito legal ver como você começou. Me identifiquei bastante!",
      "autor": "Mariana Codes"
    },]

        })

        render(<MemoryRouter><Comentarios postId='0'/></MemoryRouter>)

        const titulo = await screen.findByText('Inspirador!')
        const estrelasContent = await screen.findByRole('generic', {name:'estrelas'})
        const estrelas = screen.getAllByRole('estrela')
        const autor = await screen.findByRole('generic', {name:'autor-comentario'})
        const conteudo = await screen.findByRole('paragraph', {name:'conteudo-comentario'})

        expect(titulo).toBeInTheDocument()
        expect(estrelasContent).toBeInTheDocument()
        expect(estrelas).toHaveLength(5)
        expect(autor.textContent).includes('Mariana Codes')
        expect(conteudo.textContent).toBe('Muito legal ver como você começou. Me identifiquei bastante!')

       


    })

    it('Deve mostrar estrelas vazias e estrelas "cheias" corretamente', async () => {

        globalThis.fetch = vi.fn().mockResolvedValue({

            ok:true,
            json:() => [

                {id:0, postId:0, estrelas:3}

            ]

        })

        render(<MemoryRouter><Comentarios postId='0'/></MemoryRouter>)

        const estrelas = await screen.findAllByRole('estrela')
        const estrelasVazias = await screen.findAllByRole('estrela-vazia')

        expect(estrelas).toHaveLength(3)
        expect(estrelasVazias).toHaveLength(2)

    })

    it('Deve carregar a quatidade de comentários adequada', async () => {

        globalThis.fetch = vi.fn().mockResolvedValue({

            ok:true,
            json: async () => [
                
                            {
      "id": 0,
      "postId": 0,
      "titulo": "Inspirador!",
      "estrelas": 5,
      "conteudo": "Muito legal ver como você começou. Me identifiquei bastante!",
      "autor": "Mariana Codes"
    },
    {
      "id": 1,
      "postId": 0,
      "titulo": "Simples e direto",
      "estrelas": 4,
      "conteudo": "Dicas práticas que realmente fazem diferença. Valeu!",
      "autor": "Carlos Dev"
    },
    {
      "id": 2,
      "postId": 0,
      "titulo": "Show!",
      "estrelas": 5,
      "conteudo": "Já comecei a reorganizar meu projeto depois de ler isso. Obrigado!",
      "autor": "Lúcia Frontend"
    },

            ]})

    render(<MemoryRouter><Comentarios postId='0'/></MemoryRouter>)

    const comentarios = await screen.findAllByRole('article')

    expect(comentarios).toHaveLength(3)

    })

})