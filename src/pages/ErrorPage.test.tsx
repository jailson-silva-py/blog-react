import { render, screen, within } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import ErrorPage from "./ErrorPage"

describe('Testando página ErrorPage', () => {

    it('Deve ter um h1 com NotFoundError', () => {

        render(<MemoryRouter><ErrorPage/></MemoryRouter>)

        const msgErro = screen.getByText(/404 not found error/i)

        //case insensitive, vai passar se usar de h1 à h6
        expect(msgErro.tagName).toMatch(/^h[1-6]$/i)

    })

})