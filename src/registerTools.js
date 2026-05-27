import z from "zod";
import { validateCPF } from "./handlers/validateCPF.js";
import { generateCPF } from "./handlers/generateCPF.js";
import { validateCNPJ } from "./handlers/validateCNPJ.js";
import { generateCNPJ } from "./handlers/generateCNPJ.js";
import { validateCEP } from "./handlers/validateCEP.js";

export function registerTools(server) {

  server.registerTool(
    "validar_cpf",
    {
      description: "Valida se um CPF é válido e retorna o motivo da invalidez",
      inputSchema: z.object({
        cpf: z.string()
      })
    },
    ({ cpf }) => ({
      content: [{ type: "text", text: JSON.stringify(validateCPF(cpf)) }]
    })
  );

  server.registerTool(
    "gerar_cpf",
    {
      description: "Gera um CPF válido aleatório",
      inputSchema: z.object({})
    },
    () => ({
      content: [{ type: "text", text: JSON.stringify(generateCPF()) }]
    })
  );

  server.registerTool(
    "validar_cnpj",
    {
      description: "Valida se um CNPJ é válido. Aceita formato numérico (antigo) e alfanumérico (novo). Detecta automaticamente o formato.",
      inputSchema: z.object({
        cnpj: z.string()
      })
    },
    ({ cnpj }) => ({
      content: [{ type: "text", text: JSON.stringify(validateCNPJ(cnpj)) }]
    })
  );

  server.registerTool(
    "gerar_cnpj",
    {
      description: "Gera um CNPJ válido aleatório. Use 'numerico' para o formato antigo ou 'alfanumerico' para o novo.",
      inputSchema: z.object({
        formato: z.enum(["numerico", "alfanumerico"]).default("numerico")
      })
    },
    ({ formato }) => ({
      content: [{ type: "text", text: JSON.stringify(generateCNPJ(formato)) }]
    })
  );

  server.registerTool(
    "validar_cep",
    {
      description: "Valida se um CEP é válido. Aceita formato com traço (12345-678) ou apenas números (12345678).",
      inputSchema: z.object({
        cep: z.string()
      })
    },
    ({ cep }) => ({
      content: [{ type: "text", text: JSON.stringify(validateCEP(cep)) }]
    })
  );
}