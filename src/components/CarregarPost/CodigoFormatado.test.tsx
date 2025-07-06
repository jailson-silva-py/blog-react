import { render, screen, cleanup } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import CodigoFormatado from './CodigoFormatado'

interface IpropsMock {

    children:ReactNode,
    language:string,

}

vi.mock('react-syntax-highlighter', () => {  

    return {

        Prism:({children, language, ...props}:IpropsMock) => (
            <pre data-testid="syntax" data-language={language} {...props}>
                {children}
            </pre>
        )
 
    }

})

describe('Testando código formatado', () => {

    afterEach(cleanup)

    it('Deve deixar os códigos não inline com <pre> e formatar', async () => {

        const texto = `function some(x, y) {\nreturn x + y\n}\n`
        render(<MemoryRouter>
            <CodigoFormatado
            node={null}
            inline={false}
            className="language-js"
            data-cy="meucode">
            {texto}
            </CodigoFormatado>
            </MemoryRouter>)

        
        const code = await screen.findByTestId('syntax')

        expect(code.tagName).toBe('PRE')
        
        //Verifica também se removeu o espaço no final
        expect(code.textContent).toBe(`function some(x, y) {\nreturn x + y\n}`)

    })

    it('Deve deixar os códigos inline com <code> e não formatar', async () => {

        render(<MemoryRouter>
            <CodigoFormatado
            node={null}
            inline={true}
            className="language-js"
            data-cy="meucode">
            console.log('Oi')
            </CodigoFormatado>
            </MemoryRouter>)

        
        const code = await screen.findByRole('code')

        expect(code.tagName).toBe('CODE')
        expect(code.textContent).toBe("console.log('Oi')")

    })

    it('Deve deixar não formatado e colocar entre <code> se não identificar a linguagem', async() => {

        render(
        <MemoryRouter>
            <CodigoFormatado node={null} className="xablau" inline={false}>
                Qualquer coisa
            </CodigoFormatado>
        </MemoryRouter>
        )

        const code = await screen.findByText(/qualquer coisa/i)

        expect(code.tagName).toBe('CODE')
    

    })

    it('Deve propagar props adicionais para o nó correto', async () => {

        render(
        <MemoryRouter>
            <CodigoFormatado
                className="language-css"
                data-cy="prop"
                title="codigo css"
                node={null}
                inline={false}
                id="meu-codigo"
            >
                propagador
            </CodigoFormatado>
        </MemoryRouter>
        )

        const code = await screen.findByText(/propagador/i)

        expect(code).toHaveAttribute('title', "codigo css")
        expect(code).toHaveAttribute('id', "meu-codigo")
        expect(code).toHaveAttribute('data-cy', "prop")


    })

})