const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const transactionRoutes = require('./routes/transactions');
app.use('/api/transactions', transactionRoutes);

// Health check
app.get('/health', (req, res) => res.send('OK'));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT} com SQLite`);
  console.log('✅ Banco de dados local pronto.');
});

// Error Handlers
process.on('unhandledRejection', (err) => {
  console.error('🔴 Erro não tratado:', err);
});
