import { describe, it, expect } from "vitest";
import { generateCNPJ } from "../src/handlers/generateCNPJ.js";
import { validateCNPJ } from "../src/handlers/validateCNPJ.js";

describe("generateCNPJ", () => {
    it("deve retornar objeto com cnpj e cnpjFormatado", () => {
        const resultado = generateCNPJ();
        expect(resultado).toHaveProperty("cnpj");
        expect(resultado).toHaveProperty("cnpjFormatado");
    });

    it("deve gerar CNPJ numerico com 14 digitos", () => {
        const { cnpj } = generateCNPJ("numerico");
        expect(cnpj).toHaveLength(14);
        expect(cnpj).toMatch(/^\d{14}$/);
    });

    it("deve gerar CNPJ alfanumerico com 14 caracteres", () => {
        const { cnpj } = generateCNPJ("alfanumerico");
        expect(cnpj).toHaveLength(14);
        expect(cnpj).toMatch(/^[0-9A-Z]{14}$/);
    });

    it("deve gerar cnpjFormatado no formato XX.XXX.XXX/XXXX-XX", () => {
        const { cnpjFormatado } = generateCNPJ();
        expect(cnpjFormatado).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
    });

    it("deve gerar cnpjFormatado alfanumerico no formato XX.XXX.XXX/XXXX-XX", () => {
        const { cnpjFormatado } = generateCNPJ("alfanumerico");
        expect(cnpjFormatado).toMatch(/^[0-9A-Z]{2}\.[0-9A-Z]{3}\.[0-9A-Z]{3}\/[0-9A-Z]{4}-\d{2}$/);
    });

    it("deve gerar CNPJ numerico válido", () => {
        const { cnpj } = generateCNPJ("numerico");
        expect(validateCNPJ(cnpj)).toEqual({ valido: true, formato: "numerico" });
    });

    it("deve gerar CNPJ alfanumerico válido", () => {
        const { cnpj } = generateCNPJ("alfanumerico");
        expect(validateCNPJ(cnpj)).toEqual({ valido: true, formato: "alfanumerico" });
    });

    it("deve gerar formato numerico por padrao", () => {
        const { cnpj } = generateCNPJ();
        expect(cnpj).toMatch(/^\d{14}$/);
    });
});
