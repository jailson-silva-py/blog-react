import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import CriarConta from "./CriarConta"
import userEvent from "@testing-library/user-event"
import { act } from "react"

describe('Testando página CriarConta', () => {

    it('Deve ter um input de usuario, um de senha, um de confirmar senha e submit', () => {

        render(<MemoryRouter><CriarConta/></MemoryRouter>)

        const usuario = screen.getByPlaceholderText(/digite seu usuário.../i)
        const senha = screen.getByPlaceholderText(/digite sua senha.../i)
        const confirmarSenha = screen.getByPlaceholderText(/confirme sua senha.../i)
        const submit = screen.getByText('Enviar')

        expect(usuario).toBeInTheDocument()
        expect(senha).toBeInTheDocument()
        expect(confirmarSenha).toBeInTheDocument()
        expect(submit).toBeInTheDocument()

    })

    it('Deve ter o submit funcionando corretamente', async () => {

        const nomeUsuario = 'Imen2132321321'
        const senhaUsuario = '392032132321321'

        const usuarioObj = {usuario:nomeUsuario, senha:senhaUsuario}

        globalThis.fetch = vi.fn().mockResolvedValue({

            ok:true,
            json: async () => (usuarioObj)

        })

        render(<MemoryRouter><CriarConta/></MemoryRouter>)

        const usuario = screen.getByPlaceholderText(/digite seu usuário.../i)
        const senha = screen.getByPlaceholderText(/digite sua senha.../i)
        const confirmarSenha = screen.getByPlaceholderText(/confirme sua senha.../i)

        const submit = screen.getByText('Enviar')

        expect(submit).toBeInTheDocument()

 

        await userEvent.type(usuario, nomeUsuario)

        await userEvent.type(senha, senhaUsuario)
        await userEvent.type(confirmarSenha, senhaUsuario)

        await userEvent.click(submit)

        expect(globalThis.fetch).toHaveBeenCalledWith('http://localhost:3000/usuarios/', 
            expect.objectContaining({

            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(usuarioObj)

        }))



    })

})