import { render, screen, cleanup, waitFor } from '@testing-library/react'
import LinkAlternativo from './LinkAlternativo'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

function Location() {

    const loc = location.pathname
    return <div data-testid="location">{loc}</div>

}

describe('Testando o componente LinkAlternativo', () => {

    afterEach(()  => {cleanup(), vi.restoreAllMocks()})


    it('Deve ter um content e um link dentro', async () => {

        render(
        <MemoryRouter>
            <LinkAlternativo texto="Criar conta" caminho='/'/>
            <Routes>

                <Route path="*" element={<Location></Location>}></Route>

            </Routes>
        </MemoryRouter>)

        const container = await screen.findByRole('generic', {name:"content-link-alternativo"})

        const link = await screen.findByRole('link')
        
        expect(container).toBeInTheDocument()
        expect(link).toBeInTheDocument()


    })

    it('Deve setar corretamente o caminho e texto', async () => {

        render(
        <MemoryRouter>
            <LinkAlternativo texto="Criar conta" caminho="/"/>
        </MemoryRouter>)

        //já pega pelo texto pra não precisar de 2 expects
        const link = await screen.findByText('Criar conta')
        

        await userEvent.click(link)
        
        expect(link).toHaveAttribute('href', '/')
        
    })

})