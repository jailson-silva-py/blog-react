import { screen, render, cleanup } from '@testing-library/react'
import { useContext } from 'react'
import { LoadingContext, LoadingContextProvider } from './LoadingContext'
import userEvent from '@testing-library/user-event'

const ComponenteTeste = () => {

    const {loading, setLoading} = useContext(LoadingContext)

    return (
    <>
    {loading && <p>Carregando...</p>}
    <button onClick={() => setLoading(true)}>Click</button>
    </>)

}

describe('Testando Contexto LoadingContext', () => {

    afterEach(cleanup)

    it('Deve esconder loading caso o loading = true não for setado', () => {

        render(<ComponenteTeste/>, { wrapper:LoadingContextProvider })

       
        const carregamento =  screen.queryByRole('paragraph')

        expect(carregamento).toBeNull()

    })

    it ('Deve mostrar loading caso loading = true', async () => {

        render(<ComponenteTeste/>, { wrapper:LoadingContextProvider })

        const button = await screen.findByText(/click/i)
        await userEvent.click(button)

        const carregamento = await screen.findByRole('paragraph')

        expect(carregamento).toBeInTheDocument()

    })

})