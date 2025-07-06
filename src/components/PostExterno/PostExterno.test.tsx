import { render, screen, act } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import PostExterno from "./PostExterno"

describe('Testando Componente PostExterno', () => {

    afterEach(() => {vi.restoreAllMocks()})

    it('Deve exibir o conteudo corretamente se encontrar o nome', async () => {
        //é para pegar o segundo parágrafo (O título é contado como um)
        const texto = '#Titulo do Post'+'\n\n'+'b'.repeat(100)+'\n'+'b'.repeat(100)+'\n'+'b'.repeat(100)

        globalThis.fetch = vi.fn().mockResolvedValue({

            ok:true,
            text: async () => texto 

        })

        await act(async () => render(
        <MemoryRouter>
            <PostExterno id="0"/>
        </MemoryRouter>))

        const paragraph = await screen.findByRole('article')
        //separa os elementos por 2 quebras de linhas.
        const trecho = texto.split(/\n\n/)[1]

        expect(paragraph.textContent).toBe(trecho)

    })

    it('Se não achar o nome do post, não exibe nada', async () => {
        //é para pegar o segundo parágrafo (O título é contado como um)

        globalThis.fetch = vi.fn().mockRejectedValue({

            ok:false,
            text: undefined 

        })
        await act(async () => render(
        <MemoryRouter>
            <PostExterno id="0"/>
        </MemoryRouter>))

        //Só pra garantir que além de não ter parágrafos, tem só uma div vazia
        const paragraph = screen.queryByRole('article')
        const generics = screen.queryAllByRole('generic')
        
        expect(paragraph).toBeNull()
        expect(generics).toHaveLength(1)
        expect(generics[0].textContent).toBe('')

    })

})