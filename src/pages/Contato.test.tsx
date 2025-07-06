import { render, screen, waitFor } from '@testing-library/react'
import Contato from './Contato'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { act } from 'react'

describe('Testando página Contato',() => {

    it('Deve ter um título da página, um formulário, e uma label de envio de email rápido', async() => {

        render(
        <MemoryRouter initialEntries={['/contato']}>
            <Contato/>
        </MemoryRouter>)

        const emailEnvioSimples = await screen.findByRole('email-send-simplify')
        const titulo = await screen.findByText('Entre em contato')
        const formulario = await screen.findByRole('form')

        expect(emailEnvioSimples).toBeInTheDocument()
        expect(titulo).toBeInTheDocument()
        expect(formulario).toBeInTheDocument()

    })

    it('Deve ter um email-send-simplify e ter o link correto', async () => {


        render(
        <MemoryRouter initialEntries={['/contato']}>
            <Contato/>
        </MemoryRouter>)

        const emailEnvioSimples = await screen.findByRole('email-send-simplify')

        expect(emailEnvioSimples).toBeInTheDocument()

        const emailCopy = await screen.findByRole('generic', {name:'email-copy'})

        expect(emailCopy).toBeInTheDocument()

        const linkEnviarEmailSimples:HTMLLinkElement = await screen.findByText('Enviar E-mail')

        expect(linkEnviarEmailSimples).toBeInTheDocument()
        
        //Tem que possuir o início de 'mailto:' e depois um @ entre 1 caractere,
        //pelo menos.
        expect(linkEnviarEmailSimples.href).toMatch(/^mailto:[^@]+@[^@]+$/)

      
    })

})