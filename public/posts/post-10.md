# Testando componentes com React Testing Library

Testar é parte essencial de um código de qualidade. Com o crescimento de aplicações React, garantir que seus componentes se comportem como o esperado evita bugs e dores de cabeça no futuro. É aí que entra o **React Testing Library (RTL)** — uma biblioteca focada em testes voltados para o comportamento do usuário, e não para a implementação.

Neste post, você vai aprender a configurar e usar a React Testing Library para testar seus componentes de forma eficaz e sem complicações.

## Por que usar a React Testing Library?

A proposta do RTL é diferente de outras ferramentas como Enzyme: em vez de testar a estrutura interna de componentes, ela simula interações reais do usuário (cliques, preenchimento de campos, etc.). Isso torna seus testes mais confiáveis e menos sensíveis a mudanças internas.

### Vantagens:

- Foco em comportamento, não em implementação
- APIs simples e intuitivas
- Integra bem com Jest (test runner)
- Incentiva testes que refletem uso real da aplicação

## Instalação

Se você usa Create React App (CRA), o RTL já vem incluído. Caso contrário:

```bash
npm install @testing-library/react @testing-library/jest-dom --save-dev
````

## Estrutura básica de um teste

```jsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza o título da página', () => {
  render(<App />);
  const titulo = screen.getByText(/bem-vindo/i);
  expect(titulo).toBeInTheDocument();
});
```

### O que acontece aqui?

* `render`: renderiza o componente em um ambiente de teste.
* `screen`: permite buscar elementos na tela como o usuário faria.
* `getByText`: busca um elemento com base em seu conteúdo de texto.
* `expect(...).toBeInTheDocument()`: verificação se o elemento está presente no DOM.

## Testando interações

Vamos supor que temos um botão que incrementa um contador:

```jsx
function Contador() {
  const [contagem, setContagem] = useState(0);
  return (
    <>
      <p>Contagem: {contagem}</p>
      <button onClick={() => setContagem(contagem + 1)}>Incrementar</button>
    </>
  );
}
```

O teste seria:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Contador from './Contador';

test('incrementa contador ao clicar', () => {
  render(<Contador />);
  const botao = screen.getByText('Incrementar');
  fireEvent.click(botao);
  const texto = screen.getByText(/contagem: 1/i);
  expect(texto).toBeInTheDocument();
});
```

## Consultas mais usadas

| Método                 | Uso                                                       |
| ---------------------- | --------------------------------------------------------- |
| `getByText`            | Busca por conteúdo de texto (case-insensitive com regex)  |
| `getByRole`            | Busca por papel acessível (`button`, `textbox`, etc.)     |
| `getByLabelText`       | Busca por `<label>` associado a inputs                    |
| `getByPlaceholderText` | Pelo placeholder do input                                 |
| `queryBy...`           | Igual aos anteriores, mas retorna `null` se não encontrar |
| `findBy...`            | Versão assíncrona (útil com `async/await`)                |

## Testando formulários

```jsx
test('envia o formulário corretamente', async () => {
  render(<Formulario />);
  
  fireEvent.change(screen.getByLabelText(/nome/i), {
    target: { value: 'Jailson' }
  });

  fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

  const mensagem = await screen.findByText(/mensagem enviada/i);
  expect(mensagem).toBeInTheDocument();
});
```

## Boas práticas

* Teste **comportamento**, não **implementação**
* Simule interações reais (cliques, digitação, foco)
* Evite testar lógica que já é da própria lib (ex: useState)
* Testes devem ser confiáveis, rápidos e fáceis de entender
* Use `describe` para agrupar testes e deixar o relatório organizado

## Testes e acessibilidade

O RTL incentiva práticas acessíveis, pois você acaba usando `getByRole`, `getByLabelText` e outras consultas baseadas em elementos que também ajudam usuários com leitores de tela.

Se seu componente for difícil de testar, ele provavelmente também é difícil de usar — os testes acabam servindo como uma forma de **feedback de usabilidade** também.

## Conclusão

A React Testing Library facilita o teste de componentes de forma intuitiva e próxima da realidade do usuário. Com ela, você evita testes frágeis, melhora a qualidade do código e ganha confiança para refatorar.

Se você ainda não escreve testes, comece com os componentes simples. Quando menos esperar, já vai estar testando fluxos completos de navegação e formulários.

**Curtiu?** Comece agora mesmo a escrever testes para aquele componente-chave do seu projeto e veja a diferença na manutenção e confiança do código 🚀

---
