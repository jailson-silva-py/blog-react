import { RefObject, useEffect } from "react"

const useOutClickElement = (ref:RefObject<HTMLElement | null>, handler:Function) => {

    useEffect(() => {

        const listener = (e:TouchEvent | MouseEvent) => {

            if (!ref.current || ref.current.contains(e.target as Node)) {

                return

            }

            handler(e)

        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {

            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)

        }

    })

}

export default useOutClickElement