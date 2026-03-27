# 🎭 Atuendos App - Sistema de Alquiler de Prendas

## 📋 Descripción del Proyecto

Aplicación web fullstack para la gestión integral de un negocio de alquiler de atuendos. Desarrollada con **React** en el frontend y **Spring Boot** en el backend, con persistencia real en base de datos H2. El sistema implementa patrones de diseño y de comportamiento para garantizar una arquitectura limpia, escalable y mantenible.

---

## 🏗️ Arquitectura

```
LosAtuendosApp/
├── frontend-react/        → React + Material UI
└── backend-springboot/    → Spring Boot + JPA + H2
```

### Patrones de Diseño implementados

| Patrón | Tipo | Ubicación |
|---|---|---|
| Factory Method | Creacional | `AlquilerFactory`, `PrendaFactory` |
| Singleton | Creacional | `ContadorAlquilerSingleton` |
| Composite | Estructural | `GrupoPrendas`, `PrendaHoja`, `ComponenteInventario` |
| Adapter | Estructural | `ClienteAdapter`, `ClienteExternoDto` |
| Decorator | Estructural | `LoggingAlquilerDecorator`, `AlquilerServiceI` |
| Observer | Comportamiento | `GestorEventosPrenda`, `NotificadorCliente`, `NotificadorEmpleado` |
| Strategy | Comportamiento | `ContextoPago`, `PagoEfectivo`, `PagoTarjeta`, `PagoTransferencia` |
| Command | Comportamiento | `GestorComandos`, `CrearAlquilerComando`, `TerminarAlquilerComando`, `CancelarAlquilerComando` |
| Iterator | Comportamiento | `IteradorPrendas`, `ColeccionPrendas` |

---

## ✨ Módulos del Sistema

### 👥 Gestión de Registros
- **Clientes** — Registro, búsqueda y consulta de historial de alquileres por cliente
- **Empleados** — Gestión del personal responsable de cada alquiler
- **Prendas** — Control de inventario con seguimiento de estado en tiempo real

### 🛍️ Proceso de Alquiler
- Registro de alquileres seleccionando cliente, empleado, prendas y fecha
- Selección de método de pago (efectivo, tarjeta, transferencia) — patrón **Strategy**
- Visualización de alquileres activos y terminados
- Cancelación de alquileres activos

### 📦 Devoluciones
- Marcado de alquileres como devueltos
- Registro automático de fecha de devolución
- Cambio de estado de prendas a "sucia" al devolver

### 🧺 Gestión de Lavandería
- Envío de prendas sucias a lavandería con o sin prioridad
- Visualización de prendas en proceso de lavado
- Retorno de prendas lavadas al inventario como "disponible"

### 📊 Panel de Control
- Total de clientes, empleados y prendas registradas
- Alquileres activos en curso
- Prendas actualmente en lavandería

---

## 🎨 Estados de Prendas

| Estado | Descripción |
|---|---|
| `disponible` | Lista para alquilar |
| `ocupada` | Actualmente alquilada |
| `sucia` | Pendiente de lavado tras devolución |
| `lavanderia` | En proceso de limpieza |
| `lavanderia(prioridad)` | En lavandería con prioridad |

---

## 🚀 Instalación y ejecución

### Requisitos previos
- **Java 21+**
- **Node.js 18+**
- **Maven** (o usar el wrapper `mvnw` incluido)

### 1. Clonar el repositorio

```bash
git clone https://github.com/JCSCJ/sistemaDeAlquiler-React.git
cd LosAtuendosApp
```

### 2. Iniciar el Backend

```bash
cd backend-springboot

# Linux / Mac
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

El backend quedará disponible en `http://localhost:8080`

La consola H2 para inspeccionar la base de datos estará en:
```
http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:testdb
User: sa
Password: (vacío)
```

### 3. Iniciar el Frontend

En otra terminal:

```bash
cd frontend-react
npm install      # solo la primera vez
npm start
```

La aplicación quedará disponible en `http://localhost:3000`

> ⚠️ El backend debe estar corriendo antes de usar el frontend.

---

## 🔌 Endpoints del Backend

| Método | URL | Descripción |
|---|---|---|
| GET | `/clientes` | Listar clientes |
| POST | `/clientes` | Registrar cliente |
| GET | `/empleados` | Listar empleados |
| POST | `/empleados` | Registrar empleado |
| GET | `/prendas` | Listar prendas |
| POST | `/prendas` | Registrar prenda |
| PATCH | `/prendas/{id}/estado` | Cambiar estado de prenda |
| GET | `/prendas/talla/{talla}` | Filtrar por talla |
| GET | `/alquileres/activos` | Alquileres en curso |
| GET | `/alquileres/terminados` | Alquileres finalizados |
| GET | `/alquileres/cliente/{id}` | Alquileres por cliente |
| POST | `/alquileres` | Registrar alquiler |
| PUT | `/alquileres/{id}/terminar` | Devolver prendas y cerrar alquiler |
| PUT | `/alquileres/{id}/cancelar` | Cancelar alquiler |
| GET | `/alquileres/historial` | Historial de comandos ejecutados |
| GET | `/lavanderia` | Prendas en lavandería |
| POST | `/lavanderia` | Enviar prenda a lavandería |
| DELETE | `/lavanderia/{id}` | Marcar prenda como lavada |

---

## 🔄 Flujo de Trabajo

1. **Registro** → Ingresar clientes, empleados y prendas
2. **Alquiler** → Seleccionar cliente, empleado, prendas, fecha y método de pago
3. **Prenda ocupada** → Estado actualizado automáticamente en inventario
4. **Devolución** → Registro de fecha y cambio a estado "sucia"
5. **Lavandería** → Gestión de limpieza con prioridades
6. **Disponible** → Retorno automático al inventario

---

## 💻 Tecnologías

### Frontend
- **React 18** — Framework UI
- **Material UI (MUI)** — Componentes de interfaz
- **React Router** — Navegación entre páginas
- **Fetch API** — Comunicación con el backend

### Backend
- **Spring Boot 3** — Framework principal
- **Spring Data JPA** — Persistencia y repositorios
- **H2 Database** — Base de datos en memoria
- **Lombok** — Reducción de código boilerplate
- **Hibernate** — ORM para mapeo de entidades

---

## 📝 Notas

- Los datos persisten mientras el backend esté corriendo. Al reiniciarlo la base de datos H2 se reinicia (es en memoria).
- El historial de comandos (`GET /alquileres/historial`) también se reinicia con cada arranque del backend.
- Cada cambio de estado de una prenda genera una notificación en los logs del backend (patrón Observer).
- Si se desea persistencia permanente, se puede cambiar H2 por MySQL o PostgreSQL en `application.properties`.
