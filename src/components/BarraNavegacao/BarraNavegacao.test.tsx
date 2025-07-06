import { render, screen, cleanup } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'
import BarraNavegacao from './BarraNavegacao'
import { MemoryRouter } from 'react-router-dom'
import classes from './BarraNavegacao.module.css'
import { AutenticacaoContext, AutenticacaoContextProvider } from '../../context/AutenticacaoContext'

describe('Testando componente Barra de Navegação', () => {

    
    it('Deve conter 5 elementos no menu', async () => {
        
        const usuario = {id:0, usuario:'slayer', senha:'123'}
        localStorage.setItem('usuario', JSON.stringify(usuario))

        render(
        <MemoryRouter>
            <BarraNavegacao/>
        </MemoryRouter>, {wrapper:AutenticacaoContextProvider})
        
        const home = await screen.findByText(/home/i)
        const contato = await screen.findByText(/contato/i)
        const blog = await screen.findByText(/blog/i)
        const sobre = await screen.findByText(/sobre/i)
        const profile = await screen.findByRole('list', {name:'dropdown-profile'})

        expect(home).toBeInTheDocument()
        expect(contato).toBeInTheDocument()
        expect(blog).toBeInTheDocument()
        expect(sobre).toBeInTheDocument()

        expect(profile).toBeInTheDocument()

    })


})