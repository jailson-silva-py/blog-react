import { render, screen, act } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import FormularioComentario from "./FormularioComentario"
import { AutenticacaoContextProvider } from "../../context/AutenticacaoContext"
import { MensagemContextProvider } from "../../context/MensagemContext"
import userEvent from "@testing-library/user-event"


describe('Testando Componente FormularioComentario', () => {
    afterEach(() => localStorage.clear())

    globalThis.fetch = vi.fn(async (url:URL | RequestInfo) => {

        const nUrl = String(url)

        if (nUrl === 'http://localhost:3000/comentarios') {

            return new Response(JSON.stringify([

                     {
                    "id": 9,
                    "postId": 0,
                    "autor": "Vinícius UX",
                    "titulo": "Técnico, Grosso!",
                    "estrelas": 5,
                    "conteudo": "Conteúdo técnico muito bem escrito. Gostei que você se preocupou com a semântica e boas práticas. Vai ajudar bastante quem tá aprendendo!"
                    },
                    {
                    "postId": "0",
                    "titulo": "Muito bom!",
                    "estrelas": 5,
                    "conteudo": "Textozinho interessante, de fato.",
                    "autor": "Imensuravel",
                    "id": 10
                    }

                ]), {

                headers:{'Content-type':'application/json'},
                status:200,

            })
        }

        else if(nUrl.includes('?postId=') && nUrl.includes('autor=')) {

            return new Response(JSON.stringify([{
                    
                    "id": 9,
                    "postId": 0,
                    "autor": "root",
                    "titulo": "Técnico, Grosso!",
                    "estrelas": 5,
                    "conteudo": "Conteúdo técnico muito bem escrito"

                }]), {

                    headers:{'Content-type':'application/json'},
                    status:200,

                })
            

        }

        else {

            return new Response(JSON.stringify([]), {

                headers:{'Content-type':'application/json'},
                status:200,

            })

        }

        })
    


    it('Deve conter um título, uma lista (das estrelas) e dois inputs (um do título comentário e outro do comentário em si) ', async () => {
        localStorage.setItem('usuario', JSON.stringify(
            {id:0, usuario:'root', senha:123}))
        await act(async () => render(<MemoryRouter><FormularioComentario postId="0"/></MemoryRouter>, 
            {wrapper:({children}) => (

                <AutenticacaoContextProvider>
                    <MensagemContextProvider>
                        {children}
                    </MensagemContextProvider>
                </AutenticacaoContextProvider>

            )}))

        const titulo = screen.getByText(/avalie o post/i)
        const listaEstrelas = screen.getByRole('list')
        const inputs = screen.getAllByRole('textbox')
        const submit = screen.getByText(/enviar/i)


        expect(titulo).toBeInTheDocument()
        expect(listaEstrelas).toBeInTheDocument()
        expect(inputs).toHaveLength(2)
        expect(submit).toBeInTheDocument()
        
    })

    it('Os dois inputs devem ser controlados (controled inputs)', async () => {

        localStorage.setItem('usuario', JSON.stringify(
        {id:0, usuario:'root', senha:123}))

        globalThis.fetch = vi.fn()

        await act(async () => render(<MemoryRouter><FormularioComentario postId="0"/></MemoryRouter>, 
            {wrapper:({children}) => (

                <AutenticacaoContextProvider>
                    <MensagemContextProvider>
                        {children}
                    </MensagemContextProvider>
                </AutenticacaoContextProvider>

            )}))


        const inputs = screen.getAllByRole('textbox')

        await act(async () => await userEvent.type(inputs[0], 'tituloComentario'))
        await act(async () => await userEvent.type(inputs[1], 'conteudoComentario'))


        expect((inputs[0] as HTMLInputElement).value).toBe('tituloComentario')
        expect((inputs[1] as HTMLTextAreaElement).value).toBe('conteudoComentario')
        

    })

    it('Deve mudar de estrela vazia para estrela preenchida quando clickar em uma estrela', async () => {

        localStorage.setItem('usuario', JSON.stringify(
        {id:0, usuario:'root', senha:123}))


        await act(async () => render(<MemoryRouter><FormularioComentario postId="0"/></MemoryRouter>, 
            {wrapper:({children}) => (

                <AutenticacaoContextProvider>
                    <MensagemContextProvider>
                        {children}
                    </MensagemContextProvider>
                </AutenticacaoContextProvider>

            )}))


      const estrela5 = screen.getByRole('listitem', {name:'estrela-5'})

      await userEvent.click(estrela5)

      const estrelasVazias = screen.queryAllByRole('estrela-vazia')
      
      //não possui nenhum elemento (porque foi clickado na 5° estrela)
      expect(estrelasVazias.length).toBe(0)
      
    })

})




