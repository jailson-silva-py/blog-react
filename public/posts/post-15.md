# React com TypeScript – introdução para devs JavaScript

Se você já manda bem em React com JavaScript, talvez esteja se perguntando: vale a pena aprender TypeScript? A resposta curta é: sim — e quanto antes, melhor.

TypeScript adiciona tipagem estática ao JavaScript, o que ajuda a evitar bugs, melhora a experiência no VSCode e deixa o código mais previsível. Neste post, vamos dar os primeiros passos com **React + TypeScript**, com explicações simples pra quem já domina o JS puro.

---

## Por que usar TypeScript no React?

- Detecção de erros em tempo de desenvolvimento
- Autocompletar mais inteligente
- Contratos claros entre componentes (props, estado, retorno)
- Melhora a refatoração e manutenção de código

Com TypeScript, você transforma "adivinhações" em **certezas de tipo**.

---

## Criando um projeto com TypeScript

Se estiver usando Vite:

```bash
npm create vite@latest meu-projeto --template react-ts
````

Ou, com Create React App:

```bash
npx create-react-app meu-projeto --template typescript
```

Arquivos terão extensão `.tsx` ao invés de `.jsx`.

---

## Tipando `props`

Imagine um componente que recebe uma `mensagem` e um número de `likes`.

### JS (sem TypeScript):

```jsx
const Mensagem = ({ mensagem, likes }) => (
  <p>{mensagem} - {likes} likes</p>
);
```

### TS:

```tsx
type Props = {
  mensagem: string;
  likes: number;
};

const Mensagem = ({ mensagem, likes }: Props) => (
  <p>{mensagem} - {likes} likes</p>
);
```

Agora o editor vai avisar se você esquecer de passar uma prop ou passar o tipo errado.

---

## Tipando `useState`

```tsx
const [contador, setContador] = useState<number>(0);
const [nome, setNome] = useState<string>('Jailson');
```

Se você não passar nada, o TS infere, mas é bom declarar o tipo em estados que começam como `null` ou objetos:

```tsx
type Usuario = {
  nome: string;
  idade: number;
};

const [usuario, setUsuario] = useState<Usuario | null>(null);
```

---

## Tipando eventos

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log('Clique!', e);
};

const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  setNome(e.target.value);
};
```

---

## Tipando `useRef`

```tsx
const inputRef = useRef<HTMLInputElement>(null);

const focarInput = () => {
  inputRef.current?.focus();
};
```

---

## Tipando componentes filhos

```tsx
type Props = {
  children: React.ReactNode;
};

const Card = ({ children }: Props) => (
  <div className="card">{children}</div>
);
```

---

## Boas práticas

* Comece simples: tipa props e estados primeiro
* Evite `any` (quebra a principal vantagem do TS)
* Use tipos reutilizáveis (`type` ou `interface`)
* Use `React.FC` com moderação (não é mais recomendado como padrão)

---

## Erros comuns de quem migra do JS

* Ignorar tipos de eventos (`e: any`)
* Não tratar `null` (TS exige que você pense em possibilidades)
* Querer tipar tudo de forma exagerada — começa pelo necessário

---

## Vale mesmo a pena?

TypeScript tem uma curva de aprendizado no começo, mas logo vira uma **ferramenta que te protege**. Ao invés de adivinhar se a `prop.title` existe, você simplesmente deixa o compilador te avisar.

Você ganha:

- ✅ Mais confiança
- ✅ Código mais limpo
- ✅ Menos bugs em produção
- ✅ Maior velocidade em times

---

## Conclusão

React com TypeScript é um combo poderoso. Se você já domina JS, só falta aprender a escrever os mesmos componentes com um pouco mais de precisão. Não precisa aprender tudo de uma vez — vá adicionando aos poucos, comece pelos props e `useState`.

Aos poucos, você vai ver o VSCode trabalhando a seu favor, detectando problemas antes mesmo de rodar o navegador.

**Curtiu?** Salva esse post como referência e começa a migrar um componente seu pra TS. Você vai ver a diferença logo no primeiro autocomplete 🚀

---
