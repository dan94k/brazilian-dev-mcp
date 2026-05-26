const CPF_VALIDATION_RULE = "Um CPF é composto por 11 dígitos numéricos, onde os dois últimos são dígitos verificadores calculados a partir dos 9 primeiros. Para validar um CPF, deve-se seguir os seguintes passos:";

export function validarCPF(cpf) {
    // Remove caracteres especiais
    const cleanCPF = cpf.replace(/\D/g, "");

    // Valida se tem 11 dígitos
    if (cleanCPF.length !== 11) {
        return {
            result: false,
            description: CPF_VALIDATION_RULE
        };
    }

    // Valida se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) {
        return {
            result: false,
            description: CPF_VALIDATION_RULE
        };
    }

    // Calcula primeiro dígito verificador
    let sum = 0;
    let multiplier = 10;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanCPF[i]) * multiplier;
        multiplier--;
    }
    let remainder = sum % 11;
    let firstDigit = remainder < 2 ? 0 : 11 - remainder;

    // Calcula segundo dígito verificador
    sum = 0;
    multiplier = 11;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCPF[i]) * multiplier;
        multiplier--;
    }
    remainder = sum % 11;
    let secondDigit = remainder < 2 ? 0 : 11 - remainder;

    // Valida os dígitos verificadores
    const isValid = firstDigit === parseInt(cleanCPF[9]) && secondDigit === parseInt(cleanCPF[10]);

    return {
        result: isValid,
        description: CPF_VALIDATION_RULE
    };
}
