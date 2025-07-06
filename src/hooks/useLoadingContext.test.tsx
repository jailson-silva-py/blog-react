import { renderHook, act } from "@testing-library/react"
import useLoadingContext from "./useLoadingContext"
import { LoadingContextProvider } from "../context/LoadingContext"


describe('Testando hook useLoadingContext', () => {

    it('Deve ter por padrão o loading = false', () => {

        const {result} =  renderHook(() => useLoadingContext(), 
        {wrapper:LoadingContextProvider})

        expect(result.current.loading).toEqual(false)

    })

    it('Deve ter loading = true, se settado true)', () => {

        const {result} =  renderHook(() => useLoadingContext(), 
        {wrapper:LoadingContextProvider})

        act(() => result.current.setLoading(true))

        expect(result.current.loading).toEqual(true)

    })

})