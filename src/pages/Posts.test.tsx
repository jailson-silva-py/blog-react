import { MemoryRouter } from "react-router-dom"
import { screen, render, act, waitFor } from '@testing-library/react'
import Posts from "./Posts"
import userEvent from "@testing-library/user-event"

describe('Testando a página Posts', () => {


    afterEach(() => vi.restoreAllMocks())

    it('Deve ter um input search e um section dos posts', async () => {

        render(<MemoryRouter initialEntries={['/posts']}><Posts/></MemoryRouter>)

        const inputSearch = screen.getByPlaceholderText('Digite as palavras-chave...')
        const posts = await screen.findByRole('posts-externos')


        expect(inputSearch).toBeInTheDocument()
        expect(posts).toBeInTheDocument()

    })

    it('Deve filtrar corretamente os posts com o search', async () => {

        const user = userEvent.setup()
        vi.spyOn(global, 'fetch')
        render(<MemoryRouter initialEntries={['/posts']}><Posts/></MemoryRouter>)

        const inputSearch = screen.getByPlaceholderText('Digite as palavras-chave...')

        await act(async () =>  await user.type(inputSearch, 'typescript'))

        await waitFor (() => {

            expect(globalThis.fetch).toHaveBeenCalledWith("http://localhost:3000/posts?q=typescript", {signal:expect.any(AbortSignal)})

        }) 


    })



})