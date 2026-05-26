export function generateCPF() {
    const digits = [];
    for (let i = 0; i < 9; i++) {
        digits.push(Math.floor(Math.random() * 10));
    }

    let sum = 0;
    let multiplier = 10;
    for (let i = 0; i < 9; i++) {
        sum += digits[i] * multiplier;
        multiplier--;
    }
    let remainder = sum % 11;
    digits.push(remainder < 2 ? 0 : 11 - remainder);

    sum = 0;
    multiplier = 11;
    for (let i = 0; i < 10; i++) {
        sum += digits[i] * multiplier;
        multiplier--;
    }
    remainder = sum % 11;
    digits.push(remainder < 2 ? 0 : 11 - remainder);

    const cpf = digits.join("");

    return {
        cpf,
        cpfFormatado: `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`
    };
}
