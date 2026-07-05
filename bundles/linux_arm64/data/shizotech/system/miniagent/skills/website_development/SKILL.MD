# Skill: TypeScript Website Development

When creating or modifying a website, always develop it as a TypeScript project rather than writing JavaScript directly.

---

## Project Structure

Create and maintain a clear project structure, for example:

```text
index.html
tsconfig.json
styles/
    main.css
scripts/
    main.ts
```

Additional CSS or TypeScript files may be created as needed.

---

## Project Initialization

A valid `tsconfig.json` must always exist in the project root.

If it does not exist, the agent must create it before writing or executing any TypeScript code.

The `tsconfig.json` defines how the project is compiled and must be compatible with `tsc_compile`.

Here is a tsconfig template:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],

    "module": "ESNext",
    "moduleResolution": "Bundler",

    "strict": true,
    "noImplicitAny": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    "skipLibCheck": true,

    "rootDir": "./scripts",
    "outDir": "./dist",

    "useDefineForClassFields": true,
    "isolatedModules": true
  },

  "include": ["scripts"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Dependency & Module Resolution Model (IMPORTANT)

The project operates in **Bundled Module Mode**.

This means:

- TypeScript source files may use ES module imports:
  
      import * as THREE from "three";

- All external dependencies MUST be resolved at build time.
- There is NO runtime module resolution in the browser.

### Mandatory Rule

If any external package import is used (e.g. "three", "react", "lodash"), the project MUST be processed through a bundling step before execution.

The bundling step is responsible for:
- Resolving all module imports
- Translating dependencies into browser-executable JavaScript
- Ensuring runtime compatibility

### Core Constraint

- Imports like `import "three"` are valid ONLY in Bundled Module Mode.
- They are INVALID unless a bundler step (e.g. `bundle_build`) has been executed.
- The browser never resolves package names directly.

### Failure Handling

If a module cannot be resolved at runtime:
- The correct fix is to ensure the bundling step is executed.
- The correct fix is NOT to create `.d.ts` files or manual type stubs.
- The correct fix is NOT to replace imports with CDN scripts.

All dependency resolution must occur in the build step, not in the browser or type system.

## Bundling Requirement

All projects that use external imports MUST call `bundle_build` before running:

- `tsc_compile`
- or `web_debug`

### Purpose of bundling:

- Resolves all module imports
- Converts TypeScript + dependencies into browser-executable JavaScript
- Ensures runtime compatibility
- Prevents missing module errors in the browser

### Output convention:

The bundler MUST produce a single browser-ready entry file:

    dist/app.js

The HTML entry point MUST reference only the bundled output:

    <script type="module" src="dist/app.js"></script>

---

## Prohibited Behaviors

The agent MUST NOT:

- Create fake `.d.ts` files to resolve missing runtime modules
- Assume external libraries exist without bundling
- Use CDN imports for packages when bundling is enabled
- Mix CDN-based scripts with ES module imports
- Modify any files inside `dist/`

If a dependency is missing or unresolved, the correct fix is ALWAYS:
→ ensure `bundle_build` is executed correctly

NOT:
→ type stubs
→ manual declarations
→ CDN fallback imports
→ runtime patching of module resolution

---

## Requirements

- Write all application logic in `.ts` files
- Do not edit generated `.js` files inside `dist/`
- HTML must reference only compiled/bundled JS in `dist/`
- Prefer ES modules (`type="module"`)
- Keep HTML, CSS, and TypeScript strictly separated
- Avoid inline JavaScript and CSS unless explicitly requested
- Use modern, maintainable, and deterministic build practices

---

## Workflow

1. Create or modify project files in:
   - `scripts/`
   - `styles/`
   - `index.html`

2. Ensure `tsconfig.json` exists and is valid.

3. If any external dependencies are used:
   - Call `bundle_build` BEFORE compilation or execution.

4. Run `tsc_compile` to perform TypeScript compilation and validation.

5. If needed, run `web_debug` for runtime verification.

6. Iterate until both build and runtime checks succeed.

---

## Error Handling Loop

If `tsc_compile` reports errors:

- Fix TypeScript or configuration issues in source files
- If errors involve missing modules or unresolved imports:
  → ensure `bundle_build` is executed
- Re-run `tsc_compile`

Repeat until compilation succeeds.

If runtime errors are detected during `web_debug`:

- Fix only source `.ts` files
- Do NOT modify `dist/` output directly
- Re-run `bundle_build` if dependency-related
- Re-run `tsc_compile` and `web_debug` in sequence

Continue iteration until both build and runtime validation succeed.

---