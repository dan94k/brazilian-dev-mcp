import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCurrencyQuote } from "../src/handlers/getCurrencyQuote.js";

const mockAwesomeApiResponse = {
  USDBRL: {
    code: "USD",
    codein: "BRL",
    name: "Dólar Americano/Real Brasileiro",
    high: "5.734",
    low: "5.7279",
    varBid: "-0.0054",
    pctChange: "-0.09",
    bid: "5.7276",
    ask: "5.7282",
    timestamp: "1618315045",
    create_date: "2021-04-13 08:57:27",
  },
  USDEUR: {
    code: "USD",
    codein: "EUR",
    name: "Dólar Americano/Euro",
    high: "0.85",
    low: "0.84",
    varBid: "-0.001",
    pctChange: "-0.12",
    bid: "0.845",
    ask: "0.846",
    timestamp: "1618315045",
    create_date: "2021-04-13 08:57:27",
  },
};

const mockBRLApiResponse = {
  BRLUSD: {
    code: "BRL",
    codein: "USD",
    name: "Real Brasileiro/Dólar Americano",
    high: "0.18",
    low: "0.17",
    varBid: "0.001",
    pctChange: "0.5",
    bid: "0.175",
    ask: "0.176",
    timestamp: "1618315045",
    create_date: "2021-04-13 08:57:27",
  },
  BRLEUR: {
    code: "BRL",
    codein: "EUR",
    name: "Real Brasileiro/Euro",
    high: "0.15",
    low: "0.14",
    varBid: "0.001",
    pctChange: "0.3",
    bid: "0.148",
    ask: "0.149",
    timestamp: "1618315045",
    create_date: "2021-04-13 08:57:27",
  },
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("getCurrencyQuote", () => {
  it("deve retornar cotação para moeda válida (USD)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockAwesomeApiResponse),
    }));

    const result = await getCurrencyQuote("USD");
    expect(result).toEqual({
      moeda: "USD",
      cotacao_brl: { compra: "5.7276", venda: "5.7282" },
      cotacao_usd: { compra: "1", venda: "1" },
      cotacao_eur: { compra: "0.845", venda: "0.846" },
    });
  });

  it("deve retornar cotação para moeda em minúsculas", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockAwesomeApiResponse),
    }));

    const result = await getCurrencyQuote("usd");
    expect(result.moeda).toBe("USD");
  });

  it("deve retornar erro para código de moeda inválido", async () => {
    const result = await getCurrencyQuote("123");
    expect(result).toEqual({ erro: "Código de moeda inválido. Use 3 letras (ex: USD, EUR, BTC)" });
  });

  it("deve retornar erro para código com menos de 3 caracteres", async () => {
    const result = await getCurrencyQuote("AB");
    expect(result).toEqual({ erro: "Código de moeda inválido. Use 3 letras (ex: USD, EUR, BTC)" });
  });

  it("deve retornar erro para código com mais de 3 caracteres", async () => {
    const result = await getCurrencyQuote("ABCD");
    expect(result).toEqual({ erro: "Código de moeda inválido. Use 3 letras (ex: USD, EUR, BTC)" });
  });

  it("deve retornar cotação para BRL com busca na API", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockBRLApiResponse),
    }));

    const result = await getCurrencyQuote("BRL");
    expect(result).toEqual({
      moeda: "BRL",
      cotacao_brl: { compra: "1", venda: "1" },
      cotacao_usd: { compra: "0.175", venda: "0.176" },
      cotacao_eur: { compra: "0.148", venda: "0.149" },
    });
  });

  it("deve retornar erro para moeda não encontrada na API", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: 404, code: "CoinNotExists", message: "moeda nao encontrada ABC-BRL" }),
    }));

    const result = await getCurrencyQuote("ABC");
    expect(result).toEqual({ erro: "Moeda não encontrada: ABC" });
  });

  it("deve retornar erro quando API falha (response not ok)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
    }));

    const result = await getCurrencyQuote("USD");
    expect(result).toEqual({ erro: "Erro ao consultar cotação" });
  });

  it("deve retornar erro quando fetch lança exceção", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

    const result = await getCurrencyQuote("USD");
    expect(result).toEqual({ erro: "Erro ao consultar cotação" });
  });
});
