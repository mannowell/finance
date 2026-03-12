import React from 'react';

function TransactionHistory({ transactions, groupTransactionsByDate, isTransactionFuture, formatCurrency, formatBRL, exchangeRate, handleEdit, handleDelete }) {
  const grouped = groupTransactionsByDate(transactions);

  return (
    <div className="transactions-section">
      <h2>Histórico de Transações</h2>
      <div className="timeline">
        {Object.entries(grouped).map(([date, dayTransactions]) => (
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
  );
}

export default TransactionHistory;
