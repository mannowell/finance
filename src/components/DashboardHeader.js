import React from 'react';

function DashboardHeader({ currentBalance, exchangeRate, formatCurrency, formatBRL }) {
  return (
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
  );
}

export default DashboardHeader;
