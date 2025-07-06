import { LoadingContext } from "../context/LoadingContext"
import { useContext } from 'react'

const useLoadingContext = () => {

    const {loading, setLoading} = useContext(LoadingContext)
    

    return {loading, setLoading}

}

export default useLoadingContext