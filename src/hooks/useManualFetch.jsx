import { useState } from 'react'

const useManualFetch = () => {

    const [loading, setLoading] = useState(false)
    
    const getDados = async (url) => {
        let dados = null
        try {

        setLoading(true)
        const rev = await fetch(url)
        dados =  await rev.json()
        
        } catch (error) {

            console.log("Erro ao buscar os dados (useManualFetch): "+error.message)

        } finally {

            setLoading(false)

        }

        return dados

    }

    const setDados  = async (url, dados) =>  {
        let request
        try {

            setLoading(true)
            request = await fetch(url, {

            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(dados),

           }) 
           

           console.log(request)

            

        } catch(error) {

            console.log("Erro ao enviar dados em: "+error.message)

        } finally {

            setLoading(false)
            return await request.text()
        }


    }

    

    return {getDados, setDados, loading}

}

export default useManualFetch