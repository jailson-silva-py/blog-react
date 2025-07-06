import { renderHook, waitFor, cleanup } from "@testing-library/react"
import useManualFetch from "./useManualFetch"
import { LoadingContextProvider } from "../context/LoadingContext"
import { act } from "react"

describe('Testando hook useManualFetch', () => {

    afterEach(() => {
        cleanup()
        vi.resetAllMocks()
        vi.restoreAllMocks()
    })

    const dado = {id:0, usuario:'slayer', senha:'123'}

    it('Deve mostrar os dados corretamente', async () => {

        globalThis.fetch = vi.fn().mockResolvedValue({

            ok:true,
            json: async () => dado

        })
        
        const { result } = renderHook(() => useManualFetch())

        let usuario:any
    
        await act(async () => {

            usuario = await result.current.getDados('http://localhost:3000/usuario')

        })
        
        
        await waitFor (() => expect(usuario).toEqual(dado))

    })

    it('Deve settar loading = true enquanto o dado não for encontrado', async () => {

        globalThis.fetch = vi.fn().mockResolvedValue({

            ok:true,
            json: () => new Promise(() => {})

        })
        const { result } = renderHook(() => useManualFetch(), 
        {wrapper:LoadingContextProvider})

        result.current.getDados('http://localhost:3000/usuario')
        
        //Sem await mesmo, porque apenas quero verificar se loading = true
        //Como retornei uma Promise vazia, não vai se resolver ou rejeitar nunca.
        await waitFor(() => {

            expect(result.current.loading).toEqual(true)
            
        })
        

    })

    it('Deve setar dados corretamente (setDados)', async () => {

        globalThis.fetch = vi.fn().mockResolvedValue({

            text: () => dado

        })

        const { result } = renderHook(() => useManualFetch(), 
        {wrapper:LoadingContextProvider})

        let usuario:any

        await act (async () => {

            usuario = await result.current.setDados('http://localhost:3000/usuarios',
        dado)

        })

        await waitFor(() => {

            expect(usuario).toEqual(dado)
            expect(globalThis.fetch).toHaveBeenCalledWith('http://localhost:3000/usuarios',
        {

            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(dado),

        })

        })

        

    })

    it('Deve retornar undefined se conexão for negada', async () => {

        globalThis.fetch = vi.fn().mockRejectedValue(new Error('Rejeitada'))

        const { result } = renderHook(() => useManualFetch(), 
        {wrapper:LoadingContextProvider})

        let usuario:any

        await act(async () => {

            usuario = await result.current.setDados('http://localhost:3000/usuarios',
        dado)

        })

        await waitFor (() => {expect(usuario).toEqual(undefined)})

    })

    

    it('Deve ter os dados igual a null se a requisição for rejeitada', async () => {

        globalThis.fetch = vi.fn().mockRejectedValue(new Error('Rejeitada!'))

        const { result } = renderHook(() => useManualFetch())

        let usuario:any
        
        await act(async () => {

            usuario = await result.current?.getDados('http://localhost:3000/usuario')
            
            
        }) 
        
        expect(usuario).toEqual(null)

    })

})