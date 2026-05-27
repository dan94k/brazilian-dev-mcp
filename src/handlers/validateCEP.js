export function validateCEP(cep) {
  const regex = /^\d{5}-?\d{3}$/;
  return { valido: regex.test(cep) };
}
