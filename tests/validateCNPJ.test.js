import { describe, it, expect } from "vitest";
import { validateCNPJ } from "../src/handlers/validateCNPJ.js";

describe("validateCNPJ", () => {
    it("deve retornar válido para CNPJ numérico com formatação", () => {
        expect(validateCNPJ("11.223.344/5566-13")).toEqual({ valido: true, formato: "numerico" });
    });

    it("deve retornar válido para CNPJ numérico sem formatação", () => {
        expect(validateCNPJ("11223344556613")).toEqual({ valido: true, formato: "numerico" });
    });

    it("deve retornar válido para CNPJ alfanumérico com formatação (exemplo gov)", () => {
        expect(validateCNPJ("12.ABC.345/01DE-35")).toEqual({ valido: true, formato: "alfanumerico" });
    });

    it("deve retornar válido para CNPJ alfanumérico sem formatação", () => {
        expect(validateCNPJ("12ABC34501DE35")).toEqual({ valido: true, formato: "alfanumerico" });
    });

    it("deve retornar inválido para CNPJ numérico com DV errado", () => {
        expect(validateCNPJ("11.223.344/5566-00")).toEqual({ valido: false, formato: null });
    });

    it("deve retornar inválido para CNPJ alfanumérico com DV errado", () => {
        expect(validateCNPJ("12.ABC.345/01DE-00")).toEqual({ valido: false, formato: null });
    });

    it("deve retornar inválido para CNPJ com todos os caracteres iguais", () => {
        expect(validateCNPJ("00000000000000")).toEqual({ valido: false, formato: null });
    });

    it("deve retornar inválido para CNPJ com tamanho incorreto", () => {
        expect(validateCNPJ("1234567890123")).toEqual({ valido: false, formato: null });
    });

    it("deve retornar inválido para CNPJ com caractere fora de [0-9A-Z]", () => {
        expect(validateCNPJ("12.AB#.345/01DE-35")).toEqual({ valido: false, formato: null });
    });

    it("deve detectar corretamente formato numerico", () => {
        const resultado = validateCNPJ("11223344556613");
        expect(resultado.formato).toBe("numerico");
    });

    it("deve detectar corretamente formato alfanumerico", () => {
        const resultado = validateCNPJ("12ABC34501DE35");
        expect(resultado.formato).toBe("alfanumerico");
    });

    it("deve aceitar letras minusculas e converter para maiusculas", () => {
        expect(validateCNPJ("12.abc.345/01de-35")).toEqual({ valido: true, formato: "alfanumerico" });
    });
});
