import { render, screen, cleanup, act } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Toast from "./Toast"



describe('Testando o componente Toast', () => {

    afterEach(cleanup)

    it('Deve exbir o conteúdo corretamente', async () => {

        const state = {mostrarMensagem:true}
        const dispatch = vi.fn() 

        render(
        <MemoryRouter>
            <Toast 
            mostrarToast={state.mostrarMensagem} duracaoMs={2000}
            dispatch={dispatch} >
                Mensagem!
            </Toast>
        </MemoryRouter>)

        const toast = await screen.findByText('Mensagem!')

        expect(toast).toBeInTheDocument()


    })

})