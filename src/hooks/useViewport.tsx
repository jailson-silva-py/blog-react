import { useEffect, useState } from "react"

const useViewport = (quebraLayout = 1080) => {

    const [viewport, setViewport] = useState(() => {

        return window.innerWidth < quebraLayout

    })

    useEffect(() => {

        const handleResize = () => {

            if (window.innerWidth < quebraLayout) {

                !viewport && setViewport(true)
                return

            }

            viewport && setViewport(false)

        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)

    })


    return {viewport}

}

export default useViewport