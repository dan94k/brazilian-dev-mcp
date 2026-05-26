#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./registerTools.js";

const server = new McpServer({
    name: "brazilian-dev-mcp",
    version: "0.1.0",
    description: "MCP Server com ferramentas úteis para o dia a dia do desenvolvedor",
});

registerTools(server);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Brazilian Dev MCP Server rodando...");
}
main().catch((error) => {
    console.error("Erro:", error);
    process.exit(1);
});