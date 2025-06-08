# Organizando seu projeto React com boas práticas

Uma das principais diferenças entre um código amador e um código profissional está na organização. Quando falamos de projetos em React, a estrutura de pastas, a separação de responsabilidades e a escalabilidade da aplicação fazem toda a diferença no longo prazo. Um projeto pequeno pode crescer rapidamente, e se ele não estiver bem estruturado desde o início, isso vai gerar uma dor de cabeça enorme lá na frente.

Neste post, quero compartilhar com você algumas boas práticas que adotei ao longo da minha experiência com React para manter meus projetos organizados, escaláveis e fáceis de entender — tanto para mim quanto para qualquer outra pessoa que entre no time ou revise meu código no futuro.

---

## 1. Comece com uma estrutura clara de diretórios

Quando criamos um projeto com `create-react-app` ou com `Vite`, a estrutura inicial é bem simples:

/src
App.jsx
index.js


Isso pode funcionar no início, mas rapidamente começa a ficar bagunçado quando adicionamos componentes, estilos, páginas, imagens, serviços e hooks personalizados.

A sugestão é criar uma estrutura modular que reflita a arquitetura do seu projeto. Um exemplo funcional seria:

/src
/assets → imagens, ícones, fontes
/components → componentes reutilizáveis
/pages → páginas inteiras (rotas)
/hooks → hooks personalizados
/styles → arquivos CSS/CSS Modules
/data → arquivos JSON ou mocks
/services → chamadas a APIs
/utils → funções auxiliares
App.jsx
main.jsx


Essa organização permite que você escale o projeto sem perder a cabeça.

---

## 2. Componentes: pequenos, reutilizáveis e organizados

Componentes são a base do React. Uma boa prática é criar **componentes pequenos e com responsabilidade única**. Isso facilita testes, manutenção e reutilização.

Dentro de `/components`, você pode ainda organizar por função ou por domínio:


/components
/Header
Header.jsx
Header.module.css
/PostCard
PostCard.jsx
PostCard.module.css


> Dica: usar CSS Modules ou styled-components ajuda a evitar conflitos de escopo de estilo.

---

## 3. Use páginas para estruturar suas rotas

Evite colocar tudo no `App.jsx`. Crie um diretório `/pages` e coloque ali suas rotas principais:

/pages
Home.jsx
Blog.jsx
Post.jsx
Contato.jsx


Isso separa a lógica de navegação da lógica de layout e deixa a aplicação mais limpa.

---

## 4. Centralize seus dados e simulações

Durante o desenvolvimento, especialmente quando ainda não há uma API pronta, é comum usar dados simulados. Em vez de encher seus componentes com arrays de mock, **crie um diretório `/data` com arquivos JSON ou JavaScript exportando os dados**.


Isso também facilita a migração para um backend real depois — basta substituir o fetch para ir à API em vez do mock.

---

## 5. Use `hooks` personalizados para lógica compartilhada

Ao invés de repetir lógica de `fetch`, por exemplo, crie seu próprio hook:

```js
// /hooks/useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
};

export default useFetch;
```

Agora você pode usar isso em qualquer componente ou página:

```js
const { data: posts, loading } = useFetch('/api/posts');
```

## 6. Separe suas chamadas de API em services

Se você usa fetch ou axios, evite repetir chamadas nos componentes. Crie arquivos no diretório /services para isso:

```js

// /services/postService.js
import axios from 'axios';

export const getPosts = () => axios.get('/api/posts');
export const getPostById = (id) => axios.get(`/api/posts/${id}`);


```

Isso reduz acoplamento e centraliza os pontos de falha.

## 7. Mantenha consistência de nomenclatura

Escolha um padrão de nomenclatura para arquivos e componentes, e mantenha ele sempre. Exemplos populares:

- PascalCase para componentes: PostCard.jsx

- camelCase para funções e variáveis: getPosts(), userData

- kebab-case para arquivos de estilo ou imagens: header.module.css, profile-photo.jpg

## 8. Adicione comentários e documentações quando necessário
Um bom código se explica sozinho, mas comentários pontuais ajudam bastante. Especialmente se você estiver escrevendo uma lógica mais complexa, ou lidando com regras de negócio específicas.

E se você tiver hooks, serviços ou funções que serão usados por outros devs, vale muito documentar bem esses pontos.


# Conclusão

Organizar seu projeto React desde o início com boas práticas faz toda a diferença. Isso evita retrabalho, facilita onboarding de novos desenvolvedores e permite escalar a aplicação com segurança.

A estrutura não precisa ser perfeita desde o primeiro commit, mas precisa evoluir com o projeto. Quanto mais disciplinado você for com a organização, mais saudável seu código será a longo prazo.

Boas práticas não são luxo, são sobrevivência — especialmente em projetos maiores ou que vivem por meses (ou anos). Então comece com o pé direito!

---