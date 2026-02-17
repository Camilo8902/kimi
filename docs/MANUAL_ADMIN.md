# Manual de Usuario - Administrador
# MarketHub E-Commerce Platform

---

## Índice

1. [Introducción](#introducción)
2. [Panel de Administración](#panel-de-administración)
3. [Gestión de Usuarios](#gestión-de-usuarios)
4. [Gestión de Vendedores](#gestión-de-vendedores)
5. [Gestión de Productos](#gestión-de-productos)
6. [Gestión de Pedidos](#gestión-de-pedidos)
7. [Gestión de Categorías](#gestión-de-categorías)
8. [Cupones y Promociones](#cupones-y-promociones)
9. [Reportes y Análisis](#reportes-y-análisis)
10. [Configuración del Sistema](#configuración-del-sistema)
11. [Soporte y Moderación](#soporte-y-moderación)

---

## Introducción

Bienvenido al panel de administración de MarketHub. Como administrador, tienes acceso completo a todas las funcionalidades de la plataforma para gestionar usuarios, vendedores, productos y más.

### Niveles de Acceso

- **Super Admin:** Acceso total a todas las funciones
- **Admin:** Acceso a la mayoría de funciones administrativas
- **Soporte:** Acceso limitado a gestión de tickets y usuarios

---

## Panel de Administración

### Dashboard Principal

El panel muestra métricas clave:

- **Usuarios:** Total, nuevos hoy, activos
- **Vendedores:** Total, pendientes de aprobación, activos
- **Productos:** Total, activos, pendientes
- **Pedidos:** Total, hoy, pendientes
- **Ingresos:** Total, del mes, comisiones
- **Tickets de Soporte:** Abiertos, urgentes

### Widgets Personalizables

1. Arrastra widgets para reorganizar
2. Haz clic en configuración para personalizar
3. Selecciona métricas a mostrar
4. Define períodos de tiempo

### Notificaciones del Sistema

- Alertas de seguridad
- Nuevos registros de vendedores
- Pedidos con problemas
- Tickets urgentes
- Reportes de usuarios

---

## Gestión de Usuarios

### Lista de Usuarios

1. Ve a "Usuarios" > "Todos los Usuarios"
2. Filtra por:
   - Rol (cliente, vendedor, admin)
   - Estado (activo, inactivo, suspendido)
   - Fecha de registro
   - Última actividad

### Ver Detalle de Usuario

Haz clic en cualquier usuario para ver:
- Información personal
- Historial de pedidos
- Reseñas publicadas
- Tickets de soporte
- Actividad reciente

### Editar Usuario

1. Busca el usuario
2. Haz clic en "Editar"
3. Modifica:
   - Información personal
   - Rol de usuario
   - Estado de cuenta
   - Permisos especiales
4. Guarda cambios

### Suspender/Activar Usuario

1. Ve al perfil del usuario
2. Haz clic en "Suspender" o "Activar"
3. Proporciona motivo (obligatorio)
4. El usuario recibirá notificación

### Eliminar Usuario

⚠️ **Precaución:** Esta acción no se puede deshacer

1. Ve al perfil del usuario
2. Haz clic en "Eliminar"
3. Confirma la acción
4. Los datos se archivarán por 30 días

### Exportar Usuarios

1. Aplica filtros deseados
2. Haz clic en "Exportar"
3. Selecciona formato (CSV, Excel)
4. Descarga el archivo

---

## Gestión de Vendedores

### Aprobación de Vendedores

1. Ve a "Vendedores" > "Pendientes"
2. Revisa cada solicitud:
   - Documentos subidos
   - Información de la empresa
   - RFC válido
3. Acciones disponibles:
   - **Aprobar:** El vendedor puede comenzar
   - **Rechazar:** Con motivo específico
   - **Solicitar más info:** Envía mensaje

### Lista de Vendedores

Ve a "Vendedores" > "Todos" para:
- Ver todos los vendedores registrados
- Filtrar por estado (activo, suspendido, pendiente)
- Buscar por nombre o RFC
- Ver métricas de cada vendedor

### Métricas de Vendedor

Por cada vendedor puedes ver:
- Total de productos
- Ventas totales
- Ingresos generados
- Calificación promedio
- Tickets de soporte
- Estado de cumplimiento

### Suspender Vendedor

1. Ve al perfil del vendedor
2. Haz clic en "Suspender"
3. Selecciona motivo:
   - Violación de políticas
   - Productos prohibidos
   - Mal servicio al cliente
   - Fraude sospechado
4. Establece duración de suspensión
5. El vendedor recibirá notificación

### Comisiones por Vendedor

1. Ve a "Vendedores" > "Comisiones"
2. Visualiza:
   - Tasa actual de comisión
   - Historial de cambios
   - Comisiones cobradas
3. Ajusta tasa individual si es necesario

---

## Gestión de Productos

### Lista de Productos

Ve a "Productos" > "Todos" para:
- Ver todos los productos de la plataforma
- Filtrar por vendedor, categoría, estado
- Buscar por nombre, SKU o descripción
- Acciones masivas

### Aprobar/Rechazar Productos

1. Ve a "Productos" > "Pendientes"
2. Revisa cada producto:
   - Información completa
   - Imágenes apropiadas
   - Precio razonable
   - Categoría correcta
3. Acciones:
   - **Aprobar:** Producto visible
   - **Rechazar:** Con retroalimentación
   - **Solicitar cambios:** Mensaje al vendedor

### Editar Producto

1. Busca el producto
2. Haz clic en "Editar"
3. Modifica cualquier campo
4. Guarda cambios
5. El vendedor recibirá notificación

### Eliminar Producto

⚠️ **Precaución:** Use solo para productos prohibidos

1. Ve al producto
2. Haz clic en "Eliminar"
3. Selecciona motivo
4. Confirma acción
5. Notifica al vendedor

### Productos Reportados

1. Ve a "Productos" > "Reportados"
2. Revisa reportes de usuarios
3. Investiga cada caso
4. Toma acción:
   - Eliminar producto
   - Solicitar cambios al vendedor
   - Descartar reporte

---

## Gestión de Pedidos

### Dashboard de Pedidos

Ve a "Pedidos" para:
- Ver todos los pedidos de la plataforma
- Filtrar por estado, fecha, vendedor
- Buscar por número de pedido
- Ver estadísticas

### Detalle de Pedido

Haz clic en cualquier pedido para ver:
- Información completa
- Productos incluidos
- Historial de estados
- Información de envío
- Pagos realizados

### Modificar Pedido

1. Ve al detalle del pedido
2. Haz clic en "Editar"
3. Puedes modificar:
   - Estado del pedido
   - Dirección de envío
   - Notas internas
4. Guarda cambios

### Cancelar Pedido

1. Ve al pedido
2. Haz clic en "Cancelar"
3. Selecciona motivo
4. Procesa reembolso si aplica
5. Notifica a cliente y vendedor

### Reembolsos

1. Ve a "Pedidos" > "Reembolsos"
2. Procesa solicitudes pendientes
3. Verifica elegibilidad
4. Aprueba o rechaza con motivo
5. El reembolso se procesa automáticamente

---

## Gestión de Categorías

### Estructura de Categorías

1. Ve a "Categorías"
2. Visualiza árbol de categorías
3. Expande/contrae para navegar

### Crear Categoría

1. Haz clic en "Nueva Categoría"
2. Completa:
   - Nombre
   - Slug (URL amigable)
   - Descripción
   - Categoría padre (si aplica)
   - Imagen
3. Guarda

### Editar Categoría

1. Busca la categoría
2. Haz clic en "Editar"
3. Modifica campos
4. Guarda cambios

### Eliminar Categoría

⚠️ **Precaución:** Los productos perderán esta categoría

1. Ve a la categoría
2. Haz clic en "Eliminar"
3. Confirma acción
4. Los productos se moverán a "Sin categoría"

### Reorganizar Categorías

- Arrastra y suelta para cambiar orden
- Mueve categorías entre padres
- Actualiza automáticamente

---

## Cupones y Promociones

### Crear Cupón

1. Ve a "Marketing" > "Cupones"
2. Haz clic en "Nuevo Cupón"
3. Configura:
   - Código
   - Tipo de descuento (% o fijo)
   - Valor del descuento
   - Monto mínimo de compra
   - Límite de uso
   - Fechas de validez
   - Productos/categorías aplicables
4. Guarda

### Gestionar Cupones

- Activa/desactiva cupones
- Edita configuración
- Visualiza uso
- Elimina cupones expirados

### Promociones Especiales

1. Ve a "Marketing" > "Promociones"
2. Crea promociones por:
   - Categoría
   - Vendedor
   - Temporada
   - Evento especial
3. Define duración y condiciones

---

## Reportes y Análisis

### Reportes Disponibles

1. **Ventas**
   - Por período
   - Por vendedor
   - Por categoría
   - Por producto

2. **Usuarios**
   - Registros nuevos
   - Usuarios activos
   - Retención
   - Geografía

3. **Financiero**
   - Ingresos totales
   - Comisiones
   - Reembolsos
   - Ganancias

4. **Operativo**
   - Pedidos procesados
   - Tiempos de envío
   - Satisfacción del cliente
   - Tickets resueltos

### Generar Reporte

1. Selecciona tipo de reporte
2. Define período
3. Aplica filtros
4. Genera reporte
5. Exporta (PDF, Excel, CSV)

### Dashboard Personalizado

1. Ve a "Análisis" > "Dashboard"
2. Personaliza widgets
3. Guarda configuración
4. Programa envío por correo

---

## Configuración del Sistema

### Configuración General

1. Ve a "Configuración" > "General"
2. Edita:
   - Nombre de la plataforma
   - Logo
   - Información de contacto
   - Redes sociales

### Configuración de Pagos

1. Ve a "Configuración" > "Pagos"
2. Configura:
   - Métodos de pago aceptados
   - Comisiones por categoría
   - Tasa de cambio
   - Impuestos

### Configuración de Envíos

1. Ve a "Configuración" > "Envíos"
2. Define:
   - Métodos de envío
   - Costos por zona
   - Tiempos estimados
   - Proveedores logísticos

### Configuración de Notificaciones

1. Ve a "Configuración" > "Notificaciones"
2. Configura:
   - Plantillas de correo
   - Notificaciones push
   - SMS
   - Alertas del sistema

### Políticas de la Plataforma

1. Ve a "Configuración" > "Políticas"
2. Edita:
   - Términos y condiciones
   - Política de privacidad
   - Política de devoluciones
   - Política de envíos

---

## Soporte y Moderación

### Tickets de Soporte

1. Ve a "Soporte" > "Tickets"
2. Visualiza tickets:
   - Nuevos
   - Abiertos
   - En espera
   - Resueltos
3. Asigna a agentes
4. Establece prioridad

### Responder Ticket

1. Abre el ticket
2. Lee historial completo
3. Responde al usuario
4. Si resuelto, marca como cerrado
5. El usuario recibirá notificación

### Moderación de Contenido

1. Ve a "Moderación"
2. Revisa:
   - Reseñas reportadas
   - Productos reportados
   - Mensajes de usuarios
3. Toma acción apropiada

### Reportes de Usuarios

1. Ve a "Moderación" > "Reportes"
2. Investiga cada reporte
3. Contacta a partes involucradas
4. Resuelve según políticas

---

## Herramientas Avanzadas

### Logs del Sistema

1. Ve a "Herramientas" > "Logs"
2. Visualiza:
   - Actividad de usuarios
   - Errores del sistema
   - Cambios importantes
3. Filtra por fecha, usuario, tipo

### Backup y Restauración

1. Ve a "Herramientas" > "Backup"
2. Programa backups automáticos
3. Descarga backups manuales
4. Restaura desde backup si es necesario

### Mantenimiento

1. Ve a "Herramientas" > "Mantenimiento"
2. Limpia caché
3. Optimiza base de datos
4. Verifica integridad

---

## Seguridad

### Auditoría de Seguridad

1. Ve a "Seguridad" > "Auditoría"
2. Revisa:
   - Inicios de sesión
   - Cambios de permisos
   - Accesos sospechosos
3. Investiga anomalías

### Gestión de Permisos

1. Ve a "Seguridad" > "Permisos"
2. Define roles:
   - Super Admin
   - Admin
   - Soporte
3. Asigna permisos específicos

### Sesiones Activas

1. Ve a "Seguridad" > "Sesiones"
2. Visualiza sesiones activas
3. Cierra sesiones sospechosas
4. Forzar cierre de sesión

---

## Contacto y Soporte

Para soporte administrativo:

- **Email:** admin-support@markethub.com
- **Teléfono:** +1 (555) 123-4567 ext. 1
- **Horario:** 24/7 para emergencias

---

© 2024 MarketHub. Todos los derechos reservados.
