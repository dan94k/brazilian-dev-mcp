export function validateCNPJ(cnpj) {
    const clean = cnpj.replace(/[\.\-\/\s]/g, "").toUpperCase();

    if (clean.length !== 14) return { valido: false, formato: null };

    if (/^(\w)\1{13}$/.test(clean)) return { valido: false, formato: null };

    for (let i = 0; i < 14; i++) {
        const c = clean.charCodeAt(i);
        const isDigit = c >= 48 && c <= 57;
        const isUpper = c >= 65 && c <= 90;
        if (i < 12 && !isDigit && !isUpper) return { valido: false, formato: null };
        if (i >= 12 && !isDigit) return { valido: false, formato: null };
    }

    const isNumeric = /^[0-9]+$/.test(clean);
    const formato = isNumeric ? "numerico" : "alfanumerico";

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += (clean.charCodeAt(i) - 48) * weights1[i];
    }
    let remainder = sum % 11;
    const dv1 = remainder < 2 ? 0 : 11 - remainder;

    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += (clean.charCodeAt(i) - 48) * weights2[i];
    }
    sum += dv1 * weights2[12];
    remainder = sum % 11;
    const dv2 = remainder < 2 ? 0 : 11 - remainder;

    const valido = dv1 === parseInt(clean[12]) && dv2 === parseInt(clean[13]);

    return { valido, formato: valido ? formato : null };
}
