# 💰 Gerenciador Financeiro

Um aplicativo para controle de finanças pessoais, com suporte a múltiplas moedas (EUR/BRL), projeções futuras e uma interface sofisticada com efeito glassmorphism.

> **🚀 [Ver Demonstração Online](https://mannowell.github.io/Gerenciador_Finance/)**
>
> **Aplicativo Estático Moderno estruturado com React 19 e armazenamento seguro via `localStorage`.**

## ✨ Funcionalidades

- **Controle de Transações**: Adicione, edite e remova receitas e despesas com facilidade.
- **Múltiplas Moedas**: Acompanhe seu saldo em Euro (EUR) e Real (BRL) com taxa de câmbio em tempo real.
- **Projeções Inteligentes**: Visualize suas receitas e despesas futuras para um planejamento financeiro eficaz.
- **Interface Premium**: Design moderno em Dark Mode com efeitos de vidro, animações suaves e total responsividade.
- **Privacidade & Velocidade**: Utiliza `localStorage` no navegador para persistência de dados. Extremamente rápido e seguro (os dados nunca saem da sua máquina).

## 🚀 Tecnologias Utilizadas

- **React 19** (Frontend SPA)
- **Local Storage** (Persistência de dados offline)
- **CSS3** (Custom Properties, Glassmorphism, Flexbox/Grid)
- **React Icons** & **Date-fns**
- **ExchangeRate-API** (Taxas de câmbio em tempo real)

## 📦 Como Rodar Localmente

### Pré-requisitos
- Node.js instalado (v18+)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/mannowell/Gerenciador_Finance.git
cd Gerenciador_Finance
```

2. Instale as dependências:
```bash
npm install
```

### Execução

Para rodar o projeto localmente:

```bash
npm run client
```
*O dashboard abrirá em [http://localhost:3000](http://localhost:3000).*

## 🛠️ Estrutura do Projeto

- `/src/components`: Componentes modulares do React.
- `/src/Api.js`: Camada de abstração de dados (Local Storage API).
- `/public`: Ativos estáticos e manifestos.

---
Desenvolvido por [Manno](https://github.com/mannowell)

