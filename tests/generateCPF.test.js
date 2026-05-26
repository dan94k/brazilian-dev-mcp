import { describe, it, expect } from "vitest";
import { generateCPF } from "../src/handlers/generateCPF.js";
import { validateCPF } from "../src/handlers/validateCPF.js";

describe("generateCPF", () => {
    it("deve retornar objeto com cpf e cpfFormatado", () => {
        const resultado = generateCPF();
        expect(resultado).toHaveProperty("cpf");
        expect(resultado).toHaveProperty("cpfFormatado");
    });

    it("deve gerar cpf com 11 dígitos", () => {
        const { cpf } = generateCPF();
        expect(cpf).toHaveLength(11);
        expect(cpf).toMatch(/^\d{11}$/);
    });

    it("deve gerar cpfFormatado no formato XXX.XXX.XXX-XX", () => {
        const { cpfFormatado } = generateCPF();
        expect(cpfFormatado).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    });

    it("deve gerar CPF válido", () => {
        const { cpf } = generateCPF();
        expect(validateCPF(cpf)).toEqual({ valido: true });
    });
});
