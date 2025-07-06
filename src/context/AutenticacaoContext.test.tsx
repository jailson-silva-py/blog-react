import { screen, render } from '@testing-library/react'
import { useContext } from 'react'
import { AutenticacaoContext, AutenticacaoContextProvider } from './AutenticacaoContext'
import userEvent from '@testing-library/user-event'

const ComponenteTeste = () => {

    const {usuarioLogado, setUsuarioLogado} = useContext(AutenticacaoContext)

    return (
    <>
    <span data-testid="usuario">{usuarioLogado && usuarioLogado.usuario}</span>
    <button onClick={() => setUsuarioLogado({id: 0, usuario:'slayer', senha:'123'})}>
    Atribuir
    </button>
    </>)

}

describe('Testando contexto AutenticacaoContext', () => {

    afterEach(() => localStorage.clear())

    it('Deve ter o usuário vazio se não for setado',async () => {

        render(
        <ComponenteTeste/>
        )

        const usuario = await screen.findByTestId('usuario')

        expect(usuario.textContent).toBe('')

    })


    it('Deve aparecer o nome caso tiver usuário setado', async () => {

        render(<ComponenteTeste/>, {wrapper: AutenticacaoContextProvider})

        const botao = await screen.findByText(/atribuir/i)

        await userEvent.click(botao)

        const usuario = await screen.findByTestId('usuario')

        expect(usuario.textContent).toBe('slayer')
        expect(localStorage.getItem('usuario')).toBe(JSON.stringify({id: 0, usuario:'slayer', senha:'123'}))

    })

})