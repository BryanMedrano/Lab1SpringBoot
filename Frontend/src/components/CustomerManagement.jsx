import { useState, useEffect } from 'react';
import api from '../services/api';
import { normalizeText } from '../services/utils';

export default function CustomerManagement({ showAlert }) {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [foundCustomer, setFoundCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCustomers = async () => {
    setFoundCustomer(null);
    setSearchQuery('');
    setLoading(true);
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (error) {
      showAlert('Error al conectar con el servidor backend.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      showAlert('Ingresa un nombre, apellido o número de cuenta.', 'warning');
      return;
    }

    try {
      const response = await api.get('/customers');
      const query = normalizeText(searchQuery.trim());

      const match = response.data.find(c => {
        const firstName = normalizeText(c.firstName);
        const lastName = normalizeText(c.lastName);
        const fullName = `${firstName}${lastName}`;
        const accountNumber = c.accountNumber.toLowerCase();

        return firstName.includes(query) || lastName.includes(query) || fullName.includes(query) || accountNumber === query;
      });

      if (!match) {
        setFoundCustomer(null);
        showAlert(`No se encontró ningún cliente con: "${searchQuery}"`, 'danger');
      } else {
        setFoundCustomer(match);
      }
    } catch (error) {
      showAlert('Error al realizar la búsqueda.', 'danger');
    }
  };

  return (
    <div className="card border-0 shadow mb-4">
      <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h4 className="mb-0 text-primary fw-bold"><i class="bi bi-people-fill me-2"></i>Gestión de Clientes</h4>
        <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={loadCustomers}>
          <i className="bi bi-arrow-clockwise me-1"></i> Ver Todos
        </button>
      </div>
      <div className="card-body p-4">
        {/* Buscador */}
        <div className="row g-2 mb-4 bg-light p-3 rounded-3 align-items-end border">
          <div className="col-md-9">
            <label className="form-label fw-bold text-secondary">Buscar Cliente por Nombre, Apellido o Nº de Cuenta</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Ej: María López, Bryan o 15896"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100" onClick={handleSearch}>
              <i className="bi bi-search me-1"></i> Buscar
            </button>
          </div>
        </div>

        {/* Tarjeta Cliente Encontrado */}
        {foundCustomer && (
          <div className="card border-primary bg-primary bg-opacity-10 shadow-sm mb-4">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <span className="fw-bold"><i className="bi bi-person-check-fill me-2"></i>Cliente Encontrado</span>
              <button className="btn btn-sm btn-light" onClick={() => setFoundCustomer(null)}><i className="bi bi-x-lg"></i> Cerrar</button>
            </div>
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted d-block">ID: #{foundCustomer.id}</small>
                <h3 className="fw-bold text-dark">{foundCustomer.firstName} {foundCustomer.lastName}</h3>
                <p className="mb-0 text-secondary">Nº Cuenta: <span className="badge bg-secondary">{foundCustomer.accountNumber}</span></p>
              </div>
              <div className="text-end">
                <small className="text-muted d-block">Saldo Actual</small>
                <span className="fs-2 fw-bold text-success">${foundCustomer.balance.toLocaleString('es-CO')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tabla General */}
        {!foundCustomer && (
          <div className="table-responsive rounded-3 border">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-primary">
                <tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Nº Cuenta</th><th className="text-end">Saldo</th></tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="text-center">Cargando...</td></tr>
                ) : customers.length === 0 ? (
                  <tr><td colSpan="5" className="text-center text-muted">No hay clientes.</td></tr>
                ) : (
                  customers.map(c => (
                    <tr key={c.id}>
                      <td>{c.id}</td><td>{c.firstName}</td><td>{c.lastName}</td>
                      <td><span className="badge bg-secondary">{c.accountNumber}</span></td>
                      <td className="fw-bold text-success text-end">${c.balance.toLocaleString('es-CO')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}