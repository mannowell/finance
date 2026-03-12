import React, { useState, useEffect, useCallback } from 'react';
import { api } from './Api';
import DashboardHeader from './components/DashboardHeader';
import SidePanels from './components/SidePanels';
import TransactionForm from './components/TransactionForm';
import TransactionHistory from './components/TransactionHistory';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    description: '',
    amount: '',
    date: new Date().toISOString().substr(0, 10)
  });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState('');
  const [errorTimeout, setErrorTimeout] = useState(null);
  const [, setTimeUpdate] = useState(0);

  const showError = useCallback((message) => {
    setError(message);
    if (errorTimeout) clearTimeout(errorTimeout);
    const timeout = setTimeout(() => setError(''), 5000);
    setErrorTimeout(timeout);
  }, [errorTimeout]);

  const loadTransactions = useCallback(async () => {
    try {
      const data = await api.getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
      showError('Não foi possível carregar as transações');
    }
  }, [showError]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  useEffect(() => {
    async function fetchExchangeRate() {
      const rate = await api.getExchangeRate();
      setExchangeRate(rate);
    }
    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 3600000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTimeUpdate(prev => prev + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      type: transaction.type,
      category: transaction.category,
      description: transaction.description,
      amount: transaction.amount.toString(),
      date: new Date(transaction.date).toISOString().substr(0, 10)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transactionData = { ...formData, amount: Number(formData.amount) };
      if (editingTransaction) {
        await api.updateTransaction(editingTransaction._id, transactionData);
      } else {
        await api.addTransaction(transactionData);
      }
      setFormData({
        type: 'expense',
        category: '',
        description: '',
        amount: '',
        date: new Date().toISOString().substr(0, 10)
      });
      setEditingTransaction(null);
      await loadTransactions();
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
      showError('Erro ao salvar transação: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteTransaction(id);
      await loadTransactions();
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
      showError('Não foi possível deletar a transação');
    }
  };

  const calculateBalances = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return transactions.reduce((acc, transaction) => {
      const transactionDate = new Date(transaction.date);
      transactionDate.setHours(0, 0, 0, 0);
      const amount = transaction.amount;
      
      if (transactionDate <= today) {
        return {
          ...acc,
          currentBalance: acc.currentBalance + (transaction.type === 'income' ? amount : -amount)
        };
      } else {
        if (transaction.type === 'income') {
          acc.futureProfits += amount;
        } else {
          acc.futureExpenses += amount;
        }
        return acc;
      }
    }, { currentBalance: 0, futureProfits: 0, futureExpenses: 0 });
  };

  const { currentBalance, futureProfits, futureExpenses } = calculateBalances();
  const totalProjectedBalance = currentBalance + futureProfits - futureExpenses;

  const formatCurrency = (value) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
  const formatBRL = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const isTransactionFuture = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const transactionDate = new Date(date);
    transactionDate.setHours(0, 0, 0, 0);
    return transactionDate > today;
  };

  const groupTransactionsByDate = (transactions) => {
    const grouped = {};
    const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    sorted.forEach(t => {
      const date = new Date(t.date).toISOString().split('T')[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(t);
    });
    return grouped;
  };

  return (
    <div className="app-container">
      <DashboardHeader 
        currentBalance={currentBalance}
        exchangeRate={exchangeRate}
        formatCurrency={formatCurrency}
        formatBRL={formatBRL}
      />

      {error && (
        <div className="error-notification">
          <div className="error-content">
            <span className="error-message">{error}</span>
            <button className="error-close" onClick={() => setError('')}>×</button>
          </div>
          <div className="error-progress" />
        </div>
      )}

      <SidePanels 
        futureProfits={futureProfits}
        futureExpenses={futureExpenses}
        totalProjectedBalance={totalProjectedBalance}
        currentBalance={currentBalance}
        exchangeRate={exchangeRate}
        formatCurrency={formatCurrency}
        formatBRL={formatBRL}
      />

      <div className="page-content">
        <div className="main-grid">
          <TransactionForm 
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            editingTransaction={editingTransaction}
            setEditingTransaction={setEditingTransaction}
          />

          <TransactionHistory 
            transactions={transactions}
            groupTransactionsByDate={groupTransactionsByDate}
            isTransactionFuture={isTransactionFuture}
            formatCurrency={formatCurrency}
            formatBRL={formatBRL}
            exchangeRate={exchangeRate}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;