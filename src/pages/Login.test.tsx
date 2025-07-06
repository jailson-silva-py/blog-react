import { MemoryRouter } from "react-router-dom"
import { render, screen, waitFor } from '@testing-library/react'
import Login from "./Login"
import userEvent from "@testing-library/user-event"
import { AutenticacaoContextProvider } from "../context/AutenticacaoContext"

describe('Testando página Login', () => {

    afterEach(() => {localStorage.clear(); vi.resetAllMocks()})

    it('Deve ter um campo usuário, um de senha, criar conta e o submit', () => {

        render(<MemoryRouter initialEntries={['/login']}><Login/></MemoryRouter>)

        const usuario = screen.getByPlaceholderText('Digite o nome do usuário...')
        const senha = screen.getByPlaceholderText('Digite sua senha...')
        const criarConta = screen.getByText(/criar conta/i)
        const submit = screen.getByText(/enviar/i)

        expect(usuario).toBeInTheDocument()
        expect(senha).toBeInTheDocument()
        expect(criarConta).toBeInTheDocument()
        expect(submit).toBeInTheDocument()
        

    })

    it('Deve ter  o valor de usuário e senha controlados', async () => {

        const user = userEvent.setup()

        render(<MemoryRouter initialEntries={['/login']}><Login/></MemoryRouter>)
    
        const usuario:HTMLInputElement = screen.getByPlaceholderText('Digite o nome do usuário...')
        const senha:HTMLInputElement = screen.getByPlaceholderText('Digite sua senha...')

        expect(usuario).toBeInTheDocument()
        expect(senha).toBeInTheDocument()
        
        await user.type(usuario, 'root')
        await user.type(senha, '123')

        expect(usuario.value).toEqual('root')
        expect(senha.value).toEqual('123')

    })

    it('O link de criar conta deve direcionar para a página correta', async () => {

        render(<MemoryRouter initialEntries={['/login']}><Login/></MemoryRouter>)
       
        const criarConta:HTMLLinkElement = screen.getByText(/criar conta/i)

        expect(criarConta).toBeInTheDocument()
        expect(criarConta.href).toEqual('http://localhost:3000/criar_conta/')
    })

    it('Ao clickar em submit, deve setar corretamente o usuário logado no localStorage', async () => {

        render(<MemoryRouter initialEntries={['/login']}><Login/></MemoryRouter>
            , {wrapper:AutenticacaoContextProvider}
        )

        const user = userEvent.setup()
        const usuarioObj = {id:0, usuario:'root', senha:'123'}
        globalThis.fetch = vi.fn().mockResolvedValue({

            ok:true,
            json: async () => [usuarioObj]

        })

        const usuario:HTMLInputElement = screen.getByPlaceholderText('Digite o nome do usuário...')
        const senha:HTMLInputElement = screen.getByPlaceholderText('Digite sua senha...')
        const submit:HTMLInputElement = screen.getByText(/enviar/i)

        expect(usuario).toBeInTheDocument()
        expect(senha).toBeInTheDocument()
        expect(submit).toBeInTheDocument()
        
        await user.type(usuario, usuarioObj.usuario)
        await user.type(senha, usuarioObj.senha)

        expect(usuario.value).toEqual(usuarioObj.usuario)
        expect(senha.value).toEqual(usuarioObj.senha)

        await user.click(submit)

        await waitFor(() => {

            const localUsuario = localStorage.getItem('usuario')

            expect(localUsuario).toEqual(JSON.stringify(usuarioObj))
            
        })
        

    })

    it('Deve informar que o usuário está logado e exibir um elemento para fazer logout quando já tiver logado', async () => {
 

        const user = userEvent.setup()
        const usuarioObj = {id:0, usuario:'root', senha:'123'}
        localStorage.setItem('usuario', JSON.stringify(usuarioObj))

        render(<MemoryRouter initialEntries={['/login']}><Login/></MemoryRouter>
            , {wrapper:AutenticacaoContextProvider}
        )
        
        const elementoLogout = screen.getByText(/^.*clique aqui.*$/i)

        await user.click(elementoLogout)

        const formularioLogin = await screen.findByRole('form')
        const headingFormularioLogin = await screen.findByText('Login')
        
        expect(formularioLogin).toBeInTheDocument()
        expect(headingFormularioLogin).toBeInTheDocument()

    })

})