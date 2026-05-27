export async function getCurrencyQuote(currency) {
  const cleanCurrency = currency.replace(/\s/g, "").toUpperCase();
  const regex = /^[A-Z]{3}$/;

  if (!regex.test(cleanCurrency)) {
    return { erro: "Código de moeda inválido. Use 3 letras (ex: USD, EUR, BTC)" };
  }

  const allPairs = [`${cleanCurrency}-BRL`, `${cleanCurrency}-USD`, `${cleanCurrency}-EUR`];
  const pairsToFetch = allPairs.filter((pair) => {
    const [from, to] = pair.split("-");
    return from !== to;
  });

  const url = `https://economia.awesomeapi.com.br/json/last/${pairsToFetch.join(",")}`;

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(3000) });

    if (!response.ok) {
      return { erro: "Erro ao consultar cotação" };
    }

    const data = await response.json();

    if (data.status === 404 || data.code === "CoinNotExists") {
      return { erro: `Moeda não encontrada: ${cleanCurrency}` };
    }

    const brlKey = `${cleanCurrency}BRL`;
    const usdKey = `${cleanCurrency}USD`;
    const eurKey = `${cleanCurrency}EUR`;

    return {
      moeda: cleanCurrency,
      cotacao_brl: data[brlKey]
        ? { compra: data[brlKey].bid, venda: data[brlKey].ask }
        : { compra: "1", venda: "1" },
      cotacao_usd: data[usdKey]
        ? { compra: data[usdKey].bid, venda: data[usdKey].ask }
        : { compra: "1", venda: "1" },
      cotacao_eur: data[eurKey]
        ? { compra: data[eurKey].bid, venda: data[eurKey].ask }
        : { compra: "1", venda: "1" },
    };
  } catch {
    return { erro: "Erro ao consultar cotação" };
  }
}
