import React from 'react';

function TransactionForm({ formData, setFormData, handleSubmit, editingTransaction, setEditingTransaction }) {
  return (
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
  );
}

export default TransactionForm;
