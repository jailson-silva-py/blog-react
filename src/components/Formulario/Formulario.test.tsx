import { MemoryRouter } from "react-router-dom"
import { screen, render, cleanup } from '@testing-library/react'
import Formulario from "./Formulario"
import userEvent from "@testing-library/user-event"


describe('Teste do componente Formulário', () => {

    afterEach(cleanup)

    it('Deve setar o handleSubmit Corretamente e recebe childs corretamente', async () => {
        const handleSubmit = vi.fn()
        render(
        <MemoryRouter>
            <Formulario handleSubmit={handleSubmit}>
                <input type="submit" value="Enviar"/>
            </Formulario>
        </MemoryRouter>)

        const submit = await screen.findByRole('button', {name:'Enviar'})

        await userEvent.click(submit)

        expect(handleSubmit).toHaveBeenCalled()

    })

})