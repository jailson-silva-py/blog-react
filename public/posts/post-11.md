# Como consumir APIs REST no React

Quase toda aplicação web moderna precisa se comunicar com alguma API externa ou interna. No React, isso é feito com requisições HTTP — geralmente usando `fetch` ou bibliotecas como `axios`.

Neste post, você vai aprender como **consumir APIs REST no React**, lidar com estados de carregamento e erro, e aplicar boas práticas para manter seu código limpo e reutilizável.

## O que é uma API REST?

Uma API REST (Representational State Transfer) é uma interface que permite comunicação entre sistemas via HTTP, geralmente usando métodos como:

- `GET`: buscar dados
- `POST`: enviar/criar dados
- `PUT/PATCH`: atualizar dados
- `DELETE`: remover dados

Os dados são geralmente enviados e recebidos em formato JSON.

---

## Requisição com `fetch`

A função `fetch()` é nativa do JavaScript e funciona perfeitamente no React:

```jsx
import { useEffect, useState } from 'react';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <ul>
      {usuarios.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
````

---

## Usando `async/await` com `fetch`

```jsx
useEffect(() => {
  const buscarUsuarios = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  buscarUsuarios();
}, []);
```

---

## Usando `axios`

O `axios` é uma biblioteca externa que facilita o uso de requisições HTTP, com tratamento automático de JSON, suporte a interceptors e cancelamentos.

```bash
npm install axios
```

```jsx
import axios from 'axios';

useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then((res) => setUsuarios(res.data))
    .catch((err) => console.error(err))
    .finally(() => setLoading(false));
}, []);
```

---

## Reaproveitando com um hook customizado

Criar um `useFetch` pode ajudar a centralizar a lógica de requisição:

```jsx
import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDados(data))
      .catch((err) => setErro(err))
      .finally(() => setLoading(false));
  }, [url]);

  return { dados, loading, erro };
};
```

---

## Lidando com diferentes estados

Ao consumir uma API, você geralmente lida com três estados principais:

* Carregando (`loading`)
* Sucesso (`dados`)
* Erro (`erro`)

```jsx
if (loading) return <p>Carregando...</p>;
if (erro) return <p>Erro: {erro.message}</p>;
if (!dados) return <p>Sem dados disponíveis.</p>;
```

---

## Cuidados importantes

* Sempre trate erros de rede ou resposta inválida
* Evite múltiplos `useEffect` duplicados para requisições
* Cancele requisições pendentes em `useEffect` com `AbortController`
* Faça cache local ou global se os dados forem usados em várias páginas

---

## Conclusão

Consumir APIs REST no React é parte do dia a dia no front-end moderno. Com `fetch` ou `axios`, você consegue buscar, enviar e manipular dados com facilidade. A chave é organizar bem a lógica, tratar todos os estados possíveis e separar responsabilidades quando necessário.

Seja com um hook customizado, um contexto global ou direto no componente, dominar as requisições HTTP vai te tornar um dev React muito mais completo.

**Curtiu?** Salva esse post e aplica esse conhecimento no seu próximo projeto. API e front-end, quando bem conectados, fazem mágica acontecer 🚀

---
