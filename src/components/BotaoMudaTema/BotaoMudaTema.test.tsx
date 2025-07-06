import { render, screen, act, fireEvent, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { TemaContextProvider } from "../../context/TemaContext"
import BotaoMudaTema from "./BotaoMudaTema"
import userEvent from "@testing-library/user-event"


describe('Testando Componente BotaoMudaTema', () => {


    beforeAll(() => {

        HTMLElement.prototype.setPointerCapture = vi.fn()
        HTMLElement.prototype.releasePointerCapture = vi.fn()

    })

    afterAll(() => {

        vi.resetAllMocks()
        localStorage.clear()

    })

    it('Deve alterar o tema quando clickado', async () => {

        render(<MemoryRouter><BotaoMudaTema/></MemoryRouter>, 
            {wrapper:TemaContextProvider})

        const botao:HTMLButtonElement = await screen.findByRole('btn-muda-tema')

        botao.setPointerCapture = vi.fn()
        botao.releasePointerCapture = vi.fn()

        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
        expect(localStorage.getItem('tema')).toEqual('dark')

        await act(() => userEvent.click(botao))

        

        expect(document.documentElement.getAttribute('data-theme')).toEqual('light')
        expect(localStorage.getItem('tema')).toEqual('light')

    })

    // it('Deve mover o botão quando arrastado (moousedown, mousemove e mouseup)', async () => {

    //     Object.defineProperty(document.documentElement, 'clientWidth', {

    //         value:800,
    //         configurable:true,

    //     })

    //     Object.defineProperty(document.documentElement, 'clientHeight', {

    //         value:800,
    //         configurable:true,
    //     })

    //     const addEvent = vi.spyOn(document, 'addEventListener')
    //     const removeEvent = vi.spyOn(document, 'removeEventListener')

    //     render(<MemoryRouter><BotaoMudaTema/></MemoryRouter>, 
    //         {wrapper:TemaContextProvider})

    //     const botao = await screen.findByRole('btn-muda-tema')

    //     expect(botao).toHaveStyle('left:700px')
    //     expect(botao).toHaveStyle('top:700px')

    //     await act(async () => {

    //         fireEvent.pointerDown(botao, {pointerId:1, 
    //             pointertype:'mouse', clientX:750, clientY:750, bubbles:true})

    //     })

    //     await act(async () => {

    //         fireEvent.pointerMove(botao, {pointerId:1, pointertype:'mouse', 
    //             clientX:100, clientY:0, bubbles:true})

    //     })

    //     console.log(botao.style.left)

    //     await act(async () => {

            
            
    //         fireEvent.pointerUp(botao, {pointerId:1, pointertype:'mouse',
    //             bubbles:true
    //         })

    //     })

    //     expect(HTMLElement.prototype.releasePointerCapture).toHaveBeenCalled()
    //     expect(HTMLElement.prototype.setPointerCapture).toHaveBeenCalled() 
        
    //     await waitFor(() => {

    //         const computed = window.getComputedStyle(botao)
    //         expect(computed.left).toBe('100px')

    //     })
        
        

    // })

})