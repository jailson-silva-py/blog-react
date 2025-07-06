import { MemoryRouter } from "react-router-dom"
import { render, screen } from '@testing-library/react'
import Home from "./Home"

describe('Testando Página Home', () => {

    it('Deve ter uma div para cabeçalho, um parágrafo para descrever as experiências e os posts principais', () => {

        render(<MemoryRouter initialEntries={['/']}><Home/></MemoryRouter>)

        const cabecalho = screen.getByRole('cabecalho-home')
        const paragrafoDescricao = screen.getByRole('paragraph')
        const postsPrincipais = screen.getByRole('posts-externos')

        expect(cabecalho).toBeInTheDocument()
        expect(postsPrincipais).toBeInTheDocument()
        expect(paragrafoDescricao).toBeInTheDocument()
        
    })

    it('Deve ter uma imagem, um nome(h1) e área(h3) no cabecalho', () => {

        render(<MemoryRouter initialEntries={['/']}><Home/></MemoryRouter>)

        const cabecalho = screen.getByRole('cabecalho-home')
        const img = screen.getByRole('img', {name:'foto-perfil'})
        const nome = screen.getByRole('heading', {name:'nome-autor', level:1})
        const area = screen.getByRole('heading', {name:'area-autor', level:3})

        expect(cabecalho).toBeInTheDocument()
        expect(img).toBeInTheDocument()
        expect(nome).toBeInTheDocument()
        expect(area).toBeInTheDocument()
        
    })

})