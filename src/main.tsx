import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import Login from './pages/Login'
import Post from './pages/Post'
import Posts from './pages/Posts'
import './index.css'
import App from './App'
import Contato from './pages/Contato'
import Sobre from './pages/Sobre'
import CriarConta from './pages/CriarConta'
import { AutenticacaoContextProvider } from './context/AutenticacaoContext'
import { MensagemContextProvider } from './context/MensagemContext'
import { LoadingContextProvider } from './context/LoadingContext'
import Loading from './components/Loading/Loading'

const router = createBrowserRouter([

  {

    path:"/",
    element:<App/>,
    errorElement:<ErrorPage/>,
    children: [

      {

        path:'/',
        element:<Home/>,

      },

      {

        path:'posts/',
        element:<Posts/>,

      },

      {

        path:'posts/:id/',
        element:<Post/>

      },

      {

        path:'contato/',
        element:<Contato/>

      },

      {

        path:'sobre/',
        element:<Sobre/>

      },

      {

        path:'login/',
        element:<Login/>

      },
      {

        path:'criar_conta/',
        element: <CriarConta/>

      }

    ]

  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingContextProvider>
      <MensagemContextProvider>
        <AutenticacaoContextProvider>

          <Loading/>
          <RouterProvider router={router}/>
          
        </AutenticacaoContextProvider>
      </MensagemContextProvider>
    </LoadingContextProvider>
  </StrictMode>,
)
