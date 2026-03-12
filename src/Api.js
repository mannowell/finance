const API_URL = 'http://localhost:5001/api';

export const api = {
  async getTransactions() {
    try {
      const response = await fetch(`${API_URL}/transactions`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      throw error;
    }
  },

  async addTransaction(transaction) {
    try {
      const response = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      throw error;
    }
  },

  async deleteTransaction(id) {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
      throw error;
    }
  },

  async updateTransaction(id, transaction) {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return response.json();
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
