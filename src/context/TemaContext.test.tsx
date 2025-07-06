import { MemoryRouter } from "react-router-dom"
import { act, useContext } from "react"
import { TemaContext, TemaContextProvider } from "./TemaContext"
import { renderHook, waitFor } from '@testing-library/react'

describe('Testando ContextoTemaContext', () => {

    it('O setTema deve alterar os valores corretamente', async () => {

        const { result } = renderHook(() => useContext(TemaContext), {wrapper:TemaContextProvider})

        expect(result.current.tema).toEqual('dark')

        result.current.setTema('light')

        await waitFor(() => {

            expect(result.current.tema).toEqual('light')

        })
        


    })

    it('Deve salvar o tema no localStorage depois de settar o tema', async () => {

        const { result } = renderHook(() => useContext(TemaContext), {wrapper:TemaContextProvider})


        result.current.setTema('light')

        await waitFor(() => {

            expect(result.current.tema).toEqual('light')
            expect(localStorage.getItem('tema')).toEqual('light')

        })

    })

})