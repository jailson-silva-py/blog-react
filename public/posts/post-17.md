# Gerando PDFs no front-end com React

Gerar PDFs diretamente do navegador pode parecer coisa de backend, mas hoje em dia, com as bibliotecas certas, é totalmente possível fazer isso no front-end — e com bastante controle sobre o layout e conteúdo.

Seja para gerar relatórios, faturas, certificados ou exportar dados visíveis na tela, neste post você vai aprender como **gerar arquivos PDF em projetos React** usando bibliotecas como `jsPDF` e `html2canvas`.

---

## Casos de uso comuns

- Relatórios administrativos
- Boletos ou recibos
- Certificados personalizados
- Exportar conteúdo visível (como tabelas)
- Currículos, propostas comerciais, contratos etc.

---

## As bibliotecas mais usadas

### ✅ `jsPDF`

Permite criar PDFs programaticamente com JavaScript puro.

```bash
npm install jspdf
````

### ✅ `html2canvas`

Captura um elemento HTML como imagem e permite usar no PDF.

```bash
npm install html2canvas
```

---

## Exemplo básico com jsPDF + html2canvas

```jsx
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const gerarPDF = () => {
  const input = document.getElementById('conteudo');

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('documento.pdf');
  });
};
```

E no JSX:

```jsx
<div id="conteudo">
  <h1>Relatório</h1>
  <p>Dados, gráficos e etc.</p>
</div>

<button onClick={gerarPDF}>Baixar PDF</button>
```

---

## Dicas para layout e qualidade

* Use fontes legíveis e margens consistentes
* Defina largura fixa no container (`max-width`)
* Evite usar `position: absolute` ou `fixed`
* Use classes CSS específicas para quando estiver no modo "PDF"

---

## Gerando PDFs de dados dinâmicos

Se você tem uma tabela ou lista gerada a partir de um JSON, você pode montar esse conteúdo e gerar o PDF com base na DOM.

```jsx
{dados.map((item) => (
  <div key={item.id}>
    <h2>{item.titulo}</h2>
    <p>{item.conteudo}</p>
  </div>
))}
```

Ao exportar com html2canvas, tudo será renderizado como imagem no PDF.

---

## Alternativas mais avançadas

* [`pdf-lib`](https://pdf-lib.js.org/) – manipula PDFs diretamente
* [`react-pdf`](https://react-pdf.org/) – gera PDFs a partir de componentes React
* [`puppeteer`](https://pptr.dev/) – gera PDFs no backend com Chrome headless (Node)

Mas pra maioria dos casos no front, `jsPDF + html2canvas` resolve 90% das situações.

---

## Exportando dados como tabela

```jsx
import 'jspdf-autotable';

pdf.autoTable({
  head: [['Nome', 'Idade', 'Cidade']],
  body: [
    ['Jailson', 25, 'Recife'],
    ['Maria', 30, 'São Paulo'],
  ],
});
```

---

## Boas práticas

✅ Use refs ou `id`s para capturar apenas o conteúdo necessário
✅ Permita o usuário revisar antes de exportar
✅ Evite imagens grandes ou SVGs complexos (pesa o PDF)
✅ Nomeie os arquivos com significado: `relatorio-2025-06.pdf`

---

## Conclusão

Gerar PDFs no front-end com React é mais fácil do que parece — e pode agregar muito valor ao seu projeto. Seja para relatórios, conteúdo visual ou exportações simples, com `jsPDF` e `html2canvas` você tem controle total da saída.

**Curtiu?** Testa no seu portfólio e dá a opção de exportar seus posts ou certificados. Impressiona e resolve de forma prática 🚀

---
