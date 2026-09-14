const API_BASE_URL = 'http://localhost:8080/api';
let alertTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    loadCustomers();
});

/**
 * Normaliza una cadena de texto eliminando tildes/acentos y convirtiéndola a minúsculas
 */
function normalizeText(text) {
    if (!text) return '';
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/**
 * Muestra la sección seleccionada y oculta las demás
 */
function showSection(sectionId) {
    const sections = ['view-customers', 'view-transfer', 'view-history'];
    sections.forEach(id => {
        const element = document.getElementById(id);
        if (id === sectionId) {
            element.classList.remove('d-none');
        } else {
            element.classList.add('d-none');
        }
    });

    if (sectionId === 'view-customers') {
        loadCustomers();
    }
}

/**
 * Muestra alertas visuales de Bootstrap que desaparecen automáticamente tras `timeoutMs` (por defecto 4000ms)
 */
function showAlert(message, type = 'danger', timeoutMs = 4000) {
    const alertContainer = document.getElementById('alert-container');
    
    // Cancelar el temporizador anterior si existía
    if (alertTimeout) {
        clearTimeout(alertTimeout);
    }

    const alertId = 'custom-alert-' + Date.now();
    alertContainer.innerHTML = `
        <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show shadow-sm mb-4" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    // Configurar desaparición automática mediante Bootstrap Alert API o remoción del DOM
    alertTimeout = setTimeout(() => {
        const alertEl = document.getElementById(alertId);
        if (alertEl) {
            const bsAlert = bootstrap.Alert.getOrCreateInstance(alertEl);
            bsAlert.close();
        }
    }, timeoutMs);
}

/**
 * Carga todos los clientes y muestra la tabla general
 */
async function loadCustomers() {
    clearCustomerSearch();
    const tableBody = document.getElementById('customers-table-body');
    tableBody.innerHTML = '<tr><td colspan="5" class="text-center">Cargando datos...</td></tr>';

    try {
        const response = await fetch(`${API_BASE_URL}/customers`);
        
        if (!response.ok) {
            throw new Error('Error al obtener la lista de clientes.');
        }

        const customers = await response.json();
        tableBody.innerHTML = '';

        if (customers.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No hay clientes registrados.</td></tr>';
            return;
        }

        customers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.firstName}</td>
                <td>${customer.lastName}</td>
                <td><span class="badge bg-secondary badge-account">${customer.accountNumber}</span></td>
                <td class="fw-bold text-success text-end">$${customer.balance.toLocaleString('es-CO', { minimumFractionDigits: 2 })}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
        showAlert('No se pudo conectar con el servidor backend. Asegúrate de que Spring Boot esté en ejecución.', 'danger');
        tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Error de carga.</td></tr>';
    }
}

/**
 * Busca un cliente por Nombre, Apellido, Nombre Completo o Nº de Cuenta
 * Insensible a acentos/tildes.
 */
async function searchCustomer() {
    const rawQuery = document.getElementById('searchCustomerInput').value.trim();
    const query = normalizeText(rawQuery);
    const detailCard = document.getElementById('customer-detail-card');
    const tableContainer = document.querySelector('#customers-table').parentElement;

    if (!query) {
        showAlert('Ingresa un nombre, apellido o número de cuenta para buscar.', 'warning');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/customers`);

        if (!response.ok) {
            throw new Error('Error al conectar con el servidor.');
        }

        const customers = await response.json();

        // Evaluar coincidencia sin importar acentos ni mayúsculas/minúsculas
        const foundCustomer = customers.find(c => {
            const firstName = normalizeText(c.firstName);
            const lastName = normalizeText(c.lastName);
            const fullName = `${firstName} ${lastName}`;
            const accountNumber = c.accountNumber.toLowerCase();

            return firstName.includes(query) ||
                   lastName.includes(query) ||
                   fullName.includes(query) ||
                   accountNumber === query;
        });

        if (!foundCustomer) {
            detailCard.classList.add('d-none');
            showAlert(`No se encontró ningún cliente con la búsqueda: "${rawQuery}"`, 'danger', 4000);
            return;
        }

        // Renderizar la tarjeta con los datos del usuario encontrado
        detailCard.innerHTML = `
            <div class="card border-primary bg-primary bg-opacity-10 shadow-sm">
                <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <span class="fw-bold"><i class="bi bi-person-check-fill me-2"></i>Cliente Encontrado</span>
                    <button class="btn btn-sm btn-light" onclick="clearCustomerSearch()">
                        <i class="bi bi-x-lg"></i> Cerrar Búsqueda
                    </button>
                </div>
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div>
                        <small class="text-muted d-block mb-1">ID Cliente: #${foundCustomer.id}</small>
                        <h3 class="fw-bold mb-1 text-dark">${foundCustomer.firstName} ${foundCustomer.lastName}</h3>
                        <p class="mb-0 text-secondary">
                            <i class="bi bi-credit-card-2-front me-1"></i>Número de Cuenta: 
                            <span class="badge bg-secondary badge-account">${foundCustomer.accountNumber}</span>
                        </p>
                    </div>
                    <div class="text-end">
                        <small class="text-muted d-block">Saldo Actual</small>
                        <span class="fs-2 fw-bold text-success">$${foundCustomer.balance.toLocaleString('es-CO', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>
        `;

        detailCard.classList.remove('d-none');
        tableContainer.classList.add('d-none');

    } catch (error) {
        console.error(error);
        showAlert(error.message, 'danger');
    }
}

/**
 * Restablece el buscador y vuelve a mostrar la tabla general
 */
function clearCustomerSearch() {
    document.getElementById('searchCustomerInput').value = '';
    const detailCard = document.getElementById('customer-detail-card');
    detailCard.classList.add('d-none');
    
    const tableContainer = document.querySelector('#customers-table-body')?.parentElement;
    if (tableContainer) {
        tableContainer.parentElement.classList.remove('d-none');
    }
}

/**
 * Limpia los campos del formulario de transferencia
 */
function clearTransferForm() {
    document.getElementById('transfer-form').reset();
}

/**
 * Procesa la transferencia enviando un POST a /api/transactions
 */
async function handleTransfer(event) {
    event.preventDefault();

    const senderAccountNumber = document.getElementById('senderAccount').value.trim();
    const receiverAccountNumber = document.getElementById('receiverAccount').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    if (senderAccountNumber === receiverAccountNumber) {
        showAlert('La cuenta de origen y destino no pueden ser iguales.', 'danger');
        return;
    }

    const payload = {
        senderAccountNumber: senderAccountNumber,
        receiverAccountNumber: receiverAccountNumber,
        amount: amount
    };

    try {
        const response = await fetch(`${API_BASE_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            let errorMsg = data.message || data.error || 'Error al procesar la transferencia.';
            if (data.details) {
                errorMsg = Object.values(data.details).join(' | ');
            }
            throw new Error(errorMsg);
        }

        showAlert(`¡Transacción exitosa! ID de transacción: #${data.id}`, 'success', 5000);
        clearTransferForm();
    } catch (error) {
        console.error(error);
        showAlert(error.message, 'danger');
    }
}

/**
 * Consulta el historial de una cuenta desde /api/transactions/{accountNumber}
 */
async function loadHistory() {
    const accountNumber = document.getElementById('searchAccount').value.trim();
    const tableBody = document.getElementById('history-table-body');

    if (!accountNumber) {
        showAlert('Por favor ingrese un número de cuenta para consultar el historial.', 'warning');
        return;
    }

    tableBody.innerHTML = '<tr><td colspan="5" class="text-center">Buscando transacciones...</td></tr>';

    try {
        const response = await fetch(`${API_BASE_URL}/transactions/${accountNumber}`);

        if (!response.ok) {
            throw new Error('Error al obtener el historial de la cuenta.');
        }

        const transactions = await response.json();
        tableBody.innerHTML = '';

        if (transactions.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No se encontraron transacciones para esta cuenta.</td></tr>';
            return;
        }

        transactions.forEach(tx => {
            const formattedDate = tx.timestamp ? new Date(tx.timestamp).toLocaleString('es-CO') : 'N/A';
            const isSender = tx.senderAccountNumber === accountNumber;
            const badgeClass = isSender ? 'text-danger' : 'text-success';
            const sign = isSender ? '-' : '+';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>#${tx.id}</td>
                <td>${tx.senderAccountNumber}</td>
                <td>${tx.receiverAccountNumber}</td>
                <td class="fw-bold ${badgeClass}">${sign}$${tx.amount.toLocaleString('es-CO', { minimumFractionDigits: 2 })}</td>
                <td>${formattedDate}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
        showAlert(error.message, 'danger');
        tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Error al consultar datos.</td></tr>';
    }
}