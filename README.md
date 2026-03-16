# 💰 Gerenciador Financeiro

Um aplicativo moderno e robusto para controle de finanças pessoais, com suporte a múltiplas moedas (EUR/BRL), projeções futuras e uma interface sofisticada com efeito glassmorphism.

![Preview](public/logo512.png) 

## ✨ Funcionalidades

- **Controle de Transações**: Adicione, edite e remova receitas e despesas com facilidade.
- **Múltiplas Moedas**: Acompanhe seu saldo em Euro (EUR) e Real (BRL) com taxa de câmbio em tempo real.
- **Projeções Inteligentes**: Visualize suas receitas e despesas futuras para um planejamento financeiro eficaz.
- **Interface Premium**: Design moderno em Dark Mode com efeitos de vidro, animações suaves e total responsividade.
- **Banco de Dados Local**: Utiliza SQLite para máxima performance e funcionamento offline, sem necessidade de configurações complexas de nuvem.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19**
- **CSS3** (Custom Properties, Glassmorphism, Flexbox/Grid)
- **React Icons**
- **Date-fns**

### Backend
- **Node.js & Express**
- **SQLite** (via `better-sqlite3`)
- **CORS & Dotenv**

## 📦 Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado (v18+)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/mannowell/finance.git
cd finance
```

2. Instale as dependências:
```bash
npm install
```

### Execução

Para rodar o projeto, você precisará de dois terminais abertos:

**Terminal 1 (Backend):**
```bash
npm start
```
*O servidor rodará na porta 5001.*

**Terminal 2 (Frontend):**
```bash
npm run client
```
*O dashboard abrirá em [http://localhost:3000](http://localhost:3000).*

## 🛠️ Estrutura do Projeto

- `/src/components`: Componentes modulares do React.
- `/routes`: Handlers da API Express.
- `/db`: Inicialização e conexão com o banco de dados SQLite.
- `database.sqlite`: Arquivo de banco de dados gerado automaticamente.

---
Desenvolvido por [Manno](https://github.com/mannowell)
