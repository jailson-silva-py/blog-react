import { screen, render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TextoEIcone from './TextoEIcone'
import { FiLogIn } from 'react-icons/fi'
import classes from './TextoEIcone.module.css'
import userEvent from '@testing-library/user-event'


describe('Testando componente TextoEIcone', () => {

    afterEach(() => {
        cleanup()
        vi.resetAllMocks()
    })

    it('Deve conter um ícone e um texto', async () => {

        render(
        <MemoryRouter>
            <TextoEIcone texto="Login" tamanho={38} Icone={FiLogIn}/>
        </MemoryRouter>)

        const texto = await screen.findByText('Login')
        const icone = await screen.findByRole('icone-login')

        expect(texto).toBeInTheDocument()
        expect(icone).toBeInTheDocument()

    })

    it('Deve colocar a borda caso borda = true', async () => {

        render(
        <MemoryRouter>
            <TextoEIcone texto="Login" borda={true} tamanho={38} Icone={FiLogIn}/>
        </MemoryRouter>)

        const container = await screen.findByRole('generic', {name:'icone-login-container'})

        expect(container).toHaveClass(classes.borda)
    })

    it('Deve descentralizar elemento caso centralizado = false', async () => {

        render(
        <MemoryRouter>
            <TextoEIcone texto="Login" centralizado={false} tamanho={38} Icone={FiLogIn}/>
        </MemoryRouter>)

        const container = await screen.findByRole('generic', {name:'icone-login-container'})

        expect(container).not.toHaveClass(classes.centralizado)
    })

    it('Deve setar a acao do componente corretamente', async () => {

        const mockHandler = vi.fn()

        render(
        <MemoryRouter>
            <TextoEIcone texto="Login" acao={mockHandler} tamanho={38} Icone={FiLogIn}/>
        </MemoryRouter>)

        const container = await screen.findByRole('generic', {name:'icone-login-container'})
        
        await userEvent.click(container)

        expect(mockHandler).toHaveBeenCalled()

    })

})