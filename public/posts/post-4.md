# Criando componentes reutilizáveis em React

Uma das maiores forças do React é sua capacidade de criar **componentes reutilizáveis**. Essa abordagem reduz repetição de código, melhora a manutenção da aplicação e aumenta a consistência da interface.

Se você está começando a desenvolver projetos mais robustos, entender **como e quando criar componentes reutilizáveis** vai te ajudar a trabalhar de forma mais eficiente e profissional.

---

## O que são componentes reutilizáveis?

São componentes que foram criados para serem usados em **múltiplos lugares**, com comportamentos e estilos parametrizados através de **props**.

Em vez de copiar e colar um botão, um card ou uma caixa de input em vários arquivos, você cria um único componente genérico e usa ele com diferentes configurações.

---

## Exemplo prático: botão reutilizável

Em vez de fazer isso várias vezes:

```jsx
<button className="btn btn-primary">Salvar</button>
<button className="btn btn-secondary">Cancelar</button>
```

// components/Button.jsx
```js
const Button = ({ children, variant = 'primary', onClick }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
```

E usar assim: 

```js
<Button variant="primary" onClick={salvar}>Salvar</Button>
<Button variant="secondary" onClick={cancelar}>Cancelar</Button>
```

Simples, limpo e reaproveitável.

---

## Dicas para criar componentes reutilizáveis

1. Pense em "variações"
Antes de copiar e colar um código, pense: “Eu poderia tornar isso um componente genérico e passar variações por props?”

2. Evite criar componentes supercomplexos
Um componente reutilizável deve ser simples e modular. Se ele começa a ter lógica demais, pode estar fazendo coisa demais.

3. Nomeie de forma clara
Use nomes como Card, Input, Modal, PostPreview, que indicam o propósito visual do componente.

4. Separe estilo e lógica
Use CSS Modules ou styled-components para encapsular o estilo. Isso evita conflitos e facilita o reuso em diferentes contextos.

## Onde usar componentes reutilizáveis

Botões com estilos diferentes (primário, secundário, alerta)

- Inputs e selects com validação

- Cards de exibição (post, produto, usuário)

- Modais e diálogos

- Loaders e spinners

- Containers ou grids genéricos

---