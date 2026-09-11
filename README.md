<div align="center">

# Microsoft — Home Concept

### Uma releitura institucional conceitual, criada para explorar design, tecnologia e experiências digitais de alto nível.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-000000?style=for-the-badge\&logo=nextdotjs\&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge\&logo=react\&logoColor=000000)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)

</div>

> [!IMPORTANT]
> Este é um projeto conceitual e independente, desenvolvido exclusivamente para estudo e portfólio. Não possui vínculo, patrocínio, autorização ou aprovação da Microsoft.

---

## Sobre o projeto

O **Microsoft Home Concept** é uma experiência institucional desenvolvida para reinterpretar digitalmente a presença da Microsoft.

O objetivo foi construir uma página com direção de arte própria, narrativa visual consistente e interações funcionais, fugindo da aparência genérica encontrada em muitos projetos institucionais.

O conceito central, chamado **“O campo de possibilidades”**, representa visualmente como uma única ação pode se expandir e gerar impacto em grande escala.

---

## Conceito visual

A experiência utiliza uma malha dinâmica como elemento estrutural recorrente. No hero, uma célula é ativada e sua energia se propaga gradualmente por todo o campo.

A direção de arte combina:

* Superfícies claras e escuras alternadas;
* Estruturas delimitadas por filetes de `1px`;
* Tipografia de grande escala;
* Movimento funcional e controlado;
* Uso estratégico das cores associadas ao ecossistema Microsoft;
* Composições diferentes para cada seção;
* Elementos interativos sem excesso de efeitos;
* Linguagem visual inspirada nos princípios do Fluent 2.

As cores não são utilizadas como decoração aleatória. Cada uma atua como sinalização visual para categorias, produtos e áreas do ecossistema.

---

## Experiência da página

A narrativa foi organizada para conduzir o visitante por diferentes dimensões da empresa:

1. **Hero** — apresenta o conceito de escala e possibilidades;
2. **Missão** — estabelece a ideia central da experiência;
3. **Ecossistema** — organiza diferentes produtos e frentes de atuação;
4. **Copilot e IA** — demonstra como a inteligência artificial atua como assistência;
5. **Nuvem** — apresenta as diferentes camadas da infraestrutura;
6. **Pessoas** — conecta tecnologia, impacto e perspectivas humanas;
7. **Confiança** — reúne compromissos relacionados à segurança e responsabilidade;
8. **Encerramento** — retoma a mensagem inicial e conclui a narrativa.

Cada seção possui uma composição própria para evitar repetição visual durante a navegação.

---

## Destaques técnicos

* App Router e Server Components do Next.js;
* Hero renderizado como Server Component;
* Campo visual animado utilizando Canvas;
* Canvas limitado a 40 FPS e executado somente quando visível;
* Renderização incremental das células do campo;
* Componentes interativos com JavaScript reduzido;
* Sistema centralizado de observação das animações de entrada;
* Conteúdo do ecossistema presente no HTML e indexável;
* Imagem Open Graph gerada com `next/og`;
* Tipografia local otimizada;
* Respeito completo a `prefers-reduced-motion`;
* Layout responsivo desenvolvido especificamente para cada faixa de tela;
* Navegação acessível por teclado;
* Estados de foco visíveis;
* Menu móvel com gerenciamento e restauração de foco.

---

## Qualidade e validação

O projeto foi revisado em diferentes navegadores, resoluções e condições de desempenho.

| Verificação                 |                  Resultado |
| --------------------------- | -------------------------: |
| Testes automatizados        |        **72/72 aprovados** |
| Navegadores                 | Chromium, Firefox e WebKit |
| TypeScript                  |                **0 erros** |
| ESLint                      |            **0 problemas** |
| Build de produção           |               **Aprovado** |
| Lighthouse — Performance    |                     **91** |
| Lighthouse — Acessibilidade |                    **100** |
| Lighthouse — Boas práticas  |                    **100** |
| Lighthouse — SEO            |                    **100** |

### Métricas diretas em ambiente limitado

| Métrica |  Mobile | Desktop |
| ------- | ------: | ------: |
| LCP/FCP | 1176 ms | 1240 ms |
| TBT     |  182 ms |  212 ms |
| CLS     |   0,010 |  0,0003 |

> Os resultados de performance podem variar conforme hardware, rede, carga do sistema e método de simulação utilizado.

---

## Responsividade

A interface foi inspecionada nas seguintes larguras:

```text
320px · 375px · 390px · 768px · 1024px · 1440px · 1920px
```

O mobile não é apenas uma redução do desktop. Elementos, proporções, alturas e comportamentos foram adaptados para preservar impacto visual, legibilidade e facilidade de navegação.

---

## Tecnologias

| Tecnologia     | Aplicação                              |
| -------------- | -------------------------------------- |
| Next.js 16     | Arquitetura e renderização             |
| React 19       | Construção da interface                |
| TypeScript     | Tipagem e segurança                    |
| Tailwind CSS 4 | Sistema visual e responsividade        |
| Canvas API     | Campo animado do hero                  |
| Playwright     | Testes funcionais e multibrowser       |
| axe-core       | Testes automatizados de acessibilidade |
| Lighthouse     | Auditoria de qualidade e performance   |
| next/og        | Geração da imagem Open Graph           |

---

## Executando localmente

Clone o repositório:

```bash
git clone https://github.com/joaopedrosgdevv/microsoft-home-concept.git
```

Entre na pasta:

```bash
cd microsoft-home-concept
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

---

## Comandos disponíveis

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm test
```

---

## Estrutura principal

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── not-found.tsx
├── components/
│   ├── layout/
│   ├── sections/
│   └── ui/
└── lib/
    ├── content.ts
    └── signal.ts

tests/
├── home.spec.ts
└── a11y.spec.ts
```

---

## Autor

Desenvolvido por **João Pedro**.

* [Portfólio](https://joaopedrosgdev.com)
* [LinkedIn](https://www.linkedin.com/in/joao-pedro-de-souza-gomes/)
* [Instagram](https://www.instagram.com/joao.pedrodev/)
* [GitHub](https://github.com/joaopedrosgdevv)
* [Site publicado](https://microsoft-home-concept.vercel.app)

---

## Aviso legal

Microsoft e os nomes de seus produtos são marcas da Microsoft Corporation.

Nenhum logotipo oficial protegido foi reproduzido neste projeto. Toda a interface foi criada de maneira independente, com finalidade educacional, experimental e demonstrativa.

<div align="center">

**Projeto conceitual desenvolvido para demonstrar design de interfaces, engenharia front-end e atenção aos detalhes.**

</div>
