# React Router na Prática: Rotas Sem Dor

O **React Router** é a biblioteca padrão para roteamento em aplicações React. Ele permite que você crie rotas declarativas em sua aplicação, gerenciando diferentes URLs e renderizando componentes específicos para cada uma delas. Com o React Router, a navegação entre páginas se torna intuitiva e a experiência do usuário melhora significativamente.

## Por Que Usar o React Router?

* **Navegação Single Page Application (SPA):** Permite que sua aplicação se comporte como uma SPA, onde a navegação entre "páginas" ocorre sem recarregar a página inteira, tornando a experiência mais fluida e rápida.
* **Rotas Declarativas:** Você define suas rotas de forma declarativa, o que torna o código mais legível e fácil de manter.
* **Histórico de Navegação:** Gerencia o histórico do navegador, permitindo que os usuários usem os botões "Voltar" e "Avançar".
* **Parâmetros de URL:** Suporta o uso de parâmetros na URL, facilitando a passagem de dados entre componentes.
* **Rotas Aninhadas:** Permite a criação de rotas aninhadas, ideal para layouts complexos.

## Instalação

Para começar a usar o React Router, você precisa instalá-lo em seu projeto. Abra o terminal na raiz do seu projeto React e execute:

```bash
npm install react-router-dom
# ou
yarn add react-router-dom
```

## Componentes Principais

O React Router oferece alguns componentes essenciais para configurar suas rotas:

* `<BrowserRouter>`: Envolve toda a sua aplicação e usa a API de histórico do HTML5 para manter a UI em sincronia com a URL. É o roteador mais comum para aplicações web.
* `<Routes>`: Um contêiner que agrupa seus componentes `<Route>`. Ele renderiza a primeira `<Route>` correspondente ao caminho atual.
* `<Route>`: Define uma rota individual. Ele recebe duas props principais:
    * `path`: O caminho da URL que essa rota deve corresponder.
    * `element`: O componente que será renderizado quando o `path` for correspondente.
* `<Link>`: Usado para criar links de navegação dentro da sua aplicação. Ele previne o recarregamento da página e usa o roteamento do React Router.
* `<NavLink>`: Similar ao `<Link>`, mas com a capacidade adicional de aplicar estilos quando a rota está ativa.
* `useNavigate()`: Um hook que permite a navegação programática (via código) entre rotas.
* `useParams()`: Um hook para acessar os parâmetros da URL.

## Exemplo Básico de Uso

Vamos criar um exemplo simples para ilustrar o uso do React Router.

### 1. Estrutura de Arquivos

```
src/
├── App.js
├── index.js
├── components/
│   ├── Home.js
│   ├── About.js
│   └── Contact.js
```

### 2. Componentes de Página

**`src/components/Home.js`**
```jsx
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Bem-vindo à Página Inicial!</h1>
      <p>Este é o conteúdo da página inicial.</p>
    </div>
  );
};

export default Home;
```

**`src/components/About.js`**
```jsx
import React from 'react';

const About = () => {
  return (
    <div>
      <h1>Sobre Nós</h1>
      <p>Saiba mais sobre nossa empresa.</p>
    </div>
  );
};

export default About;
```

**`src/components/Contact.js`**
```jsx
import React from 'react';

const Contact = () => {
  return (
    <div>
      <h1>Entre em Contato</h1>
      <p>Preencha o formulário para nos enviar uma mensagem.</p>
    </div>
  );
};

export default Contact;
```

### 3. Configuração das Rotas em `App.js`

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">Sobre</Link>
          </li>
          <li>
            <Link to="/contact">Contato</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Rota para 404 (página não encontrada) */}
        <Route path="*" element={<h1>Página Não Encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 4. Renderização em `index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Rotas com Parâmetros

Para rotas que precisam de informações dinâmicas (como o ID de um usuário ou produto), você pode usar parâmetros na URL.

```jsx
// Em App.js (ou onde suas rotas estão definidas)
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// Componente de Detalhes do Usuário
const UserDetails = () => {
  const { id } = useParams(); // Hook para pegar o parâmetro 'id' da URL
  return (
    <div>
      <h2>Detalhes do Usuário: {id}</h2>
      <p>Aqui você mostraria informações do usuário com ID {id}.</p>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users/1">Usuário 1</Link></li>
          <li><Link to="/users/2">Usuário 2</Link></li>
        </ul>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<h1>Página Inicial</h1>} />
        <Route path="/users/:id" element={<UserDetails />} /> {/* :id é o parâmetro */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## Navegação Programática com `useNavigate`

Às vezes, você precisa navegar para outra rota após uma ação (como um envio de formulário). O hook `useNavigate` é perfeito para isso.

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar o formulário...
    alert('Formulário enviado!');
    navigate('/success'); // Redireciona para a rota /success
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Seu nome" />
      <button type="submit">Enviar</button>
    </form>
  );
};

// ... e sua rota em App.js
// <Route path="/success" element={<h2>Sucesso!</h2>} />
```

## Considerações Finais

O React Router simplifica enormemente a criação de aplicações de página única com múltiplas "visões". Ao dominar seus componentes e hooks principais, você terá controle total sobre a navegação da sua aplicação React, oferecendo uma experiência de usuário fluida e profissional.

---