# Lidando com estados globais no React

Gerenciar o estado de uma aplicação React é uma parte essencial de qualquer projeto. À medida que sua aplicação cresce, passa a ser necessário compartilhar dados entre diferentes componentes que não estão diretamente relacionados. É nesse cenário que entra o conceito de **estado global**.

Neste post, vamos explorar formas de lidar com estado global no React, desde soluções nativas como a Context API até bibliotecas como Redux, e quando cada uma é mais indicada.

## O que é estado global?

Estado global é qualquer informação que precisa estar acessível em várias partes da aplicação, como:

- Usuário autenticado
- Tema (dark/light)
- Itens de um carrinho de compras
- Preferências do usuário
- Dados de sessão

Componentes que estão em níveis diferentes da árvore de renderização podem precisar acessar ou alterar esses dados. E é aí que você precisa de uma estratégia eficiente de gerenciamento de estado.

## 1. Context API (nativo do React)

A Context API é uma ferramenta nativa do React que permite compartilhar dados entre componentes sem precisar passar props manualmente por várias camadas.

### Criando um contexto

```jsx
import { createContext, useState, useContext } from 'react';

const TemaContexto = createContext();

export const TemaProvider = ({ children }) => {
  const [tema, setTema] = useState('light');

  return (
    <TemaContexto.Provider value={{ tema, setTema }}>
      {children}
    </TemaContexto.Provider>
  );
};

export const useTema = () => useContext(TemaContexto);
````

### Usando o contexto

```jsx
import { useTema } from './TemaContexto';

const BotaoTema = () => {
  const { tema, setTema } = useTema();

  return (
    <button onClick={() => setTema(tema === 'light' ? 'dark' : 'light')}>
      Trocar tema (atual: {tema})
    </button>
  );
};
```

Você encapsula a aplicação com `<TemaProvider>` no topo da árvore e pode acessar o estado de qualquer lugar.

## 2. Redux (biblioteca externa)

Redux é uma biblioteca popular para gerenciamento de estado previsível. Pode parecer verboso no início, mas brilha em aplicações complexas com muitas interações entre dados.

### Quando usar Redux:

* Muitos tipos de dados interdependentes
* Precisa de middleware (ex: redux-thunk, redux-saga)
* Debugging avançado (Redux DevTools é excelente)
* Histórico de ações / undo-redo

Se sua aplicação é simples ou de porte médio, a Context API normalmente dá conta do recado.

## 3. Outras alternativas modernas

Além da Context API e do Redux, existem outras opções mais leves e modernas:

* **Zustand**: sintaxe simples, baseada em hooks
* **Jotai**: focada em reatividade granular
* **Recoil**: criada pela equipe do Facebook, ideal pra estados derivados e complexos
* **React Query**: para estado remoto (fetch/cache de API), não local

Exemplo com Zustand:

```jsx
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  incrementar: () => set((state) => ({ count: state.count + 1 })),
}));

const Botao = () => {
  const { count, incrementar } = useStore();
  return <button onClick={incrementar}>Contador: {count}</button>;
};
```

Zustand é leve, não precisa de provider e já é usada por grandes empresas.

## Qual escolher?

| Situação                                 | Solução recomendada |
| ---------------------------------------- | ------------------- |
| App pequeno ou médio                     | Context API         |
| Múltiplos dados entrelaçados e complexos | Redux               |
| Precisa de cache e requisições remotas   | React Query         |
| Quer algo minimalista e direto ao ponto  | Zustand ou Jotai    |

## Conclusão

Gerenciar estado global é algo que vai surgir cedo ou tarde em qualquer projeto React com múltiplas páginas ou funcionalidades. Felizmente, existem várias abordagens — desde as ferramentas nativas até bibliotecas poderosas.

Se você está começando, foque em entender a Context API e depois explore soluções como Zustand ou React Query conforme a complexidade do seu projeto aumentar.

A escolha certa depende sempre do tamanho da aplicação, da experiência da equipe e da manutenção futura. O importante é garantir que o estado seja acessível, previsível e fácil de modificar.

---