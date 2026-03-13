# 🎭 Atuendos App - Sistema de Alquiler de Prendas

## 📋 Descripción del Proyecto

Aplicación web desarrollada con React para la gestión integral de un negocio de alquiler de atuendos. El sistema permite administrar clientes, empleados, prendas y el flujo completo del proceso de alquiler, desde el registro inicial hasta la devolución y gestión de lavandería.

## ✨ Características Principales

### 🎯 Módulos del Sistema

#### **Gestión de Registros**
* **Clientes**: Registro y administración de clientes
* **Empleados**: Gestión del personal
* **Prendas**: Control de inventario de atuendos

#### **Proceso de Alquiler**
* Registro de nuevos alquileres seleccionando:
  * Cliente
  * Empleado responsable
  * Prenda a alquilar
  * Fecha de alquiler
* Visualización de alquileres activos
* Seguimiento de estado de las prendas

#### **Devoluciones**
* Transferencia de alquileres activos a terminados
* Registro de fecha de devolución
* Actualización automática del estado de la prenda a "sucio"

#### **Gestión de Lavandería**
* Visualización de prendas pendientes de lavado
* Asignación de prioridad a prendas
* Registro de envío a lavandería
* Control de retorno de prendas (disponibles nuevamente)

#### **Panel de Control**
  * Total de prendas
  * Total de empleados
  * Total de clientes
  * Alquileres activos
  * Prendas en lavandería

## 🚀 Flujo de Trabajo

1. **Registro Inicial** → Ingreso de clientes, empleados y prendas
2. **Alquiler** → Selección de cliente, empleado, prenda y fecha
3. **Prenda Ocupada** → Cambio automático de estado en inventario
4. **Devolución** → Registro de fecha y paso a "sucio"
5. **Lavandería** → Gestión de limpieza y prioridades
6. **Disponible** → Retorno al inventario disponible

## 💻 Tecnologías Utilizadas

* **React** - Framework frontend
* **React Hooks** - Gestión de estado
* **CSS Modules** - Estilizado de componentes
* **LocalStorage** - Persistencia de datos (cache)

## 🎨 Estructura de Estados de Prendas

* `Disponible` - Lista para alquilar
* `Ocupada` - Actualmente alquilada
* `Sucio` - Pendiente de lavado
* `Lavandería` - En proceso de limpieza
* `Lavandería (Prioridad)` - En lavandería con prioridad

## 🔄 Estado del Proyecto

✅ **Frontend**: Completamente funcional  
⚠️ **Backend**: Pendiente de implementación (Planificado con Spring Boot y H2)

### Próximos Pasos
- [ ] Implementación de API REST con Spring Boot
- [ ] Integración con base de datos H2
- [ ] Sistema de autenticación
- [ ] Reportes y estadísticas avanzadas

## 💾 Persistencia de Datos

Actualmente, la aplicación utiliza el almacenamiento en caché del navegador (LocalStorage) para mantener los datos, permitiendo una experiencia de usuario completa mientras se desarrolla el backend.

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/sistemaDeAlquiler-React.git

# Entrar al directorio
cd frontend-react

# Instalar dependencias
npm install

# Iniciar la aplicación
npm start
```

## 🖥️ Uso

1. Registra clientes, empleados y prendas en sus respectivas secciones
2. Ve a la pestaña "Alquiler" para crear nuevos alquileres
3. Monitorea los alquileres activos en la tabla correspondiente
4. Gestiona devoluciones y envía prendas a lavandería
5. Utiliza el panel de control para visualizar estadísticas


## 📝 Notas Adicionales

* La aplicación está diseñada para ser intuitiva y fácil de usar
* Los cambios de estado son automáticos según el flujo del proceso
* Se mantiene un registro histórico de alquileres terminados
* El sistema de prioridades optimiza el proceso de lavandería
