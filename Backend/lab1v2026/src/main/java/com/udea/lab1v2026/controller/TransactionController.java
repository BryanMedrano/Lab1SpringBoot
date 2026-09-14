package com.udea.lab1v2026.controller;

import com.udea.lab1v2026.DTO.TransactionDTO;
import com.udea.lab1v2026.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/transactions", produces = "application/json")
@CrossOrigin(origins = "*") // Permite peticiones desde el frontend sin bloqueos de CORS
@Tag(name = "Transacciones", description = "API para realizar transferencias y consultar historiales")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    @Operation(summary = "Realizar transferencia", description = "Transfiere dinero entre dos cuentas si hay saldo suficiente.")
    public ResponseEntity<TransactionDTO> transferMoney(@Valid @RequestBody TransactionDTO transactionDTO) {
        // Al delegar la excepción al GlobalExceptionHandler, el código del controlador queda limpio
        TransactionDTO savedTransaction = transactionService.transferMoney(transactionDTO);
        return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
    }

    @GetMapping("/{accountNumber}")
    @Operation(summary = "Obtener historial de cuenta", description = "Obtiene las transacciones asociadas a un número de cuenta.")
    public ResponseEntity<List<TransactionDTO>> getTransactionsByAccount(@PathVariable String accountNumber) {
        List<TransactionDTO> transactions = transactionService.getTransactionsForAccount(accountNumber);
        return ResponseEntity.ok(transactions);
    }
}