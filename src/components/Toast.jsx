import { useState, useEffect } from 'react'
import classes from './Toast.module.css'

const Toast = ({children, mostrarToast, dispatch, duracaoMs}) => {


    useEffect(() => {

        setTimeout(() => dispatch({type:"ESCONDER"}), duracaoMs)

    }, [])

    return (
        <>
        {mostrarToast && <div className={classes.toast}>{children}</div>}
        </>

    )

}

export default Toast