# Project: initial-project-nuxt

A Nuxt 4 (Vue 3) application with Nuxt UI components and Tailwind CSS.

## Tech Stack

- **Framework**: Nuxt 4.4.8
- **Vue**: 3.5.35
- **Router**: vue-router 5.1.0
- **UI Library**: @nuxt/ui (built on Reka UI + Tailwind CSS)
- **Styling**: Tailwind CSS 4 + Nuxt UI
- **Utilities**: clsx, tailwind-merge
- **Language**: TypeScript
- **Package Manager**: npm (default)

## Project Structure

```
├── app/
│   ├── app.vue           # Root Vue component (wraps content in <UApp>)
│   ├── assets/
│   │   └── css/
│   │       └── main.css  # Tailwind CSS + Nuxt UI entry point
│   ├── layouts/
│   │   └── default.vue   # Main layout with sidebar
│   ├── lib/
│   │   └── utils.ts      # cn() utility function
│   └── pages/            # Route pages
├── components.json       # Nuxt UI configuration
├── nuxt.config.ts        # Nuxt configuration (uses @nuxt/ui module)
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript references
```

## Key Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at http://localhost:3000 |
| `npm run build` | Build for production |
| `npm run generate` | Generate static site |
| `npm run preview` | Preview production build |
| `npm run postinstall` | Runs `nuxt prepare` to generate types |

## Development Notes

- Devtools are enabled by default
- Nuxt uses auto-imports for Vue composables and utilities
- The `app/` directory is the source root (Nuxt 4 convention)
- Custom components are in `~/components/ui/` (e.g., sidebar)
- Nuxt UI components are auto-imported (e.g., `UButton`, `UTable`, `USeparator`, `UApp`)
- tailwind-merge and clsx utilities are available globally
- TypeScript config extends `.nuxt/tsconfig.app.json` after running `nuxt prepare`
- CSS entry point is `app/assets/css/main.css` (configured in nuxt.config.ts)
