# Dark Mode com CSS e React

Ativar o modo escuro virou praticamente um padrão em aplicações modernas. Além de oferecer uma alternativa visual mais confortável, especialmente à noite, o dark mode também pode ser um diferencial estético no seu projeto.

Neste post, você vai aprender como implementar o **Dark Mode no React** usando CSS e lógica simples de estado, sem necessidade de bibliotecas externas.

---

## Por que implementar o Dark Mode?

- Melhora a experiência em ambientes com pouca luz
- Economiza bateria em dispositivos com tela OLED
- Demonstra cuidado com acessibilidade e personalização
- É visualmente mais atrativo para muitos usuários

---

## Estratégias comuns

As formas mais populares de implementar Dark Mode no React são:

1. Com `useState` e classes CSS
2. Usando CSS custom properties (`:root`)
3. Detectando preferências do sistema com `prefers-color-scheme`
4. Persistindo o tema no `localStorage`

Vamos montar uma implementação combinando todas essas ideias.

---

## 1. Criando o hook `useDarkMode`

```jsx
import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [dark, setDark] = useState(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) return localTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return [dark, setDark];
};

export default useDarkMode;
````

---

## 2. Aplicando o tema no componente

```jsx
import useDarkMode from './useDarkMode';

const ToggleTheme = () => {
  const [dark, setDark] = useDarkMode();

  return (
    <button onClick={() => setDark((prev) => !prev)}>
      {dark ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
    </button>
  );
};
```

---

## 3. Estilizando com CSS

Crie regras CSS com base em uma classe global `.dark` no `<html>` ou `<body>`:

```css
/* index.css */
:root {
  --bg: #ffffff;
  --text: #111111;
}

.dark {
  --bg: #111111;
  --text: #ffffff;
}

body {
  background-color: var(--bg);
  color: var(--text);
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

Isso permite que todos os seus componentes usem `var(--bg)` e `var(--text)` em seus estilos, sem precisar duplicar regras para cada tema.

---

## 4. Usando no app inteiro

Garanta que a classe `dark` esteja na raiz da aplicação. Você pode aplicar no `index.html` diretamente ou manipular o `document.documentElement` como fizemos no hook.

---

## Extra: detectando o tema do sistema

Você pode escutar mudanças no sistema com `matchMedia`:

```js
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const prefersDark = e.matches;
  setDark(prefersDark);
});
```

Ideal se quiser que a UI reaja automaticamente às preferências do SO do usuário.

---

## Boas práticas

✅ Use CSS variables para facilitar o tema
✅ Salve no localStorage para manter a preferência
✅ Evite alternar `className` em todos os componentes — altere a raiz
✅ Dê feedback visual no botão de toggle
✅ Aplique transições suaves para melhor experiência

---

## Conclusão

Com algumas linhas de CSS e um simples hook em React, você consegue oferecer uma experiência de Dark Mode totalmente funcional, responsiva e elegante. Melhor ainda: sem precisar de bibliotecas externas ou soluções pesadas.

Se você quer impressionar com pequenos detalhes e dar mais controle ao usuário, o Dark Mode é uma das primeiras coisas que pode (e deve) implementar no seu projeto.

**Curtiu?** Adiciona esse recurso no seu portfólio e já mostra que você se importa com experiência, design e acessibilidade 🔥

---

