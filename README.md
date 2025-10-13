# Pine — Study Timer

A modern, minimal study timer app built with Vite, React, TypeScript and shadcn/ui primitives. Pine provides several timer modes (Pomodoro, Ultradian, Desk time, 30/30, Stopwatch) with a clean UI, theme support, and small utility components for building a focused study experience.

This repo is a front-end application scaffolded with Vite and TypeScript, using Radix UI primitives, Tailwind CSS, and shadcn-style components.

## Features

- Multiple timer modes: Pomodoro, Ultradian, Desk time, 30/30, and Stopwatch
- Theme selection with light/dark support
- Background selector and simple audio player for ambient sound
- Small component library using Radix UI and TailwindCSS
- Accessible UI primitives and responsive layout

## Tech stack

- Vite
- React 18 + TypeScript
- Tailwind CSS
- Radix UI
- shadcn/ui style components
- react-router for routing

## Getting started

These instructions assume you're on Windows using PowerShell (default shell for this workspace). Adjust commands for other shells if needed.

1. Install dependencies

```powershell
npm install
```

2. Start development server

```powershell
npm run dev
```

3. Build for production

```powershell
npm run build
```

4. Preview production build locally

```powershell
npm run preview
```

Useful scripts (from `package.json`)

- `dev` - start Vite dev server
- `build` - build production bundle
- `build:dev` - build in development mode
- `preview` - preview built output
- `lint` - run ESLint across the project

## Project structure (important files)

- `src/` - application source
	- `components/` - UI components and shadcn primitives
	- `pages/` - route pages and timers
	- `lib/` - utilities
	- `contexts/`, `hooks/` - app state and custom hooks
- `index.html`, `vite.config.ts` - Vite entry and config
- `tailwind.config.ts`, `postcss.config.js` - Tailwind setup

## Development tips

- Tailwind: classes are used extensively. If you add new utilities, ensure they are included in Tailwind's content paths (see `tailwind.config.ts`).
- TypeScript: type definitions live alongside components; run `tsc --noEmit` to type-check.
- Linting: run `npm run lint` and consider adding an editor integration for ESLint.

## Testing

This project doesn't include automated tests by default. To add tests, consider Jest or Vitest + React Testing Library.

## Contributing

Contributions are welcome. A simple workflow:

1. Fork the repo and create a feature branch
2. Implement your changes, update types, and add tests where appropriate
3. Run lint and type-check locally
4. Open a pull request with a clear description of changes


## Acknowledgements

- Radix UI (accessible primitives)
- Tailwind Labs for Tailwind CSS
- Vite and the React community for tooling


