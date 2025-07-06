import { useState, useEffect } from 'react'
import useLoadingContext from './useLoadingContext'
 
const useFetch = (url:string) => {

    const [items, setItems] = useState([])
    const {setLoading} = useLoadingContext()

    //Pega dados do Banco de dados (simulação com json-server)
    useEffect(() => {

        const controller = new AbortController()
        const {signal} = controller

        const getData = async () => {
            
            try {

            setLoading(true)

            const data = await fetch(url, {signal})
            const rev = await data.json()
            setItems(rev)

            setLoading(false)

            } catch (error:any) {

                if (error.name != 'AbortError') {

                    console.log("Erro no getData(): "+error.name)

                }
                

            }

        }

        getData()
        

        return () => controller.abort()

    }, [url]) 


    return {items}

}

export default useFetch