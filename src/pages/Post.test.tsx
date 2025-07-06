import { MemoryRouter } from "react-router-dom"
import { render, screen } from '@testing-library/react'
import Post from "./Post"

describe('Testando página Post', () => {

    it('Deve ter o post (conteúdo do post), um formulário para envio de comentário, e os comentários', async () => {

        render(<MemoryRouter><Post/></MemoryRouter>)

        const postInterno = await screen.findByRole('generic', {name:'post-interno'})
        const formulario = await screen.findByRole('form')
        const comentarios = await screen.findByRole('comentarios')

        expect(postInterno).toBeInTheDocument()
        expect(formulario).toBeInTheDocument()
        expect(comentarios).toBeInTheDocument()

    })

})