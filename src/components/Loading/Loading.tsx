import useLoadingContext from '../../hooks/useLoadingContext'
import classes from './Loading.module.css'
import { FaSpinner } from 'react-icons/fa'

const Loading = () => {

    const {loading} = useLoadingContext()

    return (
        <>
        {loading && 
            <div className={classes.loadingContent} aria-label="loading-content">
            <FaSpinner size={80} className={classes.loading} role="loading"/>
            </div>
        }
        </>

    )

}

export default Loading