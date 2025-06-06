# investApp

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Project Structure (Atomic Design)

- `src/components/atoms` — atomic UI elements
- `src/components/molecules` — combinations of atoms
- `src/components/organisms` — complex UI blocks
- `router/` — Vue Router config
- `stores/` — Pinia stores
- `styles/` — global SCSS (BEM, mobile first)

## Aliases
- `@` — `src`
- `@styles` — `styles`
- `@components` — `src/components`

## SCSS
- All global styles in `styles/main.scss`
- Use BEM and mobile first

## Routing
- All routes in `router/index.js`

## State Management
- Pinia and Pinia Colada for global state

## UI
- Vuetify 3, customized to Figma/Telegram Mini App style
