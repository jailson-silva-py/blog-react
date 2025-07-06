import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Rodape from './Rodape'

describe('Testando componente Rodape', () => {

    afterEach(cleanup)

    it('Deve conter dois links (github e linkedin)', async () => {

        render(
        <MemoryRouter>
            <Rodape/>
        </MemoryRouter>)

        const links = await screen.findAllByRole('link')
        
        expect(links).toHaveLength(2)

    })

    it('Cada link deve ter um ícone e um texto correspondente', async () => {

        render(
        <MemoryRouter>
            <Rodape/>
        </MemoryRouter>)

        const linkedinIcon = await screen.findByRole('linkedin-icon')
        const linkedinText = await screen.findByText('Linkedin')
        const githubinText = await screen.findByText('Github')
        const githubIcon = await screen.findByRole('github-icon')

        expect(linkedinIcon).toBeInTheDocument()
        expect(linkedinText).toBeInTheDocument()
        expect(githubIcon).toBeInTheDocument()
        expect(githubinText).toBeInTheDocument()
        
        
        

    })

})