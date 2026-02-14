# Nuxt 3 Dashboard Challenge

## Overview

This project is a coding challenge solution designed to demonstrate a dynamic, interactive dashboard using **Vue 3** and **Nuxt 3**. It features a drag-and-drop grid system where users can add, remove, resize, and reposition widgets (Text, Image, Link). The application includes a history system (Undo/Redo) and is styled with **Tailwind CSS v4** and **FlyonUI**.

## Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) (Vue 3)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [FlyonUI](https://flyonui.com/)
- **Grid System**: [GridStack.js](https://gridstackjs.com/)
- **Package Manager**: NPM

## Architecture Overview

### Rendering Strategy: SPA (Single Page Application)

The project is configured with `ssr: false` in `nuxt.config.ts`. This means the application is rendered entirely on the client side.

- **Why?**: Dashboard interactions (drag-and-drop) are inherently client-side. Disabling SSR simplifies the integration with libraries like `GridStack.js` which rely on direct DOM manipulation.

### State Management

State is centralized using **Pinia** in `stores/grid.ts`.

- **Single Source of Truth**: The `widgets` array holds the state of all components on the grid.
- **Undo/Redo**: Implemented using `history` and `future` stacks that snapshot the `widgets` array state on changes.
- **Synchronization**: The `DashboardGrid.vue` component watches the store for changes to update the grid, and listens to grid events (`dragstop`, `resizestop`) to update the store.

## Project Structure

```bash
├── assets/          # Global assets and CSS (Tailwind entry point)
├── components/      # Vue components
│   ├── DashboardGrid.vue  # Wrapper for GridStack instance
│   ├── Widget.vue         # Renderless/Switch component for widgets
│   └── ...                # Specific widget implementations (Text, Image, Link)
├── stores/          # Pinia stores (grid state logic)
├── types/           # TypeScript interfaces and enums
├── app.vue          # Root layout and toolbar
└── nuxt.config.ts   # Nuxt configuration
```

## Setup Instructions

### Prerequisites

- **Node.js**: v18.0.0 or higher is recommended.
- **NPM**: v9.0.0 or higher.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd coding-challenge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

Build the application for static deployment:

```bash
npm run generate
```

The output will be in the `.output/public` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Environment Variables

This project currently does not require specific environment variables to run locally. However, for production deployment, you may configure standard Nuxt environment variables if needed.

## Deployment

This project builds to a standard static output, which can be deployed to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

1. **Build the project**:
   ```bash
   npm run generate
   ```
2. **Deploy**: Upload the `.output/public` directory to your hosting provider.

## Scripts

- `npm run dev`: Start the development server with HMR.
- `npm run build`: Build the application (for server deployment).
- `npm run generate`: Generate a static site (recommended for Netlify/Vercel).
- `npm run preview`: Preview the built application locally.
- `npm run postinstall`: Runs Nuxt prepare script.

## Known Issues

- **History Redundancy**: Unnecessary actions, such as auto-positioning, are currently saved to the history stack. This can obscure user actions and sometimes records a single event as two separate history entries.
- **Undo/Redo Reliability**: Occasionally, performing an undo or redo action does not immediately update the rendered content on the dashboard.

## Future Improvements

### 🏗 Architecture

- **Dynamic Component Loading**: Replace `v-if/else` in `Widget.vue` with a dynamic `<component :is="...">` map to easily support new widget types without modifying the template.
- **Persistence**: Implement `pinia-plugin-persistedstate` to save the dashboard layout to `localStorage` or a backend database.
- **Widget Action Reusability**: Extract common widget actions (Edit, Save, Cancel) into a reusable component (e.g., `<WidgetControls />`) or composable. Currently, this logic is duplicated across `TextWidget`, `ImageWidget`, and `LinkWidget`.

### 🚀 Performance

- **Debounced Updates**: Debounce the synchronization between GridStack and Pinia during resizing to prevent excessive state updates.
- **Lazy Loading**: Lazy load heavy widget components to reduce initial bundle size.

### 🧹 Code Quality

- **Testing**: Add **Vitest** for unit testing store logic.
