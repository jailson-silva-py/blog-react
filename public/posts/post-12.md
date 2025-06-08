# Entendendo o ciclo de vida dos hooks no React

Se você já usou `useEffect`, `useState` ou qualquer outro hook no React, provavelmente se perguntou em algum momento: **quando exatamente isso é executado?** Entender o ciclo de vida dos hooks é essencial para controlar a renderização e evitar bugs inesperados no seu app.

Neste post, vamos explorar como os principais hooks do React funcionam durante o ciclo de vida de um componente — e como usá-los da forma certa.

---

## Hooks ≠ Componentes de Classe

Antes dos hooks, o React usava **métodos de ciclo de vida** nas classes, como:

- `componentDidMount()`
- `componentDidUpdate()`
- `componentWillUnmount()`

Com os hooks, esse comportamento foi condensado principalmente dentro do `useEffect`.

---

## O ciclo de vida com `useEffect`

O hook `useEffect` é executado **depois da renderização do componente**, e pode se comportar de três maneiras diferentes, dependendo dos parâmetros:

### 1. Executar apenas uma vez (equivalente ao `componentDidMount`)

```jsx
useEffect(() => {
  console.log("Executa uma vez após montar");
}, []);
````

* O array de dependências vazio `[]` faz com que o efeito rode apenas **na montagem**.

### 2. Executar sempre que alguma dependência mudar (equivalente ao `componentDidUpdate`)

```jsx
useEffect(() => {
  console.log("Executa toda vez que `contagem` mudar");
}, [contagem]);
```

* Toda vez que `contagem` mudar, o efeito será reexecutado.

### 3. Executar algo na desmontagem (equivalente ao `componentWillUnmount`)

```jsx
useEffect(() => {
  const timer = setInterval(() => console.log('Rodando...'), 1000);
  return () => {
    clearInterval(timer);
    console.log("Componente desmontado");
  };
}, []);
```

* A função retornada dentro do `useEffect` é chamada **na desmontagem** do componente.

---

## Renderização no React com hooks

1. O componente é renderizado
2. Os hooks (`useState`, `useRef`, `useContext`, etc.) são executados **na ordem declarada**
3. Após a renderização, o `useEffect` roda
4. Quando as dependências do `useEffect` mudam, ele é limpo e reexecutado

---

## Hooks que participam do ciclo de vida

| Hook              | Quando é executado                                         |
| ----------------- | ---------------------------------------------------------- |
| `useState`        | Durante a renderização (inicialização do estado)           |
| `useEffect`       | Após renderizar (pode montar, atualizar ou desmontar)      |
| `useLayoutEffect` | Após render, mas antes da pintura visual (⚠️ mais técnico) |
| `useRef`          | Persiste entre renders, sem causar re-render               |
| `useCallback`     | Memoriza função, evita recriação                           |
| `useMemo`         | Memoriza valor calculado                                   |

---

## `useLayoutEffect` vs `useEffect`

* Ambos rodam **após a renderização**
* `useLayoutEffect` bloqueia a pintura até executar (pode causar travamentos se mal usado)
* Use `useLayoutEffect` apenas quando precisa medir o layout ou aplicar estilos antes do usuário ver

---

## Evitando loops infinitos

Um erro comum com `useEffect` é esquecer o array de dependências ou incluir referências erradas:

```jsx
useEffect(() => {
  setValor(valor + 1); // ⚠️ Loop infinito
}, [valor]);
```

* Isso atualiza o estado `valor`, que ativa o efeito de novo... criando um loop.

✅ Sempre analise quais valores realmente precisam estar no array de dependências.

---

## Dica: debug com logs

Você pode usar `console.log` dentro dos efeitos e fora deles para entender o comportamento:

```jsx
console.log("Renderizando componente");

useEffect(() => {
  console.log("Executando useEffect");
}, []);
```

Isso ajuda a visualizar a ordem de execução.

---

## Conclusão

Entender o ciclo de vida dos hooks é fundamental para criar componentes eficientes, previsíveis e sem bugs.
Ao dominar o `useEffect`, você consegue controlar comportamentos após renderizações, limpezas de efeito e interações com APIs externas com clareza.

Se você já se perguntou por que algo está rodando mais de uma vez — ou não está rodando —, agora você tem as ferramentas para investigar e corrigir isso com confiança.

**Curtiu?** Salva esse post e consulta sempre que estiver com dúvida sobre quando um hook deve (ou não) rodar. Conhecer o ciclo de vida é chave para dominar React de verdade 🚀

---
