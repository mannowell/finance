# 💰 Gerenciador Financeiro

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite)](https://www.sqlite.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3)](https://www.w3.org/Style/CSS/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

Um aplicativo web para controle de finanças pessoais, com suporte a múltiplas moedas (EUR/BRL), projeções futuras e uma interface sofisticada com efeito glassmorphism.

> 🚀 **[Ver Demonstração Online](https://mannowell.github.io/Gerenciador_Finance/)**

---

## ✨ Funcionalidades

- **💸 Controle de Transações** — Adicione, edite e remova receitas e despesas com facilidade.
- **🌍 Múltiplas Moedas** — Acompanhe seu saldo em Euro (EUR) e Real (BRL) com taxa de câmbio em tempo real.
- **📈 Projeções Inteligentes** — Visualize suas receitas e despesas futuras para um planejamento financeiro eficaz.
- **🎨 Interface Premium** — Design moderno em Dark Mode com efeitos de vidro, animações suaves e total responsividade.
- **🔒 Privacidade & Velocidade** — Utiliza `localStorage` no navegador para persistência de dados. Extremamente rápido e seguro (os dados nunca saem da sua máquina).

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| **Frontend** | React 19, React Icons, Date-fns |
| **Backend** | Express.js |
| **Banco de Dados** | SQLite (via better-sqlite3) |
| **Estilo** | CSS3 Custom Properties, Glassmorphism, Flexbox/Grid |
| **API Externa** | ExchangeRate-API (taxas de câmbio em tempo real) |

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- npm ou yarn

---

## 🚀 Instalação e Execução

### 1. Clone o repositório:
```bash
git clone https://github.com/mannowell/Gerenciador_Finance.git
cd Gerenciador_Finance
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Inicie o servidor:
```bash
npm start
```
> O servidor abrirá em [http://localhost:3000](http://localhost:3000).

### 4. (Opcional) Desenvolvimento com hot-reload:
```bash
npm run client
```

### 5. Deploy para GitHub Pages:
```bash
npm run deploy
```

---

## 📁 Estrutura do Projeto

```
Gerenciador_Finance/
├── db/                 # Banco de dados SQLite
├── public/             # Ativos estáticos e manifestos
├── routes/             # Rotas da API Express
├── src/
│   ├── components/     # Componentes modulares do React
│   ├── Api.js          # Camada de abstração de dados (Local Storage API)
│   └── ...             # Demais arquivos do frontend
├── server.js           # Servidor Express
└── package.json
```

---

## 🔌 API Endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/transactions` | Lista todas as transações |
| `POST` | `/api/transactions` | Cria uma nova transação |
| `PUT` | `/api/transactions/:id` | Atualiza uma transação |
| `DELETE` | `/api/transactions/:id` | Remove uma transação |
| `GET` | `/api/balance` | Retorna o saldo atual |

> Consulte o arquivo `routes/` para ver todos os endpoints disponíveis.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um **fork** do projeto.
2. Crie uma **branch** para sua feature (`git checkout -b feature/minha-feature`).
3. Faça o **commit** das suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça o **push** para a branch (`git push origin feature/minha-feature`).
5. Abra um **Pull Request**.

---

## 👤 Autor

**Wellison Oliveira** — [mannowell](https://github.com/mannowell)

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).
