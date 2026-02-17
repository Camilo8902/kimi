# Documentación Técnica
# MarketHub E-Commerce Platform

---

## Índice

1. [Arquitectura del Sistema](#arquitectura-del-sistema)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Base de Datos](#base-de-datos)
5. [API y Endpoints](#api-y-endpoints)
6. [Autenticación y Autorización](#autenticación-y-autorización)
7. [Optimización de Rendimiento](#optimización-de-rendimiento)
8. [Seguridad](#seguridad)
9. [Despliegue](#despliegue)
10. [Mantenimiento](#mantenimiento)

---

## Arquitectura del Sistema

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Web App   │  │  Mobile App │  │    PWA      │         │
│  │   (React)   │  │  (Futuro)   │  │             │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
└─────────┼────────────────┼────────────────┼────────────────┘
          │                │                │
          └────────────────┴────────────────┘
                           │
                    ┌──────┴──────┐
                    │   Vercel    │
                    │   (Edge)    │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────┴─────┐   ┌──────┴──────┐  ┌─────┴─────┐
    │  Supabase │   │   Stripe    │  │  Cloudinary│
    │  (Auth +  │   │  (Pagos)    │  │  (Imágenes)│
    │   DB)     │   │             │  │            │
    └───────────┘   └─────────────┘  └────────────┘
```

### Componentes Principales

1. **Frontend (React + Vite)**
   - SPA moderna con React 18
   - Routing con React Router v6
   - Estado global con Zustand
   - UI con Tailwind CSS + shadcn/ui

2. **Backend (Supabase)**
   - PostgreSQL como base de datos
   - Auth integrado con múltiples proveedores
   - Real-time subscriptions
   - Storage para archivos
   - Edge Functions (serverless)

3. **Servicios Externos**
   - Stripe: Procesamiento de pagos
   - Cloudinary: Gestión de imágenes
   - SendGrid: Envío de correos

---

## Stack Tecnológico

### Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18.x | Framework UI |
| TypeScript | 5.x | Tipado estático |
| Vite | 5.x | Build tool |
| React Router | 6.x | Routing |
| Zustand | 4.x | State management |
| Tailwind CSS | 3.x | Estilos |
| shadcn/ui | latest | Componentes UI |
| Framer Motion | 11.x | Animaciones |
| GSAP | 3.x | Animaciones avanzadas |
| Recharts | 2.x | Gráficos |
| Lucide React | latest | Iconos |

### Backend

| Tecnología | Propósito |
|------------|-----------|
| Supabase | BaaS completo |
| PostgreSQL | Base de datos |
| PostgREST | API REST automática |
| Realtime | WebSockets |
| Storage | Almacenamiento de archivos |

### Herramientas

| Herramienta | Propósito |
|-------------|-----------|
| ESLint | Linting |
| Prettier | Formateo |
| Vitest | Testing |
| Playwright | E2E testing |
| Husky | Git hooks |

---

## Estructura del Proyecto

```
markethub/
├── public/                  # Archivos estáticos
├── src/
│   ├── components/          # Componentes React
│   │   ├── layout/          # Layouts (Navbar, Footer)
│   │   ├── ui/              # Componentes UI reutilizables
│   │   └── home/            # Componentes específicos de Home
│   ├── pages/               # Páginas de la aplicación
│   │   ├── admin/           # Panel de administración
│   │   ├── seller/          # Panel de vendedores
│   │   └── *.tsx            # Páginas públicas
│   ├── stores/              # Stores de Zustand
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilidades y helpers
│   ├── types/               # Definiciones de TypeScript
│   └── styles/              # Estilos globales
├── supabase/                # Configuración de Supabase
│   └── schema.sql           # Esquema de base de datos
├── docs/                    # Documentación
├── tests/                   # Tests
└── package.json
```

### Convenciones de Nomenclatura

- **Componentes:** PascalCase (ej: `ProductCard.tsx`)
- **Hooks:** camelCase con prefijo `use` (ej: `useAuth.ts`)
- **Stores:** camelCase con sufijo `Store` (ej: `authStore.ts`)
- **Utilidades:** camelCase (ej: `formatPrice.ts`)
- **Tipos:** PascalCase (ej: `Product.ts`)

---

## Base de Datos

### Diagrama ER

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    users    │────<│   orders    │>────│ order_items │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       │            ┌──────┴──────┐
       │            │   companies  │
       │            └──────┬──────┘
       │                   │
       │            ┌──────┴──────┐
       └───────────>│   products   │<────┐
                    └─────────────┘     │
                           │            │
                    ┌──────┴──────┐     │
                    │   reviews    │─────┘
                    └─────────────┘
```

### Tablas Principales

| Tabla | Descripción |
|-------|-------------|
| `users` | Información de usuarios |
| `companies` | Empresas/vendedores |
| `products` | Catálogo de productos |
| `categories` | Categorías de productos |
| `orders` | Pedidos de clientes |
| `order_items` | Items de cada pedido |
| `reviews` | Reseñas de productos |
| `addresses` | Direcciones de usuarios |
| `cart_items` | Items en carrito |
| `wishlists` | Lista de deseos |
| `coupons` | Cupones de descuento |
| `notifications` | Notificaciones de usuarios |

### Políticas RLS

Todas las tablas tienen Row Level Security habilitado:

```sql
-- Ejemplo: Usuarios solo pueden ver su propio perfil
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);
```

---

## API y Endpoints

### Endpoints de Supabase (Auto-generados)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/rest/v1/products` | Listar productos |
| GET | `/rest/v1/products?id=eq.{id}` | Obtener producto |
| POST | `/rest/v1/products` | Crear producto |
| PATCH | `/rest/v1/products?id=eq.{id}` | Actualizar producto |
| DELETE | `/rest/v1/products?id=eq.{id}` | Eliminar producto |

### Funciones RPC

```sql
-- Generar número de orden
SELECT generate_order_number();

-- Actualizar rating de producto
SELECT update_product_rating(product_id);
```

### Suscripciones Real-time

```typescript
// Suscribirse a cambios en pedidos
supabase
  .channel('orders')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, callback)
  .subscribe();
```

---

## Autenticación y Autorización

### Flujo de Autenticación

```
Usuario ──> Login ──> Supabase Auth ──> JWT Token
                              │
                              v
                        Validación RLS
                              │
                              v
                        Acceso a datos
```

### Roles de Usuario

| Rol | Permisos |
|-----|----------|
| `customer` | Comprar, reseñar, gestionar perfil |
| `company_admin` | Gestionar empresa, productos, pedidos |
| `product_manager` | Gestionar productos |
| `inventory_manager` | Gestionar inventario |
| `support_agent` | Soporte al cliente |
| `super_admin` | Acceso total |

### Implementación en Frontend

```typescript
// Protected Route
function ProtectedRoute({ children, requiredRoles }) {
  const { isAuthenticated, hasRole } = useAuthStore();
  
  if (!isAuthenticated()) return <Navigate to="/login" />;
  if (requiredRoles && !hasRole(requiredRoles)) return <Navigate to="/" />;
  
  return children;
}
```

---

## Optimización de Rendimiento

### Lazy Loading

```typescript
// Code splitting por rutas
const SellerProducts = lazy(() => import('@/pages/seller/Products'));
```

### Intersection Observer

```typescript
// Lazy loading de imágenes
const { ref, inView } = useInView({ triggerOnce: true });
<img ref={ref} src={inView ? src : placeholder} />
```

### Memoización

```typescript
// useMemo para cálculos costosos
const filteredProducts = useMemo(() => 
  products.filter(p => p.price < maxPrice),
  [products, maxPrice]
);
```

### Virtualización

Para listas grandes, usar react-window o similar.

### Caché

```typescript
// Zustand con persistencia
const useStore = create(persist(store, { name: 'cart-storage' }));
```

---

## Seguridad

### Medidas Implementadas

1. **Autenticación**
   - JWT tokens con expiración
   - Refresh tokens
   - MFA (próximamente)

2. **Autorización**
   - RLS en todas las tablas
   - Roles granulares
   - Permisos por recurso

3. **Datos**
   - Encriptación en tránsito (HTTPS)
   - Encriptación en reposo
   - Sanitización de inputs

4. **API**
   - Rate limiting
   - CORS configurado
   - Validación de datos

### Headers de Seguridad

```javascript
// vite.config.ts
headers: {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
}
```

---

## Despliegue

### Configuración de Vercel

```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}
```

### Variables de Entorno

```bash
# .env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

### Pipeline de CI/CD

1. Push a main
2. GitHub Actions ejecuta tests
3. Build en Vercel
4. Despliegue automático

---

## Mantenimiento

### Monitoreo

- **Vercel Analytics:** Performance
- **Supabase Dashboard:** Base de datos
- **Sentry:** Errores (próximamente)

### Backups

```sql
-- Backup automático diario en Supabase
-- Punto de recuperación de 7 días
```

### Actualizaciones

```bash
# Actualizar dependencias
npm update

# Verificar vulnerabilidades
npm audit

# Actualizar seguridad
npm audit fix
```

### Logs

```typescript
// Logging estructurado
logger.info('User action', { userId, action, metadata });
logger.error('Error occurred', error);
```

---

## Guía de Contribución

### Setup Local

```bash
# Clonar repositorio
git clone https://github.com/your-org/markethub.git
cd markethub

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

### Convenciones de Código

- Usar TypeScript estricto
- Seguir guía de estilo ESLint
- Escribir tests para nuevas features
- Documentar funciones complejas

### Proceso de PR

1. Crear rama desde `main`
2. Desarrollar feature
3. Ejecutar tests: `npm test`
4. Crear PR con descripción clara
5. Revisión de código obligatoria
6. Merge después de aprobación

---

## Recursos Adicionales

- [Documentación de React](https://react.dev)
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Tailwind](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

---

## Contacto del Equipo de Desarrollo

- **Email:** dev@markethub.com
- **Slack:** #markethub-dev

---

© 2024 MarketHub. Todos los derechos reservados.
