import { describe, it, expect } from "vitest";
import { validateCPF } from "../src/handlers/validateCPF.js";

describe("validateCPF", () => {
    it("deve retornar válido para CPF correto com formatação", () => {
        expect(validateCPF("529.982.247-25")).toEqual({ valido: true });
    });

    it("deve retornar válido para CPF correto sem formatação", () => {
        expect(validateCPF("52998224725")).toEqual({ valido: true });
    });

    it("deve retornar inválido para CPF com todos os dígitos iguais", () => {
        expect(validateCPF("111.111.111-11")).toEqual({ valido: false });
    });

    it("deve retornar inválido para CPF com tamanho incorreto", () => {
        expect(validateCPF("123")).toEqual({ valido: false });
    });

    it("deve retornar inválido para CPF com dígito verificador errado", () => {
        expect(validateCPF("529.982.247-20")).toEqual({ valido: false });
    });
});
