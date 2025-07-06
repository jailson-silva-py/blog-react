import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BotaoSubmit from './BotaoSubmit'

describe ('Testando componente BotaoSubmit', () => {

    it('Deve mostrar o texto correto e estar dentro de um container', async () => {

        render (<MemoryRouter><BotaoSubmit texto="Enviar"/></MemoryRouter>)

        const container = await screen.findByRole('generic', {name:'btn-container'})
        const botao = await screen.findByRole('button', {name:'Enviar'})

        expect(container).toBeInTheDocument()
        expect(botao).toBeInTheDocument()

    })



})