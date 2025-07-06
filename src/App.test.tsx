import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import App from "./App"

describe('Testando o App', () => {

    it('Deve ter barra de navegação, botão muda tema e rodapé', () => {

        render(<MemoryRouter><App/></MemoryRouter>)

        const btnMudaTema = screen.getByRole('btn-muda-tema')
        const barraDeNavegação = screen.getByRole('navigation')
        const rodape = screen.getByRole('contentinfo')

        expect(btnMudaTema).toBeInTheDocument()
        expect(barraDeNavegação).toBeInTheDocument()
        expect(rodape).toBeInTheDocument()

    })

})