---
name: criar-tool-mcp
description: >
  Guia passo a passo para criar novas tools no MCP server brazilian-dev-mcp.
  Use quando o usuário quiser criar uma nova tool/handler (ex: "criar tool para validar X",
  "adicionar tool de consulta Y", "nova ferramenta para Z").
---

# Como criar uma nova tool no brazilian-dev-mcp

## Arquitetura

```
src/
  index.js              — Entrypoint (não alterar)
  registerTools.js      — Um registerTool() por tool
  handlers/
    <toolName>.js       — Handler exportado (nome em inglês)
tests/
    <toolName>.test.js  — Testes do handler
```

## Passo a passo

### 1. Criar handler `src/handlers/<toolName>.js`

Exportar função nomeada. Padrão do projeto:

**Handler síncrono (validação, geração):**
```js
export function minhaTool(input) {
  // lógica
  return { /* resultado */ };
}
```

**Handler assíncrono (consulta API externa):**
```js
export async function minhaTool(input) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
    if (!response.ok) return { erro: "Mensagem de erro" };
    const data = await response.json();
    return { /* campos do resultado */ };
  } catch {
    return { erro: "Erro ao consultar API" };
  }
}
```

Convenções:
- Nome da função em inglês (`validateX`, `searchX`, `generateX`)
- Input: string crua (o handler faz limpeza/validação)
- Return: objeto com resultado ou `{ erro: "mensagem" }`
- Regex para validação de formato quando aplicável
- `AbortSignal.timeout(3000)` para fetch externo (3s)
- Sem `console.log()` (stdout reservado pro protocolo MCP)

### 2. Registrar em `src/registerTools.js`

Adicionar import no topo:
```js
import { minhaTool } from "./handlers/minhaTool.js";
```

Adicionar `server.registerTool()` dentro de `registerTools()`:

**Síncrono:**
```js
server.registerTool(
  "nome_da_tool_ptbr",
  {
    description: "Descrição em pt-BR do que a tool faz.",
    inputSchema: z.object({
      param: z.string()
    })
  },
  ({ param }) => ({
    content: [{ type: "text", text: JSON.stringify(minhaTool(param)) }]
  })
);
```

**Assíncrono:**
```js
server.registerTool(
  "nome_da_tool_ptbr",
  {
    description: "Descrição em pt-BR. Mencionar fonte de dados se for API externa.",
    inputSchema: z.object({
      param: z.string()
    })
  },
  async ({ param }) => ({
    content: [{ type: "text", text: JSON.stringify(await minhaTool(param)) }]
  })
);
```

Convenções:
- Tool name em snake_case pt-BR (`validar_cep`, `consultar_cep`, `gerar_cpf`)
- Descrição em pt-BR, informativa
- Input schema usa `z.object()` do zod

### 3. Criar testes `tests/<toolName>.test.js`

```js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { minhaTool } from "../src/handlers/minhaTool.js";

describe("minhaTool", () => {
    it("deve fazer X quando Y", () => {
        expect(minhaTool("input")).toEqual({ /* esperado */ });
    });
});
```

Para handlers com fetch — mockar `fetch` global:
```js
beforeEach(() => {
  vi.restoreAllMocks();
});

it("deve retornar sucesso", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ /* dados mockados */ }),
    }));

    const result = await minhaTool("input");
    expect(result).toEqual({ /* esperado */ });
});
```

Casos de teste obrigatórios:
- Input válido (formato correto)
- Input inválido (formato errado)
- Para APIs: resposta de sucesso, não encontrado, API fora do ar

### 4. Rodar testes

```bash
npm test
```

Todos os testes devem passar (existentes + novos).

### 5. Commit

Após todos os testes passarem, commitar os 3 arquivos criados/editados:

```bash
git add src/handlers/<toolName>.js src/registerTools.js tests/<toolName>.test.js
git commit -m "Adicionando tool <nome em pt-BR>"
```

Exemplos de mensagem:
- `Adicionando tool validador de CEP`
- `Adicionando tool consulta de CEP`
- `Adicionando tool gerador de CPF`

## Checklist rápido

- [ ] Handler criado em `src/handlers/<toolName>.js`
- [ ] Import adicionado em `registerTools.js`
- [ ] `server.registerTool()` adicionado com nome pt-BR, descrição, schema e handler
- [ ] Testes criados em `tests/<toolName>.test.js`
- [ ] `npm test` passa tudo
- [ ] Commit com mensagem "Adicionando tool <nome pt-BR>"
