import { render, screen, cleanup, within, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CarregarPost from './CarregarPost'

describe('Testando Componente CarregarPost', () => {

    afterEach(cleanup)

    it('Caso o conteudoCompleto for false retorne o 1º parágrafo fora o titulo', async () => {

const texto = `
# Treinando Jogar um Dotinha

aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
`

        globalThis.fetch = vi.fn().mockResolvedValue({

            ok:true,
            text: async () => {

                return texto

            }
            

        })
        
        render(

        <MemoryRouter>
            <CarregarPost conteudoCompleto={false} nome='0' data-testid="post"/>
        </MemoryRouter>
        )

        const paragraph = await screen.findByRole('article')

        //apenas a parte que deveria aparecer (1º parágrafo)
        const trecho = texto.split(/\n\s*\n/)[1]

        expect(paragraph.textContent).toBe(trecho)



    })

    it('Deve mostrar todos os parágrafos se conteudoCompleto for true', async () => {

        const texto = `
# Treinando Jogar um Dotinha

aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb

` + "```js\nfunction soma(x, y) {\nreturn x + y\n}```"

        globalThis.fetch = vi.fn().mockResolvedValue({

            ok:true,
            text: async () => {

                return texto

            }
            

        })
        
        render(

        <MemoryRouter>
            <CarregarPost conteudoCompleto={true} nome='0' data-testid="post"/>
        </MemoryRouter>
        )

        const paragraphs = await screen.findAllByRole('article')
        const code = await screen.findByRole('generic', {name:'codigo-formatado'})

        //deve conter 2 parágrafos
        expect(paragraphs).toHaveLength(2)

        //trecho aaa ... aaa está dentro do 1 parágrafo
        expect(paragraphs[0].textContent).toBe(texto.split(/\n\s*\n/)[1])

        //trecho bbb ... bbb está dentro do 1 parágrafo
        expect(paragraphs[1].textContent).toBe(texto.split(/\n\s*\n/)[2])

        //tem que ter tag <pre> (que é o código formatado)
        expect(code.tagName).toBe('PRE')



    })

})