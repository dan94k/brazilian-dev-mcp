# Brazilian Dev MCP

Servidor [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) com ferramentas utilitárias para desenvolvedores que trabalham com dados brasileiros — CPF, CNPJ, CEP, telefones, moeda, validações, dados fake e mais.

## Instalação

```bash
git clone https://github.com/dan94k/brazilian-dev-mcp.git
cd brazilian-dev-mcp
npm install
```

## Uso

### Com Claude Desktop

Adicione ao seu `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "brazilian-dev": {
      "command": "npx",
      "args": ["tsx", "caminho/para/brazilian-dev-mcp/src/index.js"]
    }
  }
}
```

### Com opencode

Adicione ao seu `opencode.json` (no diretório do projeto ou em `~/.config/opencode/opencode.json`):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "brazilian-dev": {
      "type": "local",
      "command": ["npx", "tsx", "caminho/para/brazilian-dev-mcp/src/index.js"],
      "enabled": true
    }
  }
}
```

Após salvar, reinicie o opencode para que as mudanças tenham efeito.

### Com MCP Inspector (desenvolvimento)

```bash
npm run dev
```

## Tools

| Tool | Descrição | Status |
|------|-----------|--------|
| `validar_cpf` | Valida se um CPF é válido e retorna o motivo da invalidez | ✅ |
| `gerar_cpf` | Gera um CPF válido aleatório (módulo 11) | ✅ |
| `validar_cnpj` | Valida CNPJ (formato numérico e alfanumérico) | ✅ |
| `gerar_cnpj` | Gera um CNPJ válido aleatório (módulo 11) | ✅ |
| `consultar_cep` | Consulta endereço pelo CEP na API ViaCEP | ✅ |
| `validar_cep` | Valida CEP com regex `/^\d{5}-?\d{3}$/` | ✅ |
| `consultar_cotacao` | Consulta cotação de moedas (BRL, USD, EUR) via API AwesomeAPI | ✅ |
| `validar_email` | Valida e-mail com regex | ⬜ |
| `validar_url` | Valida URL usando construtor nativo `URL` | ⬜ |
| `validar_ipv4` | Valida IPv4 (4 octetos de 0-255) | ⬜ |
| `validar_ipv6` | Valida IPv6 (8 grupos de 4 hex) | ⬜ |
| `gerar_lorem` | Gera Lorem Ipsum com X palavras | ⬜ |
| `eh_feriado` | Verifica se uma data é feriado nacional | ⬜ |
| `eh_dia_util` | Verifica se uma data é dia útil | ⬜ |

## Arquitetura

```
src/
  index.js              → Entrypoint: cria McpServer, conecta StdioServerTransport
  registerTools.js      → Registra todas as tools no servidor
  handlers/             → Um arquivo por tool handler
    validateCPF.js
    generateCPF.js
    validateCNPJ.js
    generateCNPJ.js
    validateCEP.js
    searchCEP.js
    getCurrencyQuote.js
```

### Design: Tools independentes

Cada tool é **autocontida**. Os handlers não dependem de outros arquivos do projeto — cada um contém toda a lógica necessária para funcionar. Isso significa que **alguns códigos podem estar duplicados** entre handlers, e isso é intencional. O objetivo é:

- **Zero acoplamento:** cada tool pode ser entendida, testada e modificada isoladamente
- **Facilidade de contribuição:** basta criar um handler novo em `src/handlers/` e registrar em `registerTools.js`

### Convenção de idioma

- **pt-BR (português brasileiro):** tudo que o usuário final vê ou interage — nomes de tools, parâmetros, descrições, mensagens de retorno, propriedades do JSON de resposta.
- **Inglês:** código interno — variáveis, funções, imports, lógica, nomes de arquivos

Exemplo: a tool se chama `validar_cpf`, mas a função interna é `validateCPF`.

## Contribuindo

Contribuições são muito bem-vindas! Sinta-se livre para:

- **Implementar novas tools** da lista de planejadas acima
- **Reportar bugs** via Issues
- **Sugerir novas funcionalidades** que não estão na lista
- **Melhorar documentação** ou testes

### Padrões para novas tools

- Handler exporta uma função nomeada (em inglês)
- Input schema usa `z.object()` do zod
- Handler retorna `{ content: [{ type: "text", text: JSON.stringify(result) }] }`
- Nomes de tools, parâmetros e descrições em **pt-BR**
- Código interno em **inglês**
- Cada handler é independente — não importe outros handlers

## Stack

- **Runtime:** Node.js (ESM)
- **Execução:** tsx
- **Schema:** zod
- **MCP SDK:** @modelcontextprotocol/sdk
- **Testes:** vitest

## Licença

MIT
