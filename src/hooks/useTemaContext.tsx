import { useContext } from "react"
import { TemaContext } from "../context/TemaContext"

const useTemaContext = () => {

    const { tema, setTema } = useContext(TemaContext)

    return { tema, setTema}

}

export default useTemaContext