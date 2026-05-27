import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchCEP } from "../src/handlers/searchCEP.js";

const mockSuccessResponse = {
  cep: "01001-000",
  logradouro: "Praça da Sé",
  complemento: "lado ímpar",
  unidade: "",
  bairro: "Sé",
  localidade: "São Paulo",
  uf: "SP",
  estado: "São Paulo",
  regiao: "Sudeste",
  ibge: "3550308",
  gia: "1004",
  ddd: "11",
  siafi: "7107",
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("searchCEP", () => {
    it("deve retornar endereço para CEP válido com traço", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockSuccessResponse),
        }));

        const result = await searchCEP("01001-000");
        expect(result).toEqual(mockSuccessResponse);
    });

    it("deve retornar endereço para CEP válido sem traço", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockSuccessResponse),
        }));

        const result = await searchCEP("01001000");
        expect(result).toEqual(mockSuccessResponse);
    });

    it("deve retornar erro para CEP com formato inválido", async () => {
        const result = await searchCEP("123");
        expect(result).toEqual({ erro: "CEP inválido" });
    });

    it("deve retornar erro para CEP não encontrado", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ erro: true }),
        }));

        const result = await searchCEP("99999999");
        expect(result).toEqual({ erro: "CEP não encontrado" });
    });

    it("deve retornar erro quando API falha", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
            ok: false,
        }));

        const result = await searchCEP("01001000");
        expect(result).toEqual({ erro: "Erro ao consultar CEP" });
    });
});
