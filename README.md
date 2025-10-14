# Next.js Forms Example

This repository is a small Next.js project demonstrating forms and inputs built with React, TypeScript, Tailwind CSS and some UI primitives.

Contents
- `src/app` - Next.js application routes and pages.
- `src/components` - Reusable UI components including the subscription form.

Getting started

1. Install dependencies

```powershell
npm install
```

2. Run the development server

```powershell
npm run dev
```

3. Build for production

```powershell
npm run build
```

4. Typecheck

```powershell
npm run typecheck
```

Notes and decisions

- The project previously listed `firebase` as a dependency but there are no Firebase imports in `src/`. The dependency was removed from `package.json` to avoid installing unused packages. If you need Firebase later, add it back and configure it in the appropriate module.

- The subscription form component (`src/components/subscription-form.tsx`) accepts a phone number. Alphabet characters were being allowed; consider adding a stricter validation pattern (e.g. allow digits, spaces, `+`, `-`, `(`, `)`, `.`) both in the input attributes and the Zod schema.

Troubleshooting

- If you encounter build or runtime errors after dependency changes, try:

```powershell
rm -r node_modules package-lock.json
npm install
```

- If `tsc` is not found, ensure `typescript` is installed in `devDependencies` and that `npm install` completed successfully.

