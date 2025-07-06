import { ReactNode, useEffect } from 'react'
import classes from './Toast.module.css'
import { CounterActionMessageDispatch } from '../../types/contextTypes'

interface Iprops {

    children:ReactNode,
    mostrarToast:boolean,
    dispatch:React.Dispatch<CounterActionMessageDispatch>,
    duracaoMs:number

}

const Toast = ({children, mostrarToast, dispatch, duracaoMs}:Iprops) => {


    useEffect(() => {

        const time = setTimeout(() => dispatch({type:"ESCONDER"}), duracaoMs)

        return () => {clearTimeout(time)}

    }, [mostrarToast])

    return (
        <>
        {mostrarToast && <div className={classes.toast}>{children}</div>}
        </>

    )

}

export default Toast