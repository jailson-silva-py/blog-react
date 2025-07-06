import { act, renderHook } from "@testing-library/react"
import useMensagemContext from "./useMensagemContext"
import { MensagemContextProvider } from "../context/MensagemContext"

describe('Testando o hook useMensagemContext', () => {

    it('Deve ter valor iniciar com o mostrarMensagem como false', () => {

        const { result } =  renderHook(() => useMensagemContext(), 
        {wrapper:MensagemContextProvider})

        expect(result.current.state.mostrarMensagem).toEqual(false)

    })

    it('Deve ter o dipatch funcional', async () => {

        const { result } =  renderHook(() => useMensagemContext(), 
        {wrapper:MensagemContextProvider})

        await act(async () => result.current.dispatch({type:'MOSTRAR'}))

        expect(result.current.state.mostrarMensagem).toEqual(true)

    })

})