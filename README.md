# React + TypeScript + Vite

## AI import estimate setup

The import calculator calls a Supabase Edge Function named `import-estimate`.
When the user provides a car link, the function sends the URL to OpenAI with web
search enabled so the model can locate the listing details and exact advertised
price. It then returns structured JSON for the frontend table.

### 1. Install and log in to Supabase CLI

```bash
npm install -g supabase
supabase login
```

### 2. Link this project to Supabase

Create or open your Supabase project, copy the project ref, then run:

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

### 3. Add server-side secrets

Do not put the OpenAI API key in `.env`.

```bash
supabase secrets set OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

Optional, if you want to switch models without editing code:

```bash
supabase secrets set OPENAI_MODEL=gpt-5.2
```

### 4. Deploy the function

```bash
supabase functions deploy import-estimate
```

### 5. Add frontend environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
VITE_IMPORT_ESTIMATE_FUNCTION_URL=https://YOUR_PROJECT_REF.supabase.co/functions/v1/import-estimate
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Restart the Vite dev server after changing `.env.local`.

### 6. Expected function response

The frontend expects this shape:

```json
{
  "carName": "BMW Serie 3 320d 2021",
  "basePrice": 32500,
  "rows": [
    {
      "concept": "Impuesto de Matriculación",
      "detail": "Estimación según CO2",
      "cost": 1240
    }
  ],
  "assumptions": ["Precio base estimado por descripción del vehículo."]
}
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
