# MarketHub

![MarketHub Logo](https://via.placeholder.com/150x150/7c3aed/ffffff?text=MH)

## Plataforma de E-Commerce Empresarial Escalable

MarketHub es una plataforma de comercio electrónico completa tipo marketplace que conecta compradores con vendedores verificados. Diseñada con arquitectura moderna y escalable, ofrece una experiencia de compra excepcional con características avanzadas para todos los usuarios.

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-2.39.0-3ECF8E?logo=supabase)](https://supabase.com)

---

## 🚀 Características Principales

### Para Compradores
- ✅ Catálogo de productos con filtros avanzados
- ✅ Carrito de compras persistente
- ✅ Proceso de checkout seguro
- ✅ Múltiples métodos de pago
- ✅ Seguimiento de pedidos en tiempo real
- ✅ Lista de deseos
- ✅ Sistema de reseñas y calificaciones
- ✅ Notificaciones push

### Para Vendedores
- ✅ Panel de control completo
- ✅ Gestión de productos e inventario
- ✅ Procesamiento de pedidos
- ✅ Análisis de ventas y reportes
- ✅ Gestión de comisiones
- ✅ Herramientas de marketing

### Para Administradores
- ✅ Panel de administración centralizado
- ✅ Gestión de usuarios y vendedores
- ✅ Moderación de contenido
- ✅ Configuración de la plataforma
- ✅ Reportes financieros detallados

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Framework UI moderno
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Framework de estilos
- **shadcn/ui** - Componentes UI accesibles
- **Zustand** - Gestión de estado
- **React Router v6** - Enrutamiento
- **Framer Motion** - Animaciones
- **GSAP** - Animaciones avanzadas

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL - Base de datos
  - Auth - Autenticación
  - Realtime - Suscripciones en tiempo real
  - Storage - Almacenamiento de archivos
  - Edge Functions - Serverless

### Servicios Externos
- **Stripe** - Procesamiento de pagos
- **Cloudinary** - Gestión de imágenes
- **SendGrid** - Envío de correos

---

## 📁 Estructura del Proyecto

```
markethub/
├── public/                  # Archivos estáticos
├── src/
│   ├── components/          # Componentes React
│   │   ├── layout/          # Layouts (Navbar, Footer)
│   │   ├── ui/              # Componentes UI (shadcn)
│   │   └── home/            # Componentes de Home
│   ├── pages/               # Páginas de la aplicación
│   │   ├── admin/           # Panel de administración
│   │   ├── seller/          # Panel de vendedores
│   │   └── *.tsx            # Páginas públicas
│   ├── stores/              # Stores de Zustand
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilidades
│   ├── types/               # Tipos TypeScript
│   └── styles/              # Estilos globales
├── supabase/
│   └── schema.sql           # Esquema de base de datos
├── docs/                    # Documentación
│   ├── MANUAL_CLIENTE.md
│   ├── MANUAL_VENDEDOR.md
│   ├── MANUAL_ADMIN.md
│   └── DOCUMENTACION_TECNICA.md
└── package.json
```

---

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Cuenta en Supabase
- Cuenta en Stripe (opcional)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/your-org/markethub.git
cd markethub
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

4. **Configurar base de datos**
- Ve a tu proyecto de Supabase
- Abre SQL Editor
- Ejecuta el contenido de `supabase/schema.sql`

5. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

6. **Abrir en navegador**
```
http://localhost:5173
```

---

## 📚 Documentación

- [Manual del Cliente](docs/MANUAL_CLIENTE.md) - Guía para compradores
- [Manual del Vendedor](docs/MANUAL_VENDEDOR.md) - Guía para vendedores
- [Manual del Administrador](docs/MANUAL_ADMIN.md) - Guía para admins
- [Documentación Técnica](docs/DOCUMENTACION_TECNICA.md) - Documentación dev

---

## 🎯 Funcionalidades

### Páginas Públicas
| Página | Descripción |
|--------|-------------|
| `/` | Página de inicio con hero, categorías, productos destacados |
| `/products` | Catálogo de productos con filtros |
| `/product/:slug` | Detalle de producto |
| `/category/:slug` | Productos por categoría |
| `/cart` | Carrito de compras |
| `/checkout` | Proceso de compra |
| `/about` | Sobre MarketHub |
| `/contact` | Formulario de contacto |
| `/faq` | Preguntas frecuentes |
| `/terms` | Términos y condiciones |
| `/privacy` | Política de privacidad |
| `/cookies` | Política de cookies |
| `/security` | Información de seguridad |
| `/careers` | Oportunidades de empleo |
| `/press` | Sala de prensa |
| `/help` | Centro de ayuda |
| `/returns` | Política de devoluciones |
| `/shipping` | Información de envíos |

### Panel de Cliente
| Página | Descripción |
|--------|-------------|
| `/profile` | Perfil de usuario |
| `/orders` | Historial de pedidos |
| `/wishlist` | Lista de deseos |

### Panel de Vendedor
| Página | Descripción |
|--------|-------------|
| `/seller/dashboard` | Dashboard del vendedor |
| `/seller/products` | Gestión de productos |
| `/seller/orders` | Gestión de pedidos |
| `/seller/register` | Registro de empresa |

### Panel de Administrador
| Página | Descripción |
|--------|-------------|
| `/admin/dashboard` | Dashboard de administración |

---

## 🔐 Roles y Permisos

| Rol | Descripción |
|-----|-------------|
| `customer` | Cliente estándar - comprar, reseñar |
| `company_admin` | Admin de empresa - gestionar todo |
| `product_manager` | Gestor de productos |
| `inventory_manager` | Gestor de inventario |
| `support_agent` | Agente de soporte |
| `super_admin` | Administrador total de la plataforma |

---

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm run test

# Ejecutar tests e2e
npm run test:e2e

# Coverage
npm run test:coverage
```

---

## 📦 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura variables de entorno
3. Deploy automático en cada push

```bash
# Deploy manual
npm run build
vercel --prod
```

### Configuración de Producción

1. Configura dominio personalizado
2. Habilita HTTPS
3. Configura CDN para assets estáticos
4. Activa analytics

---

## 🔒 Seguridad

- ✅ Autenticación JWT con Supabase Auth
- ✅ Row Level Security (RLS) en todas las tablas
- ✅ Encriptación de datos sensibles
- ✅ Protección contra XSS y CSRF
- ✅ Rate limiting en API
- ✅ Validación de inputs
- ✅ Sanitización de datos

---

## 📈 Optimizaciones

- ✅ Lazy loading de componentes
- ✅ Code splitting por rutas
- ✅ Optimización de imágenes
- ✅ Caché de datos
- ✅ Virtualización de listas
- ✅ Service Worker para PWA
- ✅ Preconnect a dominios críticos

---

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-feature`)
3. Commit tus cambios (`git commit -am 'Agrega nueva feature'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Crea un Pull Request

### Convenciones
- Seguir guía de estilo ESLint
- Escribir tests para nuevas features
- Documentar cambios significativos
- Revisar código antes de merge

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para más detalles.

---

## 👥 Equipo

- **Carlos Rodríguez** - CEO & Fundador
- **Ana Martínez** - Directora de Operaciones
- **Miguel Sánchez** - CTO
- **Laura Gómez** - Directora de Marketing

---

## 📞 Contacto

- **Email:** contacto@markethub.com
- **Sitio Web:** [https://markethub.com](https://markethub.com)
- **Twitter:** [@MarketHub](https://twitter.com/markethub)
- **LinkedIn:** [MarketHub](https://linkedin.com/company/markethub)

---

## 🙏 Agradecimientos

- [shadcn/ui](https://ui.shadcn.com) - Componentes UI increíbles
- [Supabase](https://supabase.com) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com) - Framework de CSS
- [Vercel](https://vercel.com) - Plataforma de despliegue

---

<p align="center">
  Hecho con ❤️ por el equipo de MarketHub
</p>

<p align="center">
  © 2024 MarketHub. Todos los derechos reservados.
</p>
