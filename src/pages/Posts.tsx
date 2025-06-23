import classes from '../styles/Posts.module.css'
import {MdSearch} from 'react-icons/md'
import { useState, useMemo, ChangeEvent } from 'react'
import { useCallback } from 'react'
import useFetch from '../hooks/useFetch'
import PostsExternos from '../components/PostsExternos/PostsExternos'

const Posts = () => {

    const [palavrasChave, setPalavrasChave] = useState("")
    const url = useMemo(() => {

        return palavrasChave ? "http://localhost:3000/posts?q="+palavrasChave:"http://localhost:3000/posts"

    }, [palavrasChave])

    const handlePesquisa = useCallback((e:ChangeEvent<HTMLInputElement>) =>  {

        setPalavrasChave(e.target.value)
        console.log("valores setados")
    }, [])

    const {items} = useFetch(url)

    return (

        <>
        
            <main id="content">

                <div className={classes.pesquisaPosts}>
                    <MdSearch size={32} className={classes.pesquisaIcone}/>
                    <input type="search" className={classes.pesquisa} value={palavrasChave} 
                    onChange={handlePesquisa} placeholder='Digite as palavras-chave...'/>


                </div>

                <PostsExternos urlPosts={url}/>


            </main>

        </>

    )

}

export default Posts