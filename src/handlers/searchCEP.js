export async function searchCEP(cep) {
  const cleanCEP = cep.replace(/\D/g, "");
  const regex = /^\d{8}$/;

  if (!regex.test(cleanCEP)) {
    return { erro: "CEP inválido" };
  }

  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${cleanCEP}/json/`,
      { signal: AbortSignal.timeout(3000) }
    );

    if (!response.ok) {
      return { erro: "Erro ao consultar CEP" };
    }

    const data = await response.json();

    if (data.erro) {
      return { erro: "CEP não encontrado" };
    }

    return {
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: data.complemento,
      unidade: data.unidade,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
      estado: data.estado,
      regiao: data.regiao,
      ibge: data.ibge,
      gia: data.gia,
      ddd: data.ddd,
      siafi: data.siafi,
    };
  } catch {
    return { erro: "Erro ao consultar CEP" };
  }
}
