import { render, renderHook, screen } from '@testing-library/react'
import { RefObject, useRef } from 'react'
import { MemoryRouter } from 'react-router-dom'
import useOutClickElement from './useOutClickElement'
import userEvent from '@testing-library/user-event'

const ComponenteTeste = ({ref}:{ref:RefObject<HTMLButtonElement | null>}) => {

    return (
        <div style={{width:'100%', height:'100%'}}>
        <button style={{position:'absolute', right:0, bottom:0}}ref={ref}>Click</button>
        </div>

    )

}

describe('Testado Hook useOutClickElement', () => {

    it('Ao clickar no fora do botão, deve disparar o handle', async () => {

        const handle = vi.fn()
        const { result } = renderHook(() => {
            const ref = useRef<HTMLButtonElement | null>(null)
            return {ref,
                    useOutClick:useOutClickElement(ref, handle)}
        
    })
        render(
        <MemoryRouter>
            <ComponenteTeste ref={result.current.ref}/>
        </MemoryRouter>)

        console.log(innerWidth , innerHeight)

        const botao = await screen.findByText('Click')

        await userEvent.click(botao)

        expect(handle).not.toBeCalled()

        await userEvent.click(document.body)

        expect(handle).toBeCalled()


    })

})