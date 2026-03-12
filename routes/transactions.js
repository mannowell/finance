const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET all transactions
router.get('/', (req, res) => {
  try {
    const transactions = db.prepare('SELECT * FROM transactions ORDER BY date DESC').all();
    // Map 'id' to '_id' for frontend compatibility if needed, 
    // but better to fix frontend or just keep both.
    const mapped = transactions.map(t => ({ ...t, _id: t.id }));
    res.json(mapped);
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST new transaction
router.post('/', (req, res) => {
  try {
    const { type, category, description, amount, date } = req.body;
    const stmt = db.prepare('INSERT INTO transactions (type, category, description, amount, date) VALUES (?, ?, ?, ?, ?)');
    const info = stmt.run(type, category, description, amount, date);
    
    const newTransaction = {
      id: info.lastInsertRowid,
      _id: info.lastInsertRowid,
      type,
      category,
      description,
      amount,
      date
    };
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Erro ao salvar transação:', error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE transaction
router.delete('/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM transactions WHERE id = ?');
    const info = stmt.run(req.params.id);
    
    if (info.changes === 0) return res.status(404).json({ message: 'Transação não encontrada' });
    res.json({ message: 'Transação deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE transaction
router.put('/:id', (req, res) => {
  try {
    const { type, category, description, amount, date } = req.body;
    const stmt = db.prepare('UPDATE transactions SET type = ?, category = ?, description = ?, amount = ?, date = ? WHERE id = ?');
    const info = stmt.run(type, category, description, amount, date, req.params.id);
    
    if (info.changes === 0) return res.status(404).json({ message: 'Transação não encontrada' });
    
    res.json({ id: req.params.id, _id: req.params.id, ...req.body });
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
