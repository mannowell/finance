// server.js - Back-End Inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Verificar variáveis de ambiente
console.log('Verificando configurações:');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Definida' : 'Não definida');
console.log('PORT:', process.env.PORT || 5000);

// Middleware
app.use(cors());
app.use(express.json());

// Modelo para transações
const transactionSchema = new mongoose.Schema({
  type: String, // 'income' ou 'expense'
  category: String,
    description: String,
    amount: Number,
  date: Date
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Conexão com o MongoDB
console.log('Tentando conectar ao MongoDB...');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado ao MongoDB com sucesso!');
  console.log('Database:', mongoose.connection.name);
  console.log('Host:', mongoose.connection.host);
  
  // Só inicia o servidor após conectar ao banco
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
})
.catch((err) => {
  console.error('Erro detalhado ao conectar ao MongoDB:', err);
  console.error('Stack de erro:', err.stack);
  process.exit(1);
});

// Handlers de conexão
mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB desconectado');
});

// Rotas da API
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    console.log('Dados recebidos:', req.body);
    const transaction = new Transaction(req.body);
    const savedTransaction = await transaction.save();
    console.log('Transação salva:', savedTransaction);
    res.json(savedTransaction);
  } catch (error) {
    console.error('Erro ao salvar transação:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/transactions/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transação deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/transactions/:id', async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log('Transação atualizada:', updatedTransaction);
    res.json(updatedTransaction);
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    res.status(500).json({ error: error.message });
  }
});

// Handler de erros não tratados
process.on('unhandledRejection', (err) => {
  console.error('Erro não tratado:', err);
});
