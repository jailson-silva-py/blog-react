# Criando formulários acessíveis em React

A acessibilidade (ou **a11y**) é um dos pilares do desenvolvimento front-end moderno. Um formulário pode parecer funcional à primeira vista, mas se não for acessível, ele limita o acesso de usuários com deficiências — o que impacta diretamente na inclusão e usabilidade do seu site ou app.

Neste post, você vai aprender como criar **formulários acessíveis com React**, usando boas práticas e recursos nativos do HTML e do JSX.

---

## Por que se preocupar com acessibilidade?

- Inclui usuários com limitações visuais, motoras ou cognitivas
- Melhora a usabilidade para todos (inclusive em mobile)
- É essencial em projetos públicos e corporativos (exigido por lei)
- Garante que leitores de tela, teclados e tecnologias assistivas funcionem corretamente

---

## 1. Sempre use `<label>` corretamente

Todo `input`, `textarea` ou `select` deve ter um `<label>` associado a ele.

```jsx
<label htmlFor="nome">Nome:</label>
<input id="nome" type="text" />
````

### Ou com o input dentro do label:

```jsx
<label>
  Nome:
  <input type="text" />
</label>
```

🔍 **Nunca esqueça o `htmlFor` (equivalente ao `for` do HTML).** Ele associa o rótulo ao campo, permitindo que leitores de tela anunciem corretamente e que o clique no texto selecione o campo.

---

## 2. Use atributos `aria-*` com moderação (mas com propósito)

Os atributos `aria` são úteis para dar mais contexto sem precisar alterar a estrutura do HTML.

```jsx
<input
  type="text"
  aria-label="Número do CPF"
  placeholder="000.000.000-00"
/>
```

Use `aria-label` ou `aria-labelledby` quando não for possível usar um `<label>` visível.

---

## 3. Evite placeholders como único identificador

O placeholder **não substitui** o label. Ele desaparece ao digitar, o que pode confundir usuários com problemas de memória ou foco.

✅ Use ambos:

```jsx
<label htmlFor="email">E-mail:</label>
<input id="email" type="email" placeholder="exemplo@dominio.com" />
```

---

## 4. Adicione mensagens de erro claras

Evite mensagens genéricas como "Erro no formulário". Mostre **o que deu errado e onde**:

```jsx
{erro && (
  <span id="erroEmail" role="alert">
    O e-mail digitado não é válido.
  </span>
)}

<input
  type="email"
  aria-describedby="erroEmail"
  aria-invalid={erro ? 'true' : 'false'}
/>
```

Usar `role="alert"` garante que leitores de tela anunciem imediatamente o erro.

---

## 5. Permita navegação com teclado

Todos os campos devem ser acessíveis via `Tab`. Isso acontece automaticamente se você usar elementos HTML nativos (`input`, `button`, `textarea`, etc.).

Evite elementos customizados sem `tabIndex` ou que dependem apenas de mouse/click.

---

## 6. Agrupe campos com `fieldset` e `legend`

Para grupos de opções relacionadas (ex: tipo de conta, gênero), use:

```jsx
<fieldset>
  <legend>Tipo de Conta</legend>
  <label>
    <input type="radio" name="tipo" value="pf" />
    Pessoa Física
  </label>
  <label>
    <input type="radio" name="tipo" value="pj" />
    Pessoa Jurídica
  </label>
</fieldset>
```

Isso informa ao leitor de tela que os campos estão dentro de um grupo com contexto.

---

## 7. Botões e feedback visuais

* Sempre use `<button>` ao invés de `<div>` com `onClick`
* Dê feedback visual (loading, sucesso, erro)
* Utilize foco visível (`:focus`) nos campos ativos

```css
input:focus {
  outline: 2px solid #007bff;
}
```

---

## 8. Dê foco automático com cuidado

Evite usar `autoFocus` sem critério — ele pode atrapalhar usuários com leitores de tela. Use apenas se for muito necessário, e nunca em modais inesperados.

---

## 9. Teste com teclado e leitores de tela

* Navegue só com Tab/Enter
* Use `VoiceOver` (Mac), `NVDA` (Windows) ou `TalkBack` (Android)
* Veja se os rótulos e mensagens são lidos corretamente

---

## Conclusão

Criar formulários acessíveis em React não exige nada de extraordinário — na verdade, exige **respeitar os padrões da web**. Labels, mensagens claras, foco visível e elementos semânticos fazem toda a diferença para a inclusão digital.

Quanto mais seu projeto cresce, mais importante isso se torna. Lembre-se: um site acessível **funciona melhor para todos**.

**Curtiu?** Salva esse post como referência e deixa seus formulários prontos pra todos os públicos 🧑‍🦯🧠🧑‍🦽

---