export function validarCPF(cpf) {
    const cleanCPF = cpf.replace(/\D/g, "");

    if (cleanCPF.length !== 11) return { valido: false };

    if (/^(\d)\1{10}$/.test(cleanCPF)) return { valido: false };

    let sum = 0;
    let multiplier = 10;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanCPF[i]) * multiplier;
        multiplier--;
    }
    let remainder = sum % 11;
    const digito1 = remainder < 2 ? 0 : 11 - remainder;

    sum = 0;
    multiplier = 11;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCPF[i]) * multiplier;
        multiplier--;
    }
    remainder = sum % 11;
    const digito2 = remainder < 2 ? 0 : 11 - remainder;

    return { valido: digito1 === parseInt(cleanCPF[9]) && digito2 === parseInt(cleanCPF[10]) };
}
