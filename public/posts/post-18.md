# Criando animações suaves com framer-motion no React

A experiência do usuário vai muito além de componentes funcionais e dados bem renderizados. O que realmente diferencia uma interface moderna é a **fluidez na interação** — e é aí que as animações entram. No React, uma das bibliotecas mais populares e poderosas para criar animações é o **framer-motion**.

Se você já tentou animar elementos com `CSS transitions`, sabe que as opções são limitadas. Já com framer-motion, você ganha um controle refinado sobre estados, gestos, transições e até mesmo **layout shared animations**, tudo com sintaxe intuitiva e integrada ao React.

Neste post, você vai aprender como usar o **framer-motion** para criar animações suaves, interativas e modernas no seu projeto React. Vamos abordar desde o básico até algumas técnicas mais avançadas que você pode aplicar direto no seu portfólio ou projeto real.

---

## Por que usar framer-motion?

Antes de mais nada, por que usar framer-motion em vez de CSS puro ou outras libs?

- ✅ Integração direta com componentes React
- ✅ Animações baseadas em estado (`animate`, `exit`, `whileHover`, etc.)
- ✅ Suporte a gestos (drag, tap, hover)
- ✅ Transições complexas e encadeadas com facilidade
- ✅ Layout animations (anima elementos ao mudar o DOM)

Com isso, você pode animar entradas, saídas, mudanças de estado e interações do usuário sem escrever uma linha de CSS extra.

---

## Instalação

Pra começar:

```bash
npm install framer-motion
````

Ou com yarn:

```bash
yarn add framer-motion
```

---

## Começando com animações simples

O componente base do framer-motion é o `motion`. Você substitui elementos HTML por suas versões animadas:

```jsx
import { motion } from 'framer-motion';

const MeuComponente = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Bem-vindo!</h1>
    </motion.div>
  );
};
```

### O que está acontecendo aqui?

* `initial`: estado inicial da animação (ao montar)
* `animate`: estado final
* `transition`: define duração, delay, tipo de easing

Essa estrutura te dá controle total sobre como o elemento entra na tela.

---

## Animações em hover, tap e foco

Com framer-motion, você pode adicionar animações interativas direto no componente:

```jsx
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  Clique aqui
</motion.button>
```

Essas props são poderosas para tornar botões, cards e links mais responsivos e “vivos”.

---

## Exit animations (animação de saída)

Com `AnimatePresence`, você pode animar elementos ao serem removidos do DOM:

```jsx
import { AnimatePresence, motion } from 'framer-motion';

const Lista = ({ itens }) => {
  return (
    <AnimatePresence>
      {itens.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          {item.nome}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};
```

Isso é essencial para listas, modais, menus e qualquer elemento que entra/saia da tela.

---

## Delay e chaining de animações

Você pode encadear animações com delay e tempo:

```jsx
<motion.div
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 0.3, duration: 0.5 }}
>
  Slide com delay
</motion.div>
```

---

## Variants: o segredo para organização

Quando as animações começam a se repetir ou ficam mais complexas, é melhor definir os estados como `variants`:

```jsx
const boxVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

<motion.div
  variants={boxVariants}
  initial="hidden"
  animate="visible"
  transition={{ duration: 0.5 }}
>
  Box animado
</motion.div>
```

Você pode passar esses variants para múltiplos elementos e controlar tudo de forma consistente.

---

## Layout animations (mudança de posição suave)

O framer-motion detecta mudanças no layout e anima automaticamente:

```jsx
<motion.div layout>
  <p>Esse elemento será animado ao mudar de lugar.</p>
</motion.div>
```

Perfeito para grids, listas reordenáveis ou qualquer elemento que se mova dinamicamente.

---

## Drag and drop (arraste com animação)

Sim, framer-motion também faz isso:

```jsx
<motion.div drag dragConstraints={{ left: 0, right: 300 }}>
  Arraste aqui
</motion.div>
```

Você pode restringir áreas, adicionar `snap`, transições suaves no soltar, e até combinar com `onDragEnd`.

---

## Dicas práticas

* Use `AnimatePresence` sempre que remover algo do DOM
* Variants ajudam muito na legibilidade
* Combine `whileHover` e `whileTap` com transições sutis
* Prefira `layout` ao usar elementos que se movem com estado
* Controle gestos com `drag`, `hover`, `tap`, `focus`

---

## Quando usar (ou não usar) framer-motion

**Use framer-motion quando:**

* Você quer animações suaves e reativas
* Precisa animar entradas/saídas
* Deseja criar interações com gestos
* Quer prototipar experiências visuais avançadas

**Evite se:**

* A performance for crítica (animações pesadas em listas gigantes)
* O projeto for muito simples e não exige animações
* Seu time não tem experiência com React

---

## Conclusão

Framer-motion é, sem dúvida, uma das bibliotecas mais poderosas e elegantes para animações no React. Ele te permite transformar uma interface estática em uma experiência fluida, viva e envolvente — e tudo isso com uma API declarativa e fácil de usar.

Se você quer deixar seu portfólio mais moderno ou criar interfaces que impressionam, **comece com animações simples e evolua para transições complexas, gestos e movimentos de layout**.

**Curtiu?** Instala o framer-motion no seu projeto agora mesmo e começa a animar aquele botão, aquele modal ou aquele card.
Seu usuário (e seu projeto) agradecem ✨🚀

---

