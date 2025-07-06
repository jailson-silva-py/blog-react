import classes from './BotaoMudaTema.module.css'
import useTemaContext from '../../hooks/useTemaContext'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useRef, useState } from 'react'

const BotaoMudaTema = () => {

    const {tema, setTema} = useTemaContext()
    const refButton = useRef<HTMLButtonElement | null>(null)
    const [pos, setPos] = useState(
        {x:document.documentElement.clientWidth - 100, 
        y:document.documentElement.clientHeight - 100})

    const handleTema = () => {

        setTema(tema === 'light'? 'dark':'light')

    }

    const moveElemento =  (e:React.PointerEvent<HTMLButtonElement>) => {

        e.preventDefault()

        e.currentTarget.setPointerCapture(e.pointerId)
        console.log('setPointerCapture com: '+e.pointerId)
        
        const button = e.currentTarget
        let houveMovimento = false
        const moverComCursor = (e:PointerEvent) => {
            e.preventDefault();
            houveMovimento = true
            

            if(refButton.current) {
                
                const vW = document.documentElement.clientWidth
                const vH = document.documentElement.clientHeight

                let posX
                let posY

                if (e instanceof TouchEvent) {
                    posX = e.touches[0].clientX
                    posY = e.touches[0].clientY

                } else {

                    posX = e.clientX
                    posY = e.clientY

                }

                
                
                const x = Math.min(Math.max(0, posX - 40), vW - 84)
                const y = Math.min(Math.max(0, posY - 40), vH - 84)

                setPos({x, y})
               
            }
        }
    

        const encerraMovimento = (e:PointerEvent) => {

            button.releasePointerCapture(e.pointerId)
            console.log('releasePointerCapture com: '+e.pointerId)
            !houveMovimento && handleTema()
            houveMovimento =  false
            document.removeEventListener('pointermove', moverComCursor)
            document.removeEventListener('pointerup', encerraMovimento)

        }

        document.addEventListener('pointermove', moverComCursor, { passive:false })
        document.addEventListener('pointerup', encerraMovimento, { passive:false })
            
        
    }

    return (
        <button className={classes.botaoMudaTema} onPointerDown={moveElemento}
        ref={refButton} role="btn-muda-tema"
        style={{left:pos.x, top:pos.y}}
        >
            {tema === 'light'? <FaMoon size={38} className={classes.icone}/>: 
            <FaSun className={classes.icone} size={38}/>}
        </button>

    )


}

export default BotaoMudaTema