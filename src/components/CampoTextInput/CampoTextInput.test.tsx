import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CampoTextInput from './CampoTextInput'

describe ('Testando componente CampoTextInput', () => {

    it('Deve ter um container com uma tag para titulo e outro para o input', async () => {

        render (<MemoryRouter>
            <CampoTextInput texto="Usuário:" dica="Digite seu nome de usuário..."/>
            </MemoryRouter>)

        const container = await screen.findByLabelText('usuário')
        const tituloCampo = await screen.findByText('Usuário:')
        const input = await screen.findByPlaceholderText('Digite seu nome de usuário...')

        expect(container).toBeInTheDocument()
        expect(tituloCampo).toBeInTheDocument()
        expect(input).toBeInTheDocument()

    })



})