import { cleanup, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Loading from "./Loading"
import classes from './Loading.module.css'

var useLoadingContextMock = vi.fn()

vi.mock('../../hooks/useLoadingContext', () => (

    {default: () => useLoadingContextMock()}

))

describe('Testando componente Loading', () => {

    afterEach(() => {

        cleanup()
        vi.restoreAllMocks()

    })

    it('Deve conter um container e um child (icone loading)', async () => {
        useLoadingContextMock.mockReturnValue({loading:true})
        render(
        <MemoryRouter>
            <Loading/>
        </MemoryRouter>)

        const loadingContent = await screen.findByRole('generic', {name:'loading-content'})
        const loading = await screen.findByRole('loading')

        expect(loadingContent).toBeInTheDocument()
        expect(loading).toBeInTheDocument()

    })

    it('Quando loading for false, não deve aparecer nada', () => {
        useLoadingContextMock.mockReturnValue({loading:false})
        render(
        <MemoryRouter>
            <Loading/>
        </MemoryRouter>)

        const loadingContent = screen.queryByRole('generic', {name:'loading-content'})
        const loading = screen.queryByRole('loading')

        expect(loadingContent).toBeNull()
        expect(loading).toBeNull()

    })

    it('O loading deve ter a classe loading que contém um infinite e a animação', async () => {
        useLoadingContextMock.mockReturnValue({loading:true})
        render(
        <MemoryRouter>
            <Loading/>
        </MemoryRouter>)

        const loading = await screen.findByRole('loading')

        expect(loading).toHaveClass(classes.loading)

    })

}) 