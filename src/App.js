import React, { useState, useEffect, useCallback } from 'react';
import { api } from './Api';
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
  const [currentPage, setCurrentPage] = useState('home');
  const [error, setError] = useState('');
  const [errorTimeout, setErrorTimeout] = useState(null);
  const [timeUpdate, setTimeUpdate] = useState(0);

  const showError = useCallback((message) => {
    setError(message);
    
    if (errorTimeout) {
      clearTimeout(errorTimeout);
    }
    
    const timeout = setTimeout(() => {
      setError('');
    }, 5000);
    
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
    console.log('Página atual:', currentPage);
  }, [currentPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUpdate(prev => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  function handleEdit(transaction) {
    setEditingTransaction(transaction);
    setFormData({
      type: transaction.type,
      category: transaction.category,
      description: transaction.description,
      amount: transaction.amount.toString(),
      date: new Date(transaction.date).toISOString().substr(0, 10)
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const transactionData = {
        ...formData,
        amount: Number(formData.amount)
      };

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
      setCurrentPage('history');
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
      showError('Erro ao salvar transação: ' + error.message);
    }
  }

  async function handleDelete(id) {
    try {
      await api.deleteTransaction(id);
      await loadTransactions();
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
      showError('Não foi possível deletar a transação');
    }
  }

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
          return {
            ...acc,
            futureProfits: acc.futureProfits + amount
          };
        } else {
          return {
            ...acc,
            futureExpenses: acc.futureExpenses + amount
          };
        }
      }
    }, {
      currentBalance: 0,
      futureProfits: 0,
      futureExpenses: 0
    });
  };

  const { currentBalance, futureProfits, futureExpenses } = calculateBalances();
  const totalProjectedBalance = currentBalance + futureProfits - futureExpenses;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const formatBRL = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const isTransactionFuture = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const transactionDate = new Date(date);
    transactionDate.setHours(0, 0, 0, 0);
    return transactionDate > today;
  };

  const navigateTo = (page) => {
    console.log('Navegando para:', page, 'Estado atual:', currentPage);
    setCurrentPage(page);
    if (page !== 'new') {
      setFormData({
        type: 'expense',
        category: '',
        description: '',
        amount: '',
        date: new Date().toISOString().substr(0, 10)
      });
      setEditingTransaction(null);
    }
  };

  const groupTransactionsByDate = (transactions) => {
    const grouped = {};
    
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date).toISOString().split('T')[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
    });
    
    return grouped;
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <div className="header-left">
          <h1 className="header-title">Gerenciador Financeiro</h1>
          <div className="header-balance">
            <div className="balance-header">Saldo Atual</div>
            <div className="balance-amounts">
              <div className="balance-eur">
                <span className={currentBalance >= 0 ? 'positive' : 'negative'}>
                  {formatCurrency(currentBalance)}
                </span>
              </div>
              {exchangeRate && (
                <div className="balance-brl">
                  <span className={`${currentBalance >= 0 ? 'positive' : 'negative'} brl`}>
                    {formatBRL(currentBalance * exchangeRate)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="time-container">
          <div className="city-time-info">
            <h3>Azambuja, PT</h3>
            <div className="time-display">
              {new Date().toLocaleTimeString('pt-PT', {
                timeZone: 'Europe/Lisbon',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>

          <div className="city-time-info">
            <h3>São Luís, BR</h3>
            <div className="time-display">
              {new Date().toLocaleTimeString('pt-BR', {
                timeZone: 'America/Fortaleza',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-notification">
          <div className="error-content">
            <span className="error-message">{error}</span>
            <button 
              className="error-close"
              onClick={() => setError('')}
            >
              ×
            </button>
          </div>
          <div className="error-progress" />
        </div>
      )}

      <div className="side-panel projections-panel">
        <div className="side-panel-tab">
          Projeções
        </div>
        <div className="side-panel-content">
          <h3>Projeções Futuras</h3>
          <div className="projected-details">
            <div className="future-profits">
              <span className="label">Receitas Futuras:</span>
              <div className="currency-values">
                <span className="positive">
                  {formatCurrency(futureProfits)}
                </span>
                {exchangeRate && (
                  <span className="positive brl">
                    {formatBRL(futureProfits * exchangeRate)}
                  </span>
                )}
              </div>
            </div>
            <div className="future-expenses">
              <span className="label">Despesas Futuras:</span>
              <div className="currency-values">
                <span className="negative">
                  {formatCurrency(futureExpenses)}
                </span>
                {exchangeRate && (
                  <span className="negative brl">
                    {formatBRL(futureExpenses * exchangeRate)}
                  </span>
                )}
              </div>
            </div>
            <div className="future-balance">
              <span className="label">Saldo Projetado:</span>
              <div className="currency-values">
                <span className={totalProjectedBalance >= 0 ? 'positive' : 'negative'}>
                  {formatCurrency(currentBalance + futureProfits - futureExpenses)}
                </span>
                {exchangeRate && (
                  <span className={`${totalProjectedBalance >= 0 ? 'positive' : 'negative'} brl`}>
                    {formatBRL((currentBalance + futureProfits - futureExpenses) * exchangeRate)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {exchangeRate && (
        <div className="side-panel exchange-panel">
          <div className="side-panel-tab">
            Taxa de Câmbio
          </div>
          <div className="side-panel-content">
            <h3>Informações de Câmbio</h3>
            <div className="exchange-rate-details">
              <div>
                <span>Taxa atual:</span>
                <span className="exchange-rate-value">
                  1 EUR = {formatBRL(exchangeRate)}
                </span>
              </div>
              <div>
                <span>Última atualização:</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="page-content">
        <div className="main-grid">
          <div className="new-transaction-section">
            <h2>{editingTransaction ? 'Editar Transação' : 'Nova Transação'}</h2>
            <form onSubmit={handleSubmit} className="transaction-form">
              <select
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
              </select>

              <select
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                required
              >
                <option value="">Selecione uma categoria</option>
                <option value="salary">Salário</option>
                <option value="freelance">Freelance</option>
                <option value="food">Alimentação</option>
                <option value="transport">Transporte</option>
                <option value="bills">Contas</option>
                <option value="shopping">Compras</option>
                <option value="others">Outros</option>
              </select>

              <input
                type="text"
                placeholder="Descrição"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                required
              />

              <input
                type="number"
                placeholder="Valor"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
                required
              />

              <input
                type="date"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                required
              />

              <div className="form-buttons">
                <button type="submit">
                  {editingTransaction ? 'Salvar Alterações' : 'Adicionar'}
                </button>
                {editingTransaction && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setEditingTransaction(null);
                      setFormData({
                        type: 'expense',
                        category: '',
                        description: '',
                        amount: '',
                        date: new Date().toISOString().substr(0, 10)
                      });
                    }}
                    className="cancel-btn"
                  >
                    Cancelar
                  </button>
                )}
              </div>
          </form>
          </div>

          <div className="transactions-section">
            <h2>Histórico de Transações</h2>
            <div className="timeline">
              {Object.entries(groupTransactionsByDate(transactions)).map(([date, dayTransactions]) => (
                <div key={date} className="timeline-day">
                  <div className="timeline-date">
                    <span>{new Date(date).toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="timeline-items">
                    {dayTransactions.map(transaction => (
                      <div 
                        key={transaction._id} 
                        className={`timeline-item ${transaction.type} ${isTransactionFuture(transaction.date) ? 'future' : ''}`}
                      >
                        <div className="timeline-item-content">
                          <div className="transaction-info">
                            <strong>
                              {transaction.description}
                              {isTransactionFuture(transaction.date) && (
                                <span className="future-badge">Futura</span>
                              )}
                            </strong>
                            <span className="category">{transaction.category}</span>
                          </div>
                          <div className="transaction-amount">
                            <div className="currency-values">
                              <span>{formatCurrency(transaction.amount)}</span>
                              {exchangeRate && (
                                <span className={`secondary-currency ${transaction.amount >= 0 ? 'positive' : 'negative'}`}>
                                  {formatBRL(transaction.amount * exchangeRate)}
                                </span>
                              )}
                            </div>
                            <div className="transaction-actions">
                              <button 
                                onClick={() => handleEdit(transaction)}
                                className="edit-btn"
                              >
                                Editar
                              </button>
                              <button 
                                onClick={() => handleDelete(transaction._id)}
                                className="delete-btn"
                              >
                                Deletar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;