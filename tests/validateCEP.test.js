import { describe, it, expect } from "vitest";
import { validateCEP } from "../src/handlers/validateCEP.js";

describe("validateCEP", () => {
    it("deve retornar válido para CEP com traço", () => {
        expect(validateCEP("01310-100")).toEqual({ valido: true });
    });

    it("deve retornar válido para CEP apenas números", () => {
        expect(validateCEP("01310100")).toEqual({ valido: true });
    });

    it("deve retornar inválido para CEP com menos dígitos", () => {
        expect(validateCEP("1234567")).toEqual({ valido: false });
    });

    it("deve retornar inválido para CEP com mais dígitos", () => {
        expect(validateCEP("123456789")).toEqual({ valido: false });
    });

    it("deve retornar inválido para CEP com traço na posição errada", () => {
        expect(validateCEP("1234-5678")).toEqual({ valido: false });
    });

    it("deve retornar inválido para CEP com letras", () => {
        expect(validateCEP("ABCDE-FGH")).toEqual({ valido: false });
    });
});
