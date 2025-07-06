import { render, renderHook, act } from '@testing-library/react'
import { useAutenticacaoContext } from './useAutenticacaoContext'
import { AutenticacaoContextProvider } from '../context/AutenticacaoContext'

describe('Testando hook useAutenticacaoContext', () => {

    afterEach(() => localStorage.clear())

    it('Deve iniciar com um usuário vazio', () => {

        const {result} = renderHook(() => useAutenticacaoContext())

        expect(result.current.usuarioLogado).toBeNull()

    })

    it('Deve setar o usuario no localStorage Corretamente', async () => {

        const {result} = renderHook(() => useAutenticacaoContext(), {wrapper:AutenticacaoContextProvider})

        const usuario = {id:0, usuario:"slayer", senha:'123'}
    
        act(() => result.current.setUsuarioLogado(usuario))
        expect(localStorage.getItem('usuario')).toBe(JSON.stringify(usuario))

        

    })

    it('Deve ter um logout que nula o usuario', async () => {

        const { result } = renderHook(() => useAutenticacaoContext(), {wrapper:AutenticacaoContextProvider})

        const usuario = {id:0, usuario:"slayer", senha:'123'}

            
        act(() => result.current.setUsuarioLogado(usuario))
        expect(localStorage.getItem('usuario')).toBe(JSON.stringify(usuario))

        act(() => result.current.logout())
        expect(localStorage.getItem('usuario')).toBeNull()
        expect(result.current.usuarioLogado).toBeNull()

    })

})