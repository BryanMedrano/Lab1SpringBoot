import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CustomerManagement from './components/CustomerManagement';
import CreateCustomer from './components/CreateCustomer';
import TransferMoney from './components/TransferMoney';
import TransactionHistory from './components/TransactionHistory';

export default function App() {
  const [activeTab, setActiveTab] = useState('customers');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'danger') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
        <div className="container">
          <span className="navbar-brand fw-bold">
            <i className="bi bi-bank me-2"></i>Banco
          </span>
          <div className="navbar-nav">
            <button 
              className={`nav-link btn btn-link text-white ${activeTab === 'customers' ? 'active fw-bold' : ''}`} 
              onClick={() => setActiveTab('customers')}>
              Consultar Clientes
            </button>
            <button 
              className={`nav-link btn btn-link text-white ${activeTab === 'create-customer' ? 'active fw-bold' : ''}`} 
              onClick={() => setActiveTab('create-customer')}>
              Crear Cuenta
            </button>
            <button 
              className={`nav-link btn btn-link text-white ${activeTab === 'transfer' ? 'active fw-bold' : ''}`} 
              onClick={() => setActiveTab('transfer')}>
              Realizar Transferencia
            </button>
            <button 
              className={`nav-link btn btn-link text-white ${activeTab === 'history' ? 'active fw-bold' : ''}`} 
              onClick={() => setActiveTab('history')}>
              Histórico por Cliente
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        {alert && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show shadow-sm mb-4`} role="alert">
            {alert.message}
            <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
          </div>
        )}

        {activeTab === 'customers' && <CustomerManagement showAlert={showAlert} />}
        {activeTab === 'create-customer' && (
          <CreateCustomer 
            showAlert={showAlert} 
            onSuccess={() => setActiveTab('customers')} 
          />
        )}
        {activeTab === 'transfer' && <TransferMoney showAlert={showAlert} />}
        {activeTab === 'history' && <TransactionHistory showAlert={showAlert} />}
      </div>
    </div>
  );
}