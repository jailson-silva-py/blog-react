# Como usar o `useReducer` em situações reais no React

Se você já trabalha com React e domina o `useState`, provavelmente em algum momento se deparou com componentes que têm **múltiplos estados relacionados** ou **lógica complexa de atualização**. Nessas horas, `useReducer` entra em cena como uma alternativa poderosa e escalável.

Muito mais do que um substituto para `useState`, o `useReducer` traz uma abordagem mais clara e previsível de lidar com estados que dependem de múltiplas ações — algo muito comum em formulários, carrinhos de compra, validações e interfaces mais robustas.

Neste post, vamos explorar como funciona o `useReducer`, onde ele brilha de verdade, e como aplicá-lo de forma prática em projetos reais com React.

---

## O que é o `useReducer`?

O `useReducer` é um hook que funciona como uma pequena máquina de estado: ele recebe um estado inicial e uma função **reducer** que sabe como atualizar esse estado com base em ações.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
````

* `state`: o estado atual
* `dispatch`: a função que dispara ações
* `reducer`: uma função que recebe `(state, action)` e retorna o **novo estado**

Esse padrão é muito parecido com o que usamos no Redux, mas integrado ao React de forma leve e local.

---

## Quando usar `useReducer`?

Você pode continuar usando `useState` para estados simples. Mas quando começar a ver isso:

```jsx
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');
const [erro, setErro] = useState('');
```

...provavelmente é hora de migrar para um `useReducer`, especialmente se esses estados mudam juntos ou em função de eventos complexos.

Use `useReducer` quando:

✅ Você tem múltiplos campos de estado relacionados
✅ As atualizações de estado são baseadas em **ações específicas**
✅ O estado depende do valor anterior
✅ Você quer deixar a lógica mais organizada

---

## Exemplo 1: formulário com validação

### Sem `useReducer`:

```jsx
const [form, setForm] = useState({ nome: '', email: '' });

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};
```

Funciona. Mas e se quiser validar, limpar campos, lidar com erros e status de envio? Fica bagunçado.

### Com `useReducer`:

```jsx
const initialState = {
  nome: '',
  email: '',
  erro: '',
  enviado: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'CAMPO':
      return { ...state, [action.campo]: action.valor };
    case 'ENVIAR':
      if (!state.email.includes('@')) {
        return { ...state, erro: 'E-mail inválido' };
      }
      return { ...state, enviado: true, erro: '' };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
```

No componente:

```jsx
const [estado, dispatch] = useReducer(formReducer, initialState);

return (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      dispatch({ type: 'ENVIAR' });
    }}
  >
    <input
      name="nome"
      value={estado.nome}
      onChange={(e) =>
        dispatch({ type: 'CAMPO', campo: 'nome', valor: e.target.value })
      }
    />
    <input
      name="email"
      value={estado.email}
      onChange={(e) =>
        dispatch({ type: 'CAMPO', campo: 'email', valor: e.target.value })
      }
    />
    {estado.erro && <p>{estado.erro}</p>}
    {estado.enviado && <p>Formulário enviado!</p>}
    <button type="submit">Enviar</button>
  </form>
);
```

Essa abordagem deixa claro **o que está acontecendo** e **por que está acontecendo**, centralizando a lógica em um único lugar.

---

## Exemplo 2: carrinho de compras

```jsx
const initialCart = [];

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADICIONAR':
      return [...state, action.produto];
    case 'REMOVER':
      return state.filter((item) => item.id !== action.id);
    case 'LIMPAR':
      return [];
    default:
      return state;
  }
}
```

Uso:

```jsx
const [carrinho, dispatch] = useReducer(cartReducer, initialCart);

// Adicionar item
dispatch({ type: 'ADICIONAR', produto: { id: 1, nome: 'Camiseta' } });

// Remover item
dispatch({ type: 'REMOVER', id: 1 });
```

Você pode até armazenar esse estado no `localStorage` ou em um contexto.

---

## Boas práticas com `useReducer`

✅ Use `switch/case` no reducer para clareza
✅ Nunca modifique o `state` diretamente
✅ Prefira `type` + `payload` em vez de muitos parâmetros soltos
✅ Combine com `Context` para estados globais simples
✅ Crie funções auxiliares para ações complexas (`action creators`)

---

## Quando *não* usar `useReducer`

* Estados muito simples (ex: toggle de modal)
* Se estiver usando Redux globalmente e já tem os reducers no store
* Quando a complexidade não justifica a estrutura

---

## Dica bônus: useReducer + Context

Se você quer um “Redux light” local no seu projeto, combine `useReducer` com `Context`:

```jsx
const [state, dispatch] = useReducer(appReducer, initialApp);
<AppContext.Provider value={{ state, dispatch }}>
  {children}
</AppContext.Provider>
```

Em qualquer componente:

```jsx
const { state, dispatch } = useContext(AppContext);
```

---

## Conclusão

O `useReducer` é uma arma secreta no arsenal de qualquer dev React que busca controle, clareza e escalabilidade.
Quando bem usado, ele transforma estados confusos e fragmentados em uma lógica elegante, centralizada e fácil de manter.

Se você já se sentiu incomodado com muitos `useState` no mesmo componente, essa é sua deixa pra experimentar o `useReducer`.

**Curtiu?** Refatora aquele formulário bagunçado no seu projeto usando `useReducer` e veja como o código fica mais limpo, fluido e previsível. E de quebra, mostra que você manja dos hooks avançados! 🚀

---
