import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CampoAreaInput from './CampoAreaInput'

describe ('Testando componente CampoAreaInput', () => {

    it('Deve ter um conteiner com uma tag para titulo e outro para o input', async () => {

        render (<MemoryRouter>
            <CampoAreaInput texto="Comentário:" dica="Digite seu comentário aqui..."/>
            </MemoryRouter>)

        const container = await screen.findByLabelText('comentário')
        const tituloCampo = await screen.findByText('Comentário:')
        const input = await screen.findByPlaceholderText('Digite seu comentário aqui...')

        expect(container).toBeInTheDocument()
        expect(tituloCampo).toBeInTheDocument()
        expect(input).toBeInTheDocument()

    })



})