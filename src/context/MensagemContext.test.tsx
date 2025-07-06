import { cleanup, screen, render} from "@testing-library/react"
import { useContext } from "react"
import { MensagemContext, MensagemContextProvider } from "./MensagemContext"
import userEvent from "@testing-library/user-event"

const ComponenteTeste = () => {

    const {state, dispatch} = useContext(MensagemContext)

    return (
        <>

            {state.mostrarMensagem && <div>Mensagem</div>}
            <button onClick={() => dispatch({type:'MOSTRAR'})}>Mostrar</button>
            <button onClick={() => dispatch({type:'ESCONDER'})}>Esconder</button>
            {/* @ts-expect-error*/}
            <button onClick={() => dispatch({type:'Qualquer coisa'})}>Default</button>

        </>
    )
}

describe('Testando Context MensagemContext', () => {

    afterEach(cleanup)

    it('Deve esconder mensagem caso mostrarMensagem = false', () => {
  

        render(<ComponenteTeste/>, 
            {wrapper:MensagemContextProvider})

        const mensagem = screen.queryByText(/mensagem/i)

        expect(mensagem).toBeNull()
        
    })

    it('Deve exibir mensagem caso mostrarMensagem = true', async() => {


        render(<ComponenteTeste/>, {wrapper:MensagemContextProvider})
       
        const button = await screen.findByText(/mostrar/i)

        await userEvent.click(button)

        const mensagem = await screen.findByText(/mensagem/i)

        expect(button).toBeInTheDocument()
        expect(mensagem).toBeInTheDocument()
    })

    it('Deve atribuir mostrarMensagem = false se o type do dispatch for ESCONDER', async() => {
        
        render(<ComponenteTeste/>, {wrapper:MensagemContextProvider})
       
        const mostrar = await screen.findByText(/mostrar/i)

        await userEvent.click(mostrar)

        let mensagem:HTMLElement | null = await screen.findByText(/mensagem/i)

        expect(mensagem).toBeInTheDocument()

        const esconder = await screen.findByText(/esconder/i)
        
        await userEvent.click(esconder)

        mensagem = screen.queryByText(/mensagem/i)

        expect(mensagem).toBeNull()

    })

    it('Se o dispatch tiver um valor desconhecido, ele apenas retorna o mesmo state', async () => {

        render(<ComponenteTeste/>, {wrapper:MensagemContextProvider})
       
        const mostrar = await screen.findByText(/mostrar/i)

        await userEvent.click(mostrar)

        let mensagem:HTMLElement | null = await screen.findByText(/mensagem/i)

        expect(mensagem).toBeInTheDocument()

        const default_ = await screen.findByText(/default/i)

        await userEvent.click(default_)

        mensagem = screen.queryByText(/mensagem/i)

        expect(mensagem).toBeInTheDocument()

    })

})