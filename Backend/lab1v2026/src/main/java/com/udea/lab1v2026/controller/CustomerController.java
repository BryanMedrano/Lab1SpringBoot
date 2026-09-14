package com.udea.lab1v2026.controller;

import com.udea.lab1v2026.DTO.CustomerDTO;
import com.udea.lab1v2026.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/customers", produces = "application/json")
@CrossOrigin(origins = "*") // Permite la comunicación desde el Frontend sin problemas de CORS
@Tag(name = "Clientes", description = "API para la gestión y consulta de clientes y sus cuentas")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // Obtener todos los clientes
    @GetMapping
    @Operation(summary = "Obtener todos los clientes", description = "Retorna la lista completa de clientes registrados con sus datos y saldos.")
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    // Obtener un cliente por ID
    @GetMapping("/{id}")
    @Operation(summary = "Obtener cliente por ID", description = "Busca un cliente específico utilizando su identificador único.")
    public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }

    // Crear un cliente
    @PostMapping
    @Operation(summary = "Crear nuevo cliente", description = "Registra un nuevo cliente con sus nombres, apellidos, número de cuenta y saldo inicial.")
    public ResponseEntity<CustomerDTO> createCustomer(@Valid @RequestBody CustomerDTO customerDTO) {
        // La validación del saldo no nulo y campos requeridos se delega automáticamente a @Valid
        CustomerDTO createdCustomer = customerService.createCustomer(customerDTO);
        return new ResponseEntity<>(createdCustomer, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar cliente", description = "Elimina un cliente de la base de datos utilizando su ID.")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build(); // Retorna HTTP 204 No Content
    }
}