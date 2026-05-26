import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import z from "zod";

const server = new McpServer({
    name: "brazilian-dev-mcp",
    version: "0.1.0",
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Brazilian Dev MCP Server rodando...");
}
main().catch((error) => {
    console.error("Erro:", error);
    process.exit(1);
});