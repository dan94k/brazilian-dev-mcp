# AGENTS.md

## Idioma

Sempre responda em português brasileiro (pt-BR). A convenção de idioma no código é:

- **pt-BR:** nomes de tools, parâmetros, descrições e propriedades do MCP — tudo que o usuário final vê ou interage
- **Inglês:** código interno (variáveis, funções, imports, lógica, nomes de arquivos)

Exemplo: a tool se chama `validar_cpf`, mas a função interna é `validateCPF`.

## What this is

MCP (Model Context Protocol) server providing Brazilian developer utility tools — CPF validation, with planned tools for CNPJ, CEP, phone, currency, fake data, etc. Descriptions and comments are in Portuguese (Brazilian).

## Stack

- **Runtime:** Node.js with ESM (`"type": "module"` in package.json)
- **Execution:** Files are `.js` but run via `tsx` — no TypeScript config exists, no `tsconfig.json`
- **Key deps:** `@modelcontextprotocol/sdk`, `zod` (for input schemas), `tsx`

## Commands

| Task | Command |
|------|---------|
| Run dev server (MCP inspector) | `npm run dev` |
| Install deps | `npm install` |
| Run tests | `npm test` |

No linter, no typecheck, no formatter configured.

## Architecture

```
src/
  index.js          — Entrypoint: creates McpServer, connects StdioServerTransport
  registerTools.js  — Registers all tools on the server (one server.registerTool call per tool)
  handlers/         — One file per tool handler, exports a named function
    validateCPF.js  — CPF validation
    generateCPF.js  — CPF generation
```

## Testing

- **Framework:** vitest v1 (compatível com Node 18)
- **Test files:** `tests/` directory, one file per handler (`<handlerName>.test.js`)
- **Pattern:** `import { describe, it, expect } from "vitest"` + import handler from `../src/handlers/`
- **Current coverage:** `validateCPF` (5 tests), `generateCPF` (4 tests)

## How to add a new tool

1. Create `src/handlers/<toolName>.js` exporting the handler function (use English for file and function names)
2. Import it in `src/registerTools.js` and add a `server.registerTool()` call
3. Follow the existing pattern: handler returns `{ content: [{ type: "text", text: JSON.stringify(result) }] }`
4. Input schema uses `z.object()` from zod
5. Use Portuguese (pt-BR) for tool names, parameters, descriptions, and return properties visible to the user

## Quirks

- **Package name typo:** `package.json` name is `"btrazilian-dev-mcp"` (missing the `a` in `brazilian`) — don't "fix" it without coordinating, as it may affect published identity
- **No TypeScript:** Despite `tsx` being the runner, all source is plain `.js` — do not introduce `.ts` files without adding a tsconfig
- **Stdio transport:** This is an MCP server that communicates over stdin/stdout. `console.error()` is used for logging (stdout is reserved for the protocol). Never add `console.log()` to src/
- **Planned tools roadmap:** The bottom of `registerTools.js` has commented-out plans for ~50+ tools across categories (CPF/CNPJ, CEP, phone, currency, validation, text, date, crypto, JSON, fake data). Use that as the design spec when implementing new handlers
