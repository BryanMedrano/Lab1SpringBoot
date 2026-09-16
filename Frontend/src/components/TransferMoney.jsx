import { useState } from 'react';
import api from '../services/api';

export default function TransferMoney({ showAlert }) {
  const [formData, setFormData] = useState({ senderAccountNumber: '', receiverAccountNumber: '', amount: '' });

  const handleClear = () => setFormData({ senderAccountNumber: '', receiverAccountNumber: '', amount: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.senderAccountNumber === formData.receiverAccountNumber) {
      showAlert('La cuenta de origen y destino no pueden ser iguales.', 'danger');
      return;
    }

    try {
      const response = await api.post('/transactions', {
        ...formData,
        amount: parseFloat(formData.amount)
      });
      showAlert(`¡Transacción exitosa! ID: #${response.data.id}`, 'success');
      handleClear();
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al procesar la transferencia.';
      showAlert(msg, 'danger');
    }
  };

  return (
    <div className="card border-0 shadow mb-4">
      <div className="card-header bg-white py-3">
        <h4 className="mb-0 text-primary fw-bold"><i className="bi bi-arrow-left-right me-2"></i>Transferencia de Dinero</h4>
      </div>
      <div className="card-body p-4">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Cuenta Remitente</label>
            <input type="text" className="form-control" required value={formData.senderAccountNumber} onChange={(e) => setFormData({...formData, senderAccountNumber: e.target.value})} />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Cuenta Receptor</label>
            <input type="text" className="form-control" required value={formData.receiverAccountNumber} onChange={(e) => setFormData({...formData, receiverAccountNumber: e.target.value})} />
          </div>
          <div className="col-md-12">
            <label className="form-label fw-bold">Monto ($)</label>
            <input type="number" step="0.01" min="1" className="form-control" required value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
          </div>
          <div className="col-12 text-end mt-4 d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary px-4" onClick={handleClear}><i className="bi bi-eraser me-1"></i> Limpiar Campos</button>
            <button type="submit" className="btn btn-success px-4"><i className="bi bi-check-circle me-1"></i> Procesar Transferencia</button>
          </div>
        </form>
      </div>
    </div>
  );
}