# Organizando componentes por domínio no React

À medida que um projeto React cresce, a estrutura de pastas começa a fazer toda a diferença. Se tudo for jogado em uma única pasta `components/`, a manutenção vira um pesadelo.

Uma abordagem moderna e escalável para organizar seu projeto é usar a **estrutura por domínio** (também chamada de "feature-based" ou "modular").

Neste post, você vai entender o que é essa organização, como aplicá-la no React e por que ela facilita muito na escalabilidade.

---

## O problema das estruturas genéricas

A estrutura clássica costuma ser assim:

```

src/
components/
Header.jsx
Footer.jsx
Form.jsx
pages/
Home.jsx
Contato.jsx
utils/
App.jsx

```

Funciona para projetos pequenos, mas logo os arquivos se misturam:

- Você tem 20 componentes diferentes numa pasta só
- Tem que ficar adivinhando onde está a lógica do formulário de login
- Começa a duplicar lógica e estilo por falta de contexto

---

## A ideia por trás da estrutura por domínio

Ao invés de organizar por tipo de arquivo, organizamos por **funcionalidade ou área do sistema**.

Por exemplo:

```

src/
features/
auth/
LoginForm.jsx
authService.js
authSlice.js
auth.module.css
user/
Profile.jsx
userService.js
user.module.css
shared/
Button/
Button.jsx
Button.module.css
App.jsx

```

Cada “feature” tem tudo que precisa para funcionar: componente, estilo, lógica, hook, etc. Isso torna o código **modular, isolado e reutilizável**.

---

## Benefícios da estrutura por domínio

✅ Escalável — não explode em uma pasta única  
✅ Fácil de remover ou mover features  
✅ Ótima para times (cada dev cuida do seu domínio)  
✅ Baixo acoplamento entre áreas do sistema  
✅ Melhor separação de responsabilidades  

---

## Como começar no seu projeto

1. Crie uma pasta `features/` ou `domains/`
2. Dentro dela, separe suas funcionalidades por nome (`auth/`, `posts/`, `contato/`)
3. Para componentes genéricos, crie uma pasta `shared/` ou `ui/`
4. Estilos e lógica ficam **dentro da própria feature**

Exemplo com React + CSS Modules:

```

src/
features/
contato/
FormularioContato.jsx
useFormularioContato.js
contato.module.css

```

---

## Onde entram os hooks?

Você pode seguir a mesma lógica:

```

src/
features/
blog/
PostList.jsx
usePosts.js

```

Ou, se forem reutilizáveis entre domínios:

```

src/
hooks/
useLocalStorage.js
useDarkMode.js

```

---

## Componentes “shared” vs. específicos

- `shared/` → botões, inputs, modais, cards genéricos
- `features/` → componentes específicos de um domínio, como `LoginForm`, `PostEditor`, etc.

---

## Exemplo de estrutura completa

```

src/
features/
blog/
PostList.jsx
PostItem.jsx
blog.module.css
postService.js
auth/
LoginForm.jsx
authSlice.js
auth.module.css
shared/
Button/
Button.jsx
Button.module.css
Input/
Input.jsx
hooks/
useFetch.js
App.jsx

```

---

## Essa estrutura vale pra projetos pequenos?

Sim! Mesmo que o projeto seja pequeno agora, **pensar modularmente desde o início** facilita muito quando ele crescer.  
Não precisa exagerar: comece organizando por páginas ou funcionalidades principais.

---

## Conclusão

Organizar componentes por domínio é uma forma poderosa de manter seu projeto React limpo, modular e pronto para crescer.  
Você evita bagunça, separa bem responsabilidades e torna o código muito mais legível — tanto pra você quanto pra quem chegar no time.

**Curtiu?** Refatora seu projeto atual seguindo esse padrão e sinta a diferença na hora de encontrar, manter e escalar funcionalidades 🚀

---