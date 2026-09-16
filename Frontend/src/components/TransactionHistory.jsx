import { useState } from 'react';
import api from '../services/api';

export default function TransactionHistory({ showAlert }) {
  const [accountNumber, setAccountNumber] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!accountNumber.trim()) {
      showAlert('Por favor ingrese un número de cuenta.', 'warning');
      return;
    }

    try {
      const response = await api.get(`/transactions/${accountNumber.trim()}`);
      setTransactions(response.data);
      setSearched(true);
    } catch (error) {
      showAlert('Error al obtener el historial.', 'danger');
    }
  };

  return (
    <div className="card border-0 shadow mb-4">
      <div className="card-header bg-white py-3">
        <h4 className="mb-0 text-primary fw-bold"><i className="bi bi-journal-text me-2"></i>Histórico de Transacciones</h4>
      </div>
      <div className="card-body p-4">
        <div className="row g-3 mb-4">
          <div className="col-md-9">
            <input type="text" className="form-control" placeholder="Ingrese el número de cuenta" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100" onClick={handleSearch}><i className="bi bi-search me-1"></i> Buscar Transacciones</button>
          </div>
        </div>

        <div className="table-responsive rounded-3 border">
          <table className="table table-bordered table-hover mb-0">
            <thead className="table-secondary">
              <tr><th>ID Transacción</th><th>Cuenta Origen</th><th>Cuenta Destino</th><th>Monto</th><th>Fecha / Hora</th></tr>
            </thead>
            <tbody>
              {!searched ? (
                <tr><td colSpan="5" className="text-center text-muted">Realice una búsqueda para consultar transacciones.</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan="5" className="text-center text-muted">No se encontraron transacciones.</td></tr>
              ) : (
                transactions.map(tx => {
                  const isSender = tx.senderAccountNumber === accountNumber;
                  return (
                    <tr key={tx.id}>
                      <td>#{tx.id}</td>
                      <td>{tx.senderAccountNumber}</td>
                      <td>{tx.receiverAccountNumber}</td>
                      <td className={`fw-bold ${isSender ? 'text-danger' : 'text-success'}`}>
                        {isSender ? '-' : '+'}${tx.amount.toLocaleString('es-CO')}
                      </td>
                      <td>{tx.timestamp ? new Date(tx.timestamp).toLocaleString('es-CO') : 'N/A'}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}