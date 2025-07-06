import classes from '../styles/Posts.module.css'
import {MdSearch} from 'react-icons/md'
import { useState, useMemo, ChangeEvent } from 'react'
import { useCallback } from 'react'
import PostsExternos from '../components/PostsExternos/PostsExternos'
import { API } from '../api'

const Posts = () => {

    const [palavrasChave, setPalavrasChave] = useState("")
    const url = useMemo(() => {

        return palavrasChave ? `${API}/posts?q=${palavrasChave}`: `${API}/posts`

    }, [palavrasChave])

    const handlePesquisa = useCallback((e:ChangeEvent<HTMLInputElement>) =>  {

        setPalavrasChave(e.target.value)
      
    }, [])

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