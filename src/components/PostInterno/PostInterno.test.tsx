import { render, screen, cleanup, act } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import PostInterno from "./PostInterno"

describe('Testando Componente PostInterno', () => {

    afterEach(() => {cleanup(); vi.restoreAllMocks()})

    it('Deve exibir o conteudo corretamente se encontrar o nome', async () => {
        //é para pegar o segundo parágrafo (O título é contado como um)
        const texto = (
            '# Titulo do Post'+'\n\n'+'b'.repeat(100)+'\n'
            +'b'.repeat(100)+'\n'+'b'.repeat(100))+'\n\n'
            +'a'.repeat(100)+'\n'+'a'.repeat(100)+'\n\n'
            +'```js\nfunction soma (x, y) {\n return x + y\n}```'

        globalThis.fetch = vi.fn().mockResolvedValue({

            ok:true,
            text: async () => texto 

        })
        render(
        <MemoryRouter>
            <PostInterno id="0"/>
        </MemoryRouter>)

        const paragraphs = await screen.findAllByRole('article')
        const code = await screen.findByRole('generic', {name:'codigo-formatado'})
        
        //Deve ter 2 parágrafos (o com os a(s) e com os b(s)) e o pre(código formatado)

        expect(paragraphs).toHaveLength(2)
        expect(code.tagName).toBe('PRE')

    })

    it('Se não achar o nome do post, não exibe nada', async () => {
        //é para pegar o segundo parágrafo (O título é contado como um)

        globalThis.fetch = vi.fn().mockRejectedValue({

            ok:false,
            text: undefined 

        })
        await act(async () => render(
        <MemoryRouter>
            <PostInterno id="0"/>
        </MemoryRouter>))

        //Se não haver achar o post, deve ter um content com um child vazio (2 generics)

        const paragraph = screen.queryByRole('article')
        const generics = screen.queryAllByRole('generic')

        
        
        expect(paragraph).toBeNull()
        expect(generics).toHaveLength(2)
        expect(generics[0].textContent).toBe('')

    })

})