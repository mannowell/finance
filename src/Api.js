const STORAGE_KEY = 'finance_transactions';

const getFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (transactions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

export const api = {
  async getTransactions() {
    try {
      // Return a copy to avoid reference issues
      return [...getFromStorage()];
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      throw error;
    }
  },

  async addTransaction(transaction) {
    try {
      const transactions = getFromStorage();
      const newTransaction = {
        ...transaction,
        id: Date.now(), // Use timestamp as unique ID
        _id: Date.now() // Keep _id for frontend compatibility
      };
      
      transactions.unshift(newTransaction);
      saveToStorage(transactions);
      
      return newTransaction;
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      throw error;
    }
  },

  async deleteTransaction(id) {
    try {
      const transactions = getFromStorage();
      const filtered = transactions.filter(t => t.id !== id && t._id !== id);
      saveToStorage(filtered);
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
      throw error;
    }
  },

  async updateTransaction(id, transaction) {
    try {
      const transactions = getFromStorage();
      const index = transactions.findIndex(t => t.id === id || t._id === id);
      
      if (index === -1) {
        throw new Error('Transação não encontrada');
      }
      
      const updatedTransaction = { ...transaction, id, _id: id };
      transactions[index] = updatedTransaction;
      saveToStorage(transactions);
      
      return updatedTransaction;
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
      throw error;
    }
  },

  async getExchangeRate() {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
      if (!response.ok) {
        throw new Error('Erro ao buscar taxa de câmbio');
      }
      const data = await response.json();
      return data.rates.BRL;
    } catch (error) {
      console.error('Erro ao buscar taxa de câmbio:', error);
      return null;
    }
  }
};

