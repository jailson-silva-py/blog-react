import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Sobre from "./Sobre"

describe('Testando página Sobre',() => {

    it('Deve ter 1 título e 3 subtítulos', () => {

        render(<MemoryRouter initialEntries={['/sobre']}><Sobre/></MemoryRouter>)

        const tituloPagina = screen.getByText(/sobre o blog/i)
        const missao = screen.getByText(/missão/i)
        const tecnlogias = screen.getByText(/tecnologias utilizadas/i)
        const sobreAutor = screen.getByText(/sobre o autor/i)
        

        expect(tituloPagina).toBeInTheDocument()
        expect(missao).toBeInTheDocument()
        expect(tecnlogias).toBeInTheDocument()
        expect(sobreAutor).toBeInTheDocument()
        

    })

    it('Deve ter uma lista com mais de uma tecnologai usada', () => {

        render(<MemoryRouter initialEntries={['/sobre']}><Sobre/></MemoryRouter>)

        const lista = screen.getByRole('list')
        const itemLista = screen.getAllByRole('listitem')

        expect(lista).toBeInTheDocument()
        expect(itemLista.length).toBeGreaterThan(1)

    })

    it('Deve ter um parágrafo na sessão sobre o blog, missão e sobre o autor', () => {

        render(<MemoryRouter initialEntries={['/sobre']}><Sobre/></MemoryRouter>)

        const pSobreBlog = screen.getByRole('paragraph',
            {name:'paragrafo-sobre-blog'})
        const pMissao = screen.getByRole('paragraph',
            {name:'paragrafo-missao'})
        const pSobreAutor = screen.getByRole('paragraph',
            {name:'paragrafo-sobre-autor'})



    })

    

})