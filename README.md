# Informe - Laboratorio 1 SpringBoot

## 1. Introducción

Este proyecto corresponde a una aplicación web que simula la gestión de clientes, cuentas bancarias y transferencias. Permite consultar la información de los clientes, realizar transferencias entre cuentas y consultar el historial de transacciones.

La solución está construida bajo un enfoque de aplicación web de múltiples capas. El backend se desarrolla utilizando Java y Spring Boot, exponiendo una API REST encargada de procesar las solicitudes y ejecutar la lógica de negocio. Para la persistencia de la información se utiliza MySQL, accediendo a los datos mediante Spring Data JPA.

Por otra parte, el frontend proporciona la interfaz mediante la cual el usuario puede interactuar con las funcionalidades de la aplicación. En la implementación se utiliza React para construir la interfaz y Axios para realizar las solicitudes HTTP hacia los servicios REST proporcionados por el backend.

## 2. Objetivos

### 2.1. Objetivo General

Desarrollar una aplicación web para la simulación de operaciones bancarias utilizando Spring Boot, MySQL y React, implementando una arquitectura por capas que permita gestionar clientes, realizar transferencias entre cuentas y consultar el historial de transacciones mediante una API REST.

### 2.2. Objetivos Específicos

* Implementar un backend utilizando Spring Boot para proporcionar los servicios REST de la aplicación.
* Diseñar una arquitectura por capas que permita separar las responsabilidades de los componentes del sistema.
* Configurar la persistencia de datos utilizando Spring Data JPA y MySQL.
* Implementar las entidades necesarias para representar los clientes y las transacciones bancarias.
* Implementar los controladores REST encargados de recibir y responder las solicitudes HTTP.
* Desarrollar un frontend utilizando React que permita interactuar con las funcionalidades proporcionadas por el backend.
* Utilizar Axios para establecer la comunicación entre el frontend y los servicios REST.
* Implementar las vistas necesarias para consultar clientes, realizar transferencias y visualizar el historial de transacciones.
* Integrar los diferentes componentes de la solución para obtener una aplicación web funcional.

## 3. Herramientas de SW Empleadas

Para el desarrollo del proyecto se utilizaron las siguientes herramientas y tecnologías:

| Herramienta / Tecnología | Uso                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------- |
| **Java / JDK 17**        | Lenguaje y entorno de ejecución utilizado para el desarrollo del backend.               |
| **Spring Boot**          | Framework utilizado para construir la aplicación backend y los servicios REST.          |
| **Spring Data JPA**      | Capa de persistencia utilizada para interactuar con la base de datos.                   |
| **Hibernate**            | Implementación utilizada por JPA para el mapeo objeto-relacional.                       |
| **MySQL**                | Sistema gestor de base de datos utilizado para almacenar clientes y transacciones.      |
| **Maven**                | Herramienta utilizada para la gestión de dependencias y construcción del proyecto Java. |
| **Lombok**               | Biblioteca utilizada para reducir código repetitivo en las clases Java.                 |
| **MapStruct**            | Herramienta utilizada para realizar conversiones entre entidades y DTOs.                |
| **React**                | Biblioteca utilizada para desarrollar la interfaz del frontend.                         |
| **Axios**                | Cliente HTTP utilizado para consumir los servicios REST desde el frontend.              |
| **Visual Studio Code**   | Entorno utilizado para el desarrollo del frontend.                                      |
| **IntelliJ IDEA**        | Entorno utilizado para el desarrollo y ejecución del backend.                           |
| **Git**                  | Sistema de control de versiones utilizado para gestionar el código fuente.              |
| **GitHub**               | Plataforma utilizada para almacenar y compartir el repositorio del proyecto.            |
| **Postman/Swagger**              | Herramienta utilizada para realizar pruebas sobre los servicios REST.                   |
| **Navegador web**        | Utilizado para ejecutar e interactuar con la aplicación frontend.                       |

# 4. Arquitectura propuesta

## 4.1. Descripción general

La aplicación utiliza una **arquitectura en capas desacoplada** estructurada bajo el patrón **cliente-servidor**, separando la interfaz de usuario de la lógica de negocio y del almacenamiento de los datos.

### **Frontend:** 
El frontend está desarrollado utilizando **React**, permitiendo construir la interfaz de usuario mediante componentes reutilizables.

La comunicación con el backend se realiza utilizando **Axios**, mediante solicitudes HTTP hacia los endpoints de la API REST.

El frontend permite interactuar con las principales funcionalidades del sistema:

* Consulta de clientes.
* Creación/gestión de clientes.
* Realización de transferencias entre cuentas.
* Consulta del historial de transacciones.

La comunicación utiliza información en formato JSON, permitiendo que los datos obtenidos desde el backend sean procesados y representados en la interfaz.

### **Backend**

El backend está desarrollado con **Spring Boot** y expone los servicios mediante una API REST.

La estructura se organiza mediante diferentes capas:

### Modelo

La capa de modelo contiene las clases que representan los datos principales de la aplicación. Entre ellas se encuentran las entidades relacionadas con los clientes y las transacciones.

Las entidades se encuentran asociadas a tablas de la base de datos mediante las anotaciones proporcionadas por JPA.

### Repository

La capa Repository es responsable de la comunicación con la base de datos.

Para esta función se utiliza `JpaRepository`, que proporciona operaciones de persistencia como creación, consulta, actualización y eliminación de registros, además de permitir definir consultas específicas.

Por ejemplo, el repositorio de transacciones permite consultar aquellas operaciones asociadas a una cuenta determinada.

### Service

La capa Service contiene la lógica de negocio de la aplicación.

Una de las operaciones principales implementadas es la transferencia de dinero. Para realizarla se deben identificar las cuentas involucradas, validar su existencia, verificar que la cuenta de origen tenga saldo suficiente, actualizar los saldos correspondientes y registrar la transacción.

De esta manera, la lógica de negocio se mantiene separada de los controladores y del acceso directo a la base de datos.

### Controller

La capa Controller recibe las solicitudes HTTP provenientes del frontend y las dirige hacia los servicios correspondientes.

Los controladores definen los endpoints de la API REST y retornan las respuestas correspondientes al cliente.

# 5. Procedimiento

## 5.1. Creación y configuración del backend

Inicialmente se creó el proyecto Spring Boot utilizando Maven y Java.

Se configuraron las dependencias necesarias para desarrollar la aplicación REST, trabajar con persistencia mediante JPA, conectarse con MySQL y utilizar herramientas adicionales como Lombok y MapStruct.

Entre las dependencias principales se encuentran:

* Spring Web.
* Spring Data JPA.
* Spring Boot Validation.
* MySQL Connector.
* Lombok.
* MapStruct.
* Spring Boot DevTools.
* Spring Boot Starter Test.

## 5.2. Configuración de MySQL

Se configuró una base de datos MySQL para almacenar la información utilizada por la aplicación.

La conexión se establece mediante las propiedades de Spring Boot ubicadas en:

```text
src/main/resources/application.properties
```

En este archivo se especifican parámetros como:

* URL de conexión.
* Usuario.
* Contraseña.
* Driver JDBC.
* Dialecto de Hibernate.
* Configuración de generación/actualización del esquema.

## 5.3. Implementación del modelo

Se implementaron las entidades necesarias para representar la información manejada por la aplicación.

Entre los datos principales se encuentran los relacionados con los clientes:

* Id.
* Número de cuenta.
* Nombre.
* Apellido.
* Saldo.

Para las transacciones se manejan datos como:

* Id.
* Cuenta de remitente.
* Cuenta de receptor.
* Valor de la transferencia.
* Fecha y hora de la operación.

Las entidades utilizan anotaciones JPA para establecer su correspondencia con las tablas de la base de datos.

## 5.4. Implementación de los repositorios

Posteriormente se implementaron los repositorios utilizando `JpaRepository`.

Esta capa permite realizar las operaciones necesarias sobre los datos sin tener que implementar manualmente todas las consultas SQL.

También se definieron métodos específicos para consultar información, por ejemplo, buscar clientes mediante su número de cuenta y consultar transacciones relacionadas con una cuenta.

## 5.5. Implementación de la lógica de negocio

La lógica principal se implementó en la capa de servicios.

Para una transferencia bancaria se realiza, de forma general, el siguiente procedimiento:

1. Recibir los datos de la transferencia.
2. Validar que las cuentas de origen y destino hayan sido proporcionadas.
3. Buscar la cuenta de origen.
4. Buscar la cuenta de destino.
5. Verificar que ambas cuentas existan.
6. Comprobar que la cuenta de origen tenga saldo suficiente.
7. Descontar el valor de la transferencia de la cuenta de origen.
8. Incrementar el saldo de la cuenta de destino.
9. Guardar los cambios.
10. Registrar la transacción.
11. Retornar la información de la operación.

## 5.6. Implementación de los controladores REST

Se implementaron controladores REST para exponer las operaciones de la aplicación mediante endpoints HTTP.

Entre las operaciones principales se encuentran las relacionadas con:

* Consulta de clientes.
* Consulta de un cliente específico.
* Creación de clientes.
* Consulta de transacciones.
* Creación de transferencias.

Los controladores utilizan anotaciones de Spring como `@RestController`, `@RequestMapping`, `@GetMapping` y `@PostMapping`.


## 5.7. Desarrollo del frontend

Una vez implementado el backend, se desarrolló la interfaz de usuario utilizando React.

Se crearon los componentes y vistas necesarios para permitir al usuario interactuar con las funcionalidades de la aplicación.

La interfaz permite realizar las operaciones requeridas por el laboratorio:

1. Crear clientes
2. Consultar los clientes registrados.
3. Realizar una transferencia entre cuentas.
4. Consultar el historial de transacciones.

El frontend utiliza Axios para enviar solicitudes HTTP al backend y procesar las respuestas obtenidas de los servicios REST.

## 5.8. Integración entre frontend y backend

La integración se realiza mediante solicitudes HTTP desde React hacia la API desarrollada en Spring Boot.

# 6. Conclusiones

El desarrollo de este laboratorio me permitió comprender de una manera más práctica cómo se estructura y desarrolla una aplicación web utilizando una arquitectura por capas. Más allá de implementar las funcionalidades solicitadas, pude entender la importancia de separar responsabilidades entre los controladores, servicios, repositorios y modelos, y cómo cada una de estas capas participa en el funcionamiento completo de la aplicación.

Uno de los principales aprendizajes fue reecontrarme con **Spring Boot** y comprender cómo este framework facilita la creación de APIs REST y la organización de un proyecto backend. También pude entender mejor el funcionamiento de **Spring Data JPA** y la forma en que permite trabajar con una base de datos utilizando entidades y repositorios, sin tener que realizar manualmente todas las operaciones SQL.

El laboratorio también me permitió comprender la importancia de separar los datos que maneja internamente la aplicación de los datos que se envían a través de la API. El uso de **DTOs y Mappers** me ayudó a entender cómo se pueden transferir datos entre las diferentes capas de una aplicación de una manera más organizada y controlada.

Otro aprendizaje importante fue entender cómo se realiza la comunicación entre un **frontend y un backend**. Al utilizar React y Axios pude observar de manera práctica cómo una acción realizada desde la interfaz genera una petición HTTP hacia el backend, cómo esta petición es procesada por las diferentes capas y cómo finalmente la respuesta es enviada nuevamente al frontend para ser mostrada al usuario.

Finalmente, este laboratorio me permitió relacionar diferentes tecnologías y conceptos. Al integrar **Java, Spring Boot, JPA, MySQL, React y Axios** pude comprender mejor cómo se construye una aplicación full stack y cómo interactúan sus diferentes componentes. En general, considero que el laboratorio fue una experiencia importante para fortalecer mis conocimientos de desarrollo de software y, especialmente, para comprender de manera práctica los conceptos de arquitectura de software vistos durante la asignatura.

# 7. Bibliografía

* Spring. **Spring Boot Documentation**. Disponible en: https://spring.io/projects/spring-boot

* Spring. **Spring Data JPA Documentation**. Disponible en: https://spring.io/projects/spring-data-jpa

* React. **React Documentation**. Disponible en: https://react.dev/

* Axios. **Axios Documentation**. Disponible en: https://axios-http.com/

* MySQL. **MySQL Documentation**. Disponible en: https://dev.mysql.com/doc/

* Apache Maven. **Maven Documentation**. Disponible en: https://maven.apache.org/guides/

* MapStruct. **MapStruct Documentation**. Disponible en: https://mapstruct.org/documentation/

* Oracle. **Java Documentation**. Disponible en: https://docs.oracle.com/en/java/

# 8. Proyecto anexo en GitHub

El código fuente completo del proyecto se encuentra disponible en el siguiente repositorio:

**GitHub:**
https://github.com/BryanMedrano/Lab1SpringBoot

> [!note]
> Este README fue elaborado con apoyo de herramientas de Inteligencia Artificial como asistente de redacción y estructuración.  
> Todo el trabajo ha sido validado y ajustado mediante intervención humana (Bryan Medrano) para asegurar su precisión técnica y coherencia. Aun así, es posible que existan errores o aspectos susceptibles de mejora.