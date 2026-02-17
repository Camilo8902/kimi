# Plan de Desarrollo por Fases - MarketHub

## Estado Actual
- ✅ Autenticación con Supabase
- ✅ Registro/Login con verificación de email
- ✅ Dashboard de Admin (básico)
- ❌ Módulos del sidebar no funcionan (falta desarrollo)

---

## Resumen: Lo que Falta Desarrollar

### Panel Admin
| Módulo | Estado | Prioridad |
|--------|--------|-----------|
| Pedidos | ❌ No existe | Alta |
| Productos | ❌ No existe | Alta |
| Empresas/Vendedores | ❌ No existe | Alta |
| Usuarios | ❌ No existe | Alta |
| Reportes | ❌ No existe | Media |
| Configuración | ❌ No existe | Baja |

### Panel Vendedor
- ❌ Dashboard de vendedor
- ❌ Gestión de productos
- ❌ Gestión de pedidos
- ❌ Análisis y reportes

### Cliente
- ❌ Checkout completo
- ❌ Seguimiento de pedidos
- ❌ Reseñas de productos

---

## Fase 1: Autenticación y Acceso (COMPLETADO ✅)
- [x] Login con Supabase Auth
- [x] Registro con verificación de email
- [x] Página de verificación de email
- [x] Página de bienvenida tras confirmación
- [x] Acceso como super_admin

---

## Fase 2: Módulos del Panel Admin (PRIORIDAD ALTA)

### 2.1 Gestión de Pedidos
- [ ] Crear página `src/pages/admin/Orders.tsx`
- [ ] Agregar ruta `/admin/orders` en App.tsx
- [ ] Listar todos los pedidos de la plataforma
- [ ] Filtros por estado, fecha, vendedor
- [ ] Ver detalle de pedido
- [ ] Cambiar estado de pedido
- [ ] Cancelar pedido y procesar reembolso

### 2.2 Gestión de Productos
- [ ] Crear página `src/pages/admin/Products.tsx`
- [ ] Agregar ruta `/admin/products` en App.tsx
- [ ] Listar todos los productos de la plataforma
- [ ] Filtros por vendedor, categoría, estado
- [ ] Aprobar/Rechazar productos pendientes
- [ ] Editar/Eliminar productos
- [ ] Productos reportados

### 2.3 Gestión de Empresas/Vendedores
- [ ] Crear página `src/pages/admin/Companies.tsx`
- [ ] Agregar ruta `/admin/companies` en App.tsx
- [ ] Lista de vendedores con métricas
- [ ] Aprobar/Rechazar solicitudes de vendedores
- [ ] Suspender/Activar vendedores
- [ ] Configurar comisiones por vendedor

### 2.4 Gestión de Usuarios
- [ ] Crear página `src/pages/admin/Users.tsx`
- [ ] Agregar ruta `/admin/users` en App.tsx
- [ ] Lista de usuarios con filtros
- [ ] Ver detalle de usuario
- [ ] Editar rol de usuario
- [ ] Suspender/Activar usuario

### 2.5 Reportes y Análisis
- [ ] Crear página `src/pages/admin/Reports.tsx`
- [ ] Agregar ruta `/admin/reports` en App.tsx
- [ ] Dashboard de métricas
- [ ] Reportes de ventas
- [ ] Reportes de usuarios
- [ ] Reportes financieros

### 2.6 Configuración
- [ ] Crear página `src/pages/admin/Settings.tsx`
- [ ] Agregar ruta `/admin/settings` en App.tsx
- [ ] Configuración general
- [ ] Configuración de pagos
- [ ] Configuración de envíos
- [ ] Políticas de la plataforma

---

## Fase 3: Panel de Vendedor

### 3.1 Registro de Vendedor
- [ ] Página de solicitud para ser vendedor
- [ ] Formulario con datos de empresa
- [ ] Flujo de aprobación por admin

### 3.2 Dashboard de Vendedor
- [ ] Crear página `src/pages/seller/Dashboard.tsx` (ya existe)
- [ ] Métricas de ventas
- [ ] Pedidos pendientes
- [ ] Productos con bajo stock

### 3.3 Gestión de Productos (Vendedor)
- [ ] Crear/Editar/Eliminar productos
- [ ] Variantes de producto
- [ ] Importación masiva (CSV)
- [ ] Optimización de productos

### 3.4 Gestión de Pedidos (Vendedor)
- [ ] Ver pedidos de mi empresa
- [ ] Procesar pedido
- [ ] Actualizar estado de envío
- [ ] Comunicarse con cliente

### 3.5 Análisis (Vendedor)
- [ ] Ventas por período
- [ ] Productos más vendidos
- [ ] Clientes

### 3.6 Configuración (Vendedor)
- [ ] Información de la tienda
- [ ] Políticas
- [ ] Métodos de envío

---

## Fase 4: Funcionalidades de Cliente

### 4.1 Carrito de Compras
- [ ] Agregar productos al carrito
- [ ] Modificar cantidades
- [ ] Aplicar cupones
- [ ] Guardar para después

### 4.2 Proceso de Checkout
- [ ] Seleccionar dirección
- [ ] Método de envío
- [ ] Método de pago (Stripe)
- [ ] Confirmar pedido

### 4.3 Gestión de Pedidos (Cliente)
- [ ] Ver historial de pedidos
- [ ] Seguimiento de envío
- [ ] Cancelar pedido
- [ ] Solicitar devolución

### 4.4 Reseñas
- [ ] Escribir reseña
- [ ] Ver reseñas de productos
- [ ] Responder reseñas

### 4.5 Lista de Deseos
- [ ] Agregar a favoritos
- [ ] Ver lista de deseos
- [ ] Notificaciones de precio

---

## Fase 5: Pagos y Sistema Financiero

### 5.1 Integración con Stripe
- [ ] Configurar Stripe
- [ ] Procesar pagos con tarjeta
- [ ] Webhooks para confirmar pagos
- [ ] Reembolsos

### 5.2 Comisiones
- [ ] Sistema de comisiones por venta
- [ ] Comisiones por categoría
- [ ] Historial de comisiones

### 5.3 Retiros (Vendedor)
- [ ] Solicitar retiro
- [ ] Procesar retiro
- [ ] Historial de transacciones

### 5.4 Facturación
- [ ] Generar facturas
- [ ] Descargar facturas

---

## Fase 6: Funciones Avanzadas

### 6.1 Notificaciones
- [ ] Notificaciones en tiempo real
- [ ] Notificaciones por email
- [ ] Centro de notificaciones

### 6.2 Chat/Soporte
- [ ] Sistema de tickets
- [ ] Chat en vivo (opcional)
- [ ] FAQ dinámico

### 6.3 Marketing
- [ ] Cupones de descuento
- [ ] Promociones
- [ ] Newsletter

### 6.4 Búsqueda y SEO
- [ ] Búsqueda avanzada
- [ ] Filtros
- [ ] SEO de productos

### 6.5 Optimización
- [ ] Lazy loading de imágenes
- [ ] Caché
- [ ] Performance

---

## Archivos a Crear (Fase 2 - Admin)

```
src/pages/admin/
├── Orders.tsx        # Gestión de pedidos
├── Products.tsx      # Gestión de productos  
├── Companies.tsx     # Gestión de empresas
├── Users.tsx        # Gestión de usuarios
├── Reports.tsx      # Reportes y análisis
└── Settings.tsx     # Configuración
```

---

## Notas Técnicas

### Rutas a agregar en App.tsx
```tsx
// Admin
<Route path="/admin/orders" element={<AdminOrders />} />
<Route path="/admin/products" element={<AdminProducts />} />
<Route path="/admin/companies" element={<AdminCompanies />} />
<Route path="/admin/users" element={<AdminUsers />} />
<Route path="/admin/reports" element={<AdminReports />} />
<Route path="/admin/settings" element={<AdminSettings />} />
```

### Permisos requeridos
- super_admin: Acceso total
- company_admin: Solo datos de su empresa
- product_manager: Solo productos
- inventory_manager: Solo inventario

---

*Plan creado: 2026-02-17*
*Actualizado para: MarketHub E-Commerce Platform*
