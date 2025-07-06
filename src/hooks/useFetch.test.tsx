import { renderHook, waitFor } from "@testing-library/react"
import useFetch from "./useFetch"

describe('Testando hook useFetch', () => {

    const dados = [

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

            ]

    it('Deve retornar os dados corremente', async () => {

        globalThis.fetch = vi.fn().mockResolvedValue({

            ok:true,
            json: async () => dados

        })

        // Só pra dizer que tem url, não vai realmente fazer uma requisição
        const { result } = renderHook(() => useFetch('http://localhost:3000/posts'))

        await waitFor(() => {

            expect(result.current.items).toEqual(dados)

        })

    })

    it('Deve retornar uma lista vazia e a requisição for rejeitada', async () => {

        globalThis.fetch = vi.fn().mockRejectedValue(new Error('Rejeitada!'))

        // Só pra dizer que tem url, não vai realmente fazer uma requisição
        const { result } = renderHook(() => useFetch('http://localhost:3000/posts'))

        await waitFor(() => {

            expect(result.current.items).toEqual([])

        })

    })

})