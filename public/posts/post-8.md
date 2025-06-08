# Estilizando seu app com CSS Modules

Organização e previsibilidade são fatores cruciais no desenvolvimento de interfaces com React. Um dos maiores desafios em projetos grandes é evitar conflitos de estilos e manter a estrutura de CSS limpa. É exatamente por isso que **CSS Modules** são tão úteis: eles trazem escopo local ao CSS de forma simples e eficaz.

Neste post, você vai entender como usar CSS Modules no React, quais as vantagens dessa abordagem e boas práticas para deixar seu projeto estilizado e organizado.

## O que é CSS Modules?

CSS Modules é uma convenção que permite que os estilos sejam aplicados apenas ao componente onde foram importados. Isso evita conflitos de nomes de classes, pois cada classe é "modificada" automaticamente para garantir escopo local.

### Exemplo básico

```css
/* Contato.module.css */
.botao {
  background-color: blue;
  color: white;
  padding: 8px 16px;
}
````

```jsx
import styles from './Contato.module.css';

const Contato = () => {
  return <button className={styles.botao}>Enviar</button>;
};
```

No HTML gerado, a classe não será `.botao`, mas algo como `.Contato_botao__f8k12` — ou seja, exclusiva daquele componente.

## Como usar no React

### 1. Nomeie seus arquivos como `[nome].module.css`

O sufixo `.module.css` é obrigatório para que o React (via Webpack/Vite/etc.) entenda que aquele CSS deve ser tratado como módulo.

Exemplo:

```
src/
  components/
    Card/
      Card.jsx
      Card.module.css
```

### 2. Importe o módulo no componente

```jsx
import classes from './Card.module.css';
```

### 3. Aplique a classe com `className={classes.nomeDaClasse}`

Nada de string direta. Sempre acesse via objeto:

```jsx
<div className={classes.card}>
  <h2 className={classes.titulo}>Título</h2>
</div>
```

## Vantagens do CSS Modules

✅ **Escopo local:** evita que estilos de um componente afetem outro.

✅ **Organização por componente:** estilos ficam junto do JSX.

✅ **Sem naming conventions complicadas:** não precisa inventar prefixos ou padrões manuais.

✅ **Compatível com TypeScript e outros preprocessadores (como SCSS).**

## Comparando com estilos globais

| Ponto               | CSS Global                   | CSS Modules              |
| ------------------- | ---------------------------- | ------------------------ |
| Escopo              | Global                       | Local por padrão         |
| Conflitos de classe | Comuns                       | Evitados automaticamente |
| Organização         | Separada (por pasta ou tema) | Junto do componente      |
| Reutilização        | Menor                        | Alta (modularidade)      |

## Dicas e boas práticas

* Use nomes descritivos e curtos (ex: `card`, `titulo`, `botaoPrimario`)
* Agrupe variações com `modificadores` (ex: `botao`, `botao--ativo`)
* Separe os arquivos `.module.css` na mesma pasta do componente
* Use variáveis CSS no `:root` para temas compartilhados
* Combine com outros estilos se precisar (ex: `classnames`)

### Exemplo com múltiplas classes

```jsx
<div className={`${classes.card} ${classes.destacado}`}>
  Destaque
</div>
```

Ou com `clsx` / `classnames`:

```jsx
import clsx from 'clsx';

<div className={clsx(classes.card, isAtivo && classes.ativo)} />
```

## É possível usar com SCSS?

Sim! É só usar arquivos `.module.scss` e ter o SCSS configurado no seu bundler. O uso é o mesmo, com suporte a nesting, variáveis e mixins.

## Quando não usar CSS Modules?

* Se estiver usando um sistema de design global (como Tailwind, Bootstrap ou styled-components)
* Em projetos onde os estilos são 100% dinâmicos por props
* Se quiser CSS-in-JS (ex: Emotion, styled-components)

Mas para apps React organizados por componente (como portfólios, blogs, sistemas internos), CSS Modules é uma das melhores escolhas possíveis.

## Conclusão

CSS Modules é uma solução elegante e poderosa para organizar seus estilos no React. Ele elimina conflitos, melhora a manutenção e mantém o código modular — tudo isso sem abandonar o CSS tradicional.

Se você quer manter seu projeto limpo, fácil de escalar e sem dores de cabeça com classes duplicadas, adotar CSS Modules é uma escolha segura e eficiente.

**Curtiu?** Adota esse padrão no seu projeto e sinta a diferença de trabalhar com estilos realmente organizados 🚀

---
