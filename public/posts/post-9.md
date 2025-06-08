# Performance em React: dicas para apps mais rápidos

Um dos maiores desafios ao desenvolver aplicações modernas é manter a performance sob controle à medida que a complexidade cresce. Em React, embora a reatividade e o DOM virtual ajudem bastante, ainda é responsabilidade do desenvolvedor garantir que a aplicação seja leve, rápida e fluida.

Neste post, você vai conhecer **dicas práticas para melhorar a performance de projetos React**, identificar gargalos e aplicar soluções reais no seu código.

## 1. Cuidado com re-renderizações desnecessárias

Toda vez que um componente React atualiza seu estado ou recebe novas props, ele re-renderiza. Às vezes isso é esperado, mas em outras é desperdício de processamento.

### Como evitar:

- **Evite recriar funções inline** se elas não precisam mudar.
- Use `React.memo` para memorizar componentes puros.
- Use `useCallback` para memorizar funções que são passadas para filhos.
- Use `useMemo` para cálculos pesados que não precisam rodar em toda renderização.

```jsx
const somaPesada = useMemo(() => {
  return calcularCoisaPesada(a, b);
}, [a, b]);

const handleClick = useCallback(() => {
  enviarDados();
}, []);
````

## 2. Divida o código com lazy loading

Nem tudo precisa ser carregado na primeira visita. Você pode dividir o bundle usando `React.lazy` e `Suspense`:

```jsx
import { lazy, Suspense } from 'react';

const PaginaContato = lazy(() => import('./pages/Contato'));

function App() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <PaginaContato />
    </Suspense>
  );
}
```

Ideal para rotas, componentes de baixo uso e painéis administrativos.

## 3. Otimize listas com `key` e `memo`

Evite re-renderizações em listas grandes utilizando `key` únicas e `React.memo` para os itens.

```jsx
{posts.map((post) => (
  <PostItem key={post.id} post={post} />
))}

// e no PostItem:
export default React.memo(PostItem);
```

Evite usar `index` como key — isso atrapalha o controle do DOM virtual em atualizações.

## 4. Reduza renderizações com `shouldComponentUpdate` ou `memo`

No React moderno, você pode usar `React.memo()` com `props` simples ou até passar uma função de comparação personalizada:

```jsx
React.memo(Componente, (prevProps, nextProps) => {
  return prevProps.valor === nextProps.valor;
});
```

Use em componentes que recebem dados estáticos ou mudam pouco.

## 5. Cuidado com imagens e mídia

* Sempre otimize imagens (formato, tamanho, compressão).
* Use `loading="lazy"` em imagens fora da tela inicial.
* Evite carregar vídeos grandes logo no início.
* Use WebP ou AVIF quando possível.

```jsx
<img src="/img/foto.webp" loading="lazy" alt="Minha foto" />
```

## 6. Virtualização de listas grandes

Para listas extensas, como feeds, use bibliotecas como:

* `react-window`
* `react-virtualized`

Elas renderizam apenas os elementos visíveis na tela, economizando memória e tempo de render.

## 7. Use o DevTools do React para identificar gargalos

O React Developer Tools possui um modo de **profiler**. Com ele, você pode gravar sessões de uso da interface e descobrir:

* Quais componentes renderizam mais do que deveriam
* Quais funções estão sendo recriadas
* Onde estão os maiores custos de renderização

## 8. Cuide do carregamento inicial

* Minimize dependências externas
* Use CDN quando for possível
* Comprima arquivos estáticos (JS, CSS, imagens)
* Ative cache de build e service workers (PWA)

## 9. Use estados locais de forma eficiente

Evite colocar tudo no estado global (ex: Context ou Redux). Quanto mais descentralizado o estado, menos re-renderizações globais você tem.

Prefira:

* `useState` para estados locais
* `useReducer` para lógicas mais complexas dentro de componentes
* `Context` apenas quando vários níveis precisam acessar

## 10. Monitore o que está acontecendo

Use ferramentas de monitoramento como:

* Google Lighthouse
* Web Vitals (React 18)
* Sentry (monitoramento de erros e performance)

Essas ferramentas ajudam a identificar gargalos reais do usuário final — não apenas na sua máquina de dev.

## Conclusão

Performance não é sobre prematuros micro-otimizadores — é sobre boas práticas conscientes. Usar `memo`, dividir código, evitar re-renderizações desnecessárias e carregar o que é essencial no momento certo são atitudes que melhoram diretamente a experiência do usuário.

Com as dicas acima, você já tem um arsenal sólido para manter seus apps React rápidos, leves e escaláveis. E o melhor: com mudanças simples no código que você já escreve.

**Curtiu?** Salva esse post e aplica essas dicas no seu projeto agora mesmo. A galera (e o navegador) agradece 🚀

---