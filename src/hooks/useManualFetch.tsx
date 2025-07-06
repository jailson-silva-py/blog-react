import useLoadingContext from './useLoadingContext'


const useManualFetch = () => {

    const {loading, setLoading} = useLoadingContext()
    
    const getDados = async (url:string, emJson=true) => {
        let dados = null
        try {

        setLoading(true)
        const rev = await fetch(url)
        dados =  emJson? await rev.json() : await rev.text()
        
        } catch (error:any) {

            console.log("Erro ao buscar os dados (useManualFetch): "+error.message)

        } finally {

            setLoading(false)
            return dados

        }

    }

    const setDados  = async (url:string, dados:any) =>  {
        let request
        try {

            setLoading(true)
            request = await fetch(url, {

            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(dados),

           }) 
           

           console.log(request)

            

        } catch(error:any) {

            console.log("Erro ao enviar dados em: "+error.message)

        } finally {

            setLoading(false)
            if (!request) return
            
            return 'text' in request? await request.text():undefined
            
            
        }


    }

    

    return {getDados, setDados, loading}

}

export default useManualFetch