# Project: initial-project-nuxt

A Nuxt 4 (Vue 3) application with Nuxt UI, authentication, logging, i18n, and PostgreSQL database.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Nuxt 4.4.8 |
| Vue | 3.5.35 |
| UI Library | @nuxt/ui 4.4.8 (Reka UI + Tailwind CSS) |
| Styling | Tailwind CSS + Nuxt UI |
| Auth | @logto/nuxt 1.2.10 |
| Logging | evlog 2.19.2 |
| i18n | @nuxtjs/i18n 10.4.0 |
| Database | Prisma 6.19.3 + PostgreSQL |
| Utilities | clsx, tailwind-merge, @vueuse/core |
| Language | TypeScript |

## Project Structure

```
├── app/
│   ├── app.vue                    # Root Vue component (wraps content in <UApp>)
│   ├── layouts/
│   │   └── default.vue            # Main layout with sidebar navigation
│   ├── pages/
│   │   ├── index.vue              # Dashboard home page
│   │   ├── datatable.vue          # Data table with filtering
│   │   ├── logs.vue               # Logging viewer
│   │   ├── settings.vue           # Settings page
│   │   ├── login.vue              # Login page
│   │   └── auth/
│   │       └── callback.vue       # OAuth callback handler
│   ├── components/
│   │   └── UDataTable.vue         # Custom data table with pagination/sort/search
│   ├── middleware/
│   │   └── auth.global.ts         # Global auth protection (redirects to /login)
│   └── assets/css/
│       └── main.css               # Tailwind CSS entry point
├── server/
│   ├── api/
│   │   ├── nav-items.ts           # Navigation menu items API
│   │   ├── notifications.ts       # Notifications dropdown API
│   │   ├── datatables.ts          # Mock datatable data (paginated/filterable)
│   │   ├── logs.ts                # Log files listing from .evlog/
│   │   └── logs-detail.ts         # Individual log entries by filename/level
│   └── plugins/
│       ├── logto.ts               # Logto auth plugin
│       └── evlog-drain.ts         # evlog filesystem drain (10MB per file)
├── prisma/
│   └── schema.prisma              # Prisma schema (PostgreSQL)
├── i18n/
│   └── locales/
│       ├── en.json                # English translations
│       └── id.json                # Indonesian translations
├── nuxt.config.ts                 # Nuxt configuration
├── tailwind.config.ts             # Tailwind configuration
└── package.json
```

## Features

### Authentication
- Logto integration via `@logto/nuxt`
- Protected routes via `auth.global.ts` middleware
- Public routes: `/login`, `/auth/callback`, `/logout`
- Redirects unauthenticated users to `/login`

### Logging
- evlog structured logging
- Files drain to `.evlog/logs/*.jsonl` (10MB max per file)
- Logs page displays log files with info/warning/error counts
- Log detail page filters by level (info/warning/error)

### i18n
- English and Indonesian support
- Language switcher in sidebar header
- Uses `$t()` for translations in components
- Translation files in `i18n/locales/`

### Data Table
- Custom `UDataTable.vue` component
- Server-side pagination, sorting, and search
- Column configuration via props
- Filter support (e.g., status filter in datatable page)
- i18n header labels

### Database
- Prisma ORM with PostgreSQL
- Schema defined in `prisma/schema.prisma`
- Run `npx prisma migrate dev` to create migrations

## Key Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at http://localhost:3000 |
| `npm run build` | Build for production |
| `npm run generate` | Generate static site |
| `npm run preview` | Preview production build |
| `npm run postinstall` | Runs `nuxt prepare` to generate types |
| `npx prisma migrate dev` | Create database migration |
| `npx prisma studio` | Open Prisma Studio |

## Development Guidelines

### Documentation First
Before implementing features or troubleshooting issues:

1. Always consult the official documentation
2. Check available skills for relevant problems (e.g., `/find-skills`, `nuxt`, `vue`, `vitest`)

| Technology | Documentation |
|------------|---------------|
| Nuxt | https://nuxt.com/docs |
| Vue | https://vuejs.org/guide |
| Nuxt UI | https://ui.nuxt.com |
| Reka UI | https://reka-ui.com |
| Tailwind CSS | https://tailwindcss.com/docs |
| Prisma | https://www.prisma.io/docs |
| Logto | https://docs.logto.io |
| evlog | https://evlog.dev |
| VueUse | https://vueuse.org/functions |
| @nuxtjs/i18n | https://i18n.nuxtjs.org |

### Code Style
- Follow Vue 3 Composition API patterns with `<script setup>`
- Use TypeScript for type safety
- Prefer composables for reusable logic
- Use Nuxt auto-imports (composables, utils) - don't import manually
- Keep components small and focused (single responsibility)
- Use meaningful, descriptive variable and function names
- Avoid magic strings - use constants or enums when applicable

### Best Practices
- **SSR/SPA**: Nuxt handles SSR by default; use `useFetch` for server-side data
- **State**: Use `useState` or composables for shared state; avoid direct Pinia unless needed
- **Types**: Define proper TypeScript interfaces; avoid `any`
- **API**: Use `$fetch` or `useFetch` for API calls; handle errors gracefully
- **i18n**: Use `$t()` for user-facing strings; store translations in `i18n/locales/`
- **Styling**: Use Tailwind utility classes; leverage Nuxt UI components
- **Testing**: Write tests for critical business logic

## Development Notes

- Devtools are enabled by default
- Nuxt uses auto-imports for Vue composables and utilities
- The `app/` directory is the source root (Nuxt 4 convention)
- Nuxt UI components are auto-imported (e.g., `UButton`, `UTable`, `USidebar`, `UApp`)
- `@vueuse/core` composables are available globally
- Color mode is forced to dark theme via `nuxt.config.ts`
- Translation function `$t()` is globally available
- `useLogtoUser()` from `#imports` provides auth state
- `useLogger(event)` from `evlog` provides server-side logging
