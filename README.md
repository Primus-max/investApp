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
- `src/router/` — Vue Router config
- `src/stores/` — Pinia stores
- `src/composables/` — business logic (composables)
- `src/styles/` — global SCSS (BEM, mobile first)

## Aliases
- `@` — `src`
- `@styles` — `src/styles`
- `@components` — `src/components`
- `@stores` — `src/stores`
- `@composables` — `src/composables`
- `@router` — `src/router`

## SCSS
- All global styles in `styles/main.scss`
- Use BEM and mobile first

## Routing
- All routes in `router/index.js`

## State Management
- Pinia and Pinia Colada for global state

## UI
- Vuetify 3, customized to Figma/Telegram Mini App style

## Icons (UI Kit)

- Монохромные SVG-иконки добавляйте в спрайт: `src/assets/icons/icons-sprite.svg` (копируйте <symbol id="icon-name">...</symbol> из Figma).
- Цветные SVG-иконки кладите отдельными файлами в `src/assets/icons/` и импортируйте в компонент.

### Использование AppIcon.vue

```vue
<!-- Для спрайта (монохромные) -->
<AppIcon name="icon-name" type="sprite" />

<!-- Для отдельных SVG-компонентов -->
<AppIcon name="example" type="component" />
```

- Для компонента нужно добавить импорт SVG в `AppIcon.vue` и в объект icons.
- Для спрайта — просто используйте id из <symbol>.

## Deploy to GitHub Pages

To deploy the project to GitHub Pages:

1. Make sure all changes are committed.
2. Run:
   ```sh
   npm run deploy
   ```
3. The app will be available at: https://primus-max.github.io/investApp/
