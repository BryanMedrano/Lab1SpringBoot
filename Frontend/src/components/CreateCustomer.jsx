import { useState } from 'react';
import api from '../services/api';

export default function CreateCustomer({ showAlert, onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    accountNumber: '',
    balance: ''
  });

  const handleClear = () => {
    setFormData({
      firstName: '',
      lastName: '',
      accountNumber: '',
      balance: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      accountNumber: formData.accountNumber.trim(),
      balance: parseFloat(formData.balance)
    };

    try {
      const response = await api.post('/customers', payload);
      showAlert(`¡Cliente registrado con éxito! ID asignado: #${response.data.id}`, 'success');
      handleClear();
      if (onSuccess) onSuccess();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error al registrar el cliente.';
      showAlert(errorMsg, 'danger');
    }
  };

  return (
    <div className="card border-0 shadow mb-4">
      <div className="card-header bg-white py-3">
        <h4 className="mb-0 text-primary fw-bold">
          <i className="bi bi-person-plus-fill me-2"></i>Crear Nuevo Cliente
        </h4>
      </div>
      <div className="card-body p-4">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Nombre</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="Ej: María"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Apellido</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="Ej: López"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Número de Cuenta</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="Ej: 987654"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Saldo Inicial ($)</label>
            <input 
              type="number" 
              step="0.01" 
              min="0" 
              className="form-control" 
              required 
              placeholder="Ej: 500000"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
            />
          </div>
          <div className="col-12 text-end mt-4 d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary px-4" onClick={handleClear}>
              <i className="bi bi-eraser me-1"></i> Limpiar Campos
            </button>
            <button type="submit" className="btn btn-primary px-4">
              <i className="bi bi-check-circle me-1"></i> Registrar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}