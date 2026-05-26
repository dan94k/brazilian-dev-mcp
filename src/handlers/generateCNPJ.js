export function generateCNPJ(formato = "numerico") {
    const chars = formato === "alfanumerico"
        ? "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        : "0123456789";

    const base = [];
    for (let i = 0; i < 12; i++) {
        base.push(chars[Math.floor(Math.random() * chars.length)]);
    }

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += (base[i].charCodeAt(0) - 48) * weights1[i];
    }
    let remainder = sum % 11;
    const dv1 = remainder < 2 ? 0 : 11 - remainder;

    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += (base[i].charCodeAt(0) - 48) * weights2[i];
    }
    sum += dv1 * weights2[12];
    remainder = sum % 11;
    const dv2 = remainder < 2 ? 0 : 11 - remainder;

    const cnpj = base.join("") + dv1 + dv2;

    return {
        cnpj,
        cnpjFormatado: `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`
    };
}
