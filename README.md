# Banco UdeA - Laboratorio 1

Este proyecto corresponde a una aplicación web que simula la gestión de clientes, cuentas bancarias y transferencias. Permite consultar la información de los clientes, realizar transferencias entre cuentas y consultar el historial de transacciones.

La aplicación está compuesta por un backend desarrollado con Spring Boot y un frontend web desarrollado con HTML, CSS y JavaScript.

Para este proyecto se utilizó **MySQL** como sistema gestor de base de datos. Por lo tanto, es necesario tener MySQL instalado y ejecutándose para poder configurar y ejecutar correctamente la aplicación. También se deben tener en cuenta la base de datos, el usuario, la contraseña y el puerto configurados en el backend.

## Ejecución del proyecto

Antes de iniciar la aplicación, asegúrate de que el servidor de MySQL esté ejecutándose y que la configuración de conexión del backend sea correcta.

### 1. Iniciar el Backend (Spring Boot)

1. Abre la carpeta `Backend/lab1v2026` en IntelliJ IDEA.
2. Verifica que la configuración de MySQL esté definida correctamente en `src/main/resources/application.properties`.
3. Ejecuta la clase principal de la aplicación: `Lab1v2026Application.java`.

El backend se ejecutará en el puerto configurado en Spring Boot, que normalmente es `8080`.

### 2. Iniciar el Frontend

1. Abre la carpeta `Frontend` en VS Code o en el IDE de tu preferencia.
2. Abre el archivo `index.html` en el navegador, o ejecútalo utilizando la extensión Live Server.

El frontend debe ejecutarse después de iniciar el backend para poder consultar clientes, realizar transferencias y consultar el historial de transacciones.

