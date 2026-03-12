import React from 'react';

function SidePanels({ futureProfits, futureExpenses, totalProjectedBalance, currentBalance, exchangeRate, formatCurrency, formatBRL }) {
  return (
    <>
      <div className="side-panel projections-panel">
        <div className="side-panel-tab">Projeções</div>
        <div className="side-panel-content">
          <h3>Projeções Futuras</h3>
          <div className="projected-details">
            <div className="future-profits">
              <span className="label">Receitas Futuras:</span>
              <div className="currency-values">
                <span className="positive">{formatCurrency(futureProfits)}</span>
                {exchangeRate && (
                  <span className="positive brl">{formatBRL(futureProfits * exchangeRate)}</span>
                )}
              </div>
            </div>
            <div className="future-expenses">
              <span className="label">Despesas Futuras:</span>
              <div className="currency-values">
                <span className="negative">{formatCurrency(futureExpenses)}</span>
                {exchangeRate && (
                  <span className="negative brl">{formatBRL(futureExpenses * exchangeRate)}</span>
                )}
              </div>
            </div>
            <div className="future-balance">
              <span className="label">Saldo Projetado:</span>
              <div className="currency-values">
                <span className={totalProjectedBalance >= 0 ? 'positive' : 'negative'}>
                  {formatCurrency(totalProjectedBalance)}
                </span>
                {exchangeRate && (
                  <span className={`${totalProjectedBalance >= 0 ? 'positive' : 'negative'} brl`}>
                    {formatBRL(totalProjectedBalance * exchangeRate)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {exchangeRate && (
        <div className="side-panel exchange-panel">
          <div className="side-panel-tab">Taxa de Câmbio</div>
          <div className="side-panel-content">
            <h3>Informações de Câmbio</h3>
            <div className="exchange-rate-details">
              <div>
                <span>Taxa atual:</span>
                <span className="exchange-rate-value">1 EUR = {formatBRL(exchangeRate)}</span>
              </div>
              <div>
                <span>Última atualização:</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SidePanels;
