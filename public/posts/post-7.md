# Hooks customizados: reutilizando lógica no React

Com a chegada dos hooks no React, ficou muito mais simples lidar com estados e efeitos colaterais de forma declarativa. E uma das funcionalidades mais poderosas que os hooks trouxeram foi a possibilidade de **criar seus próprios hooks customizados**.

Eles permitem que você extraia lógica repetida de componentes e a reutilize de forma clara e testável. Neste post, vamos explorar como funcionam os hooks customizados, quando usar e como aplicar na prática.

## Por que usar hooks customizados?

À medida que um componente cresce, é comum que ele comece a conter múltiplos `useEffect`, `useState` e funções auxiliares que acabam deixando o código difícil de manter.

A criação de hooks customizados ajuda a:

- Organizar melhor a lógica por responsabilidade
- Reutilizar código entre componentes
- Melhorar legibilidade e separação de preocupações
- Facilitar testes unitários

Em outras palavras, hooks customizados são uma forma de escrever **código limpo, reaproveitável e modular**.

## Como criar um hook customizado

Um hook é basicamente uma função que **usa outros hooks**.

### Exemplo: hook para buscar dados de uma API

```jsx
import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        setLoading(true);
        const resposta = await fetch(url, { signal });
        if (!resposta.ok) throw new Error('Erro ao buscar dados');
        const json = await resposta.json();
        setDados(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setErro(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { dados, loading, erro };
};

export default useFetch;
````

Esse `useFetch` pode ser usado em qualquer componente que precise buscar dados, mantendo a lógica centralizada em um lugar só.

## Quando criar um hook customizado?

Use hooks customizados quando:

* Há **lógica repetida** em mais de um componente
* Você quer separar **preocupações** (ex: lógica de formulário, lógica de fetch, etc.)
* Precisa **isolar efeitos colaterais** com `useEffect`
* Quer testar funcionalidades específicas sem depender do componente

## Exemplos úteis de hooks personalizados

### 1. `useLocalStorage`

```jsx
const useLocalStorage = (chave, valorInicial) => {
  const [valor, setValor] = useState(() => {
    const salvo = localStorage.getItem(chave);
    return salvo ? JSON.parse(salvo) : valorInicial;
  });

  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(valor));
  }, [chave, valor]);

  return [valor, setValor];
};
```

### 2. `useToggle`

```jsx
const useToggle = (estadoInicial = false) => {
  const [valor, setValor] = useState(estadoInicial);
  const toggle = () => setValor((prev) => !prev);
  return [valor, toggle];
};
```

### 3. `useWindowWidth`

```jsx
const useWindowWidth = () => {
  const [largura, setLargura] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setLargura(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return largura;
};
```

Esses hooks tornam seu código muito mais expressivo e reutilizável.

## Convenção de nomenclatura

Todos os hooks customizados devem começar com o prefixo `use`:

✅ `useAuth`, `useForm`, `usePost`, etc.
❌ `authHook`, `getFormState`, etc.

Isso é importante porque o React depende disso para **rastrear corretamente o estado e o ciclo de vida** dos hooks.

## Conclusão

Hooks customizados são uma das ferramentas mais poderosas que o React oferece. Eles permitem que você crie funcionalidades reutilizáveis, melhore a legibilidade dos seus componentes e mantenha seu projeto limpo e organizado.

Quanto mais seu projeto crescer, mais você vai sentir a necessidade de extrair lógica repetida — e hooks são a forma ideal de fazer isso sem perder a simplicidade do React.

**Comece criando seus próprios hooks** agora mesmo, mesmo que sejam simples. Com o tempo, você terá um verdadeiro kit de utilidades React no seu projeto.

---