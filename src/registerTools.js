import z from "zod";
import { validarCPF } from "./handlers/validarCPF.js";

export function registerTools(server) {

  server.registerTool(
    "validar_cpf",
    {
      description: "Valida um CPF usando o algoritmo de dígitos verificadores do CPF",
      inputSchema: z.object({
        cpf: z.string()
      })
    },
    ({ cpf }) => ({
      content: [{ type: "text", text: JSON.stringify(validarCPF(cpf)) }]
    })
  );
}

// CPF/CNPJ (gerar, validar, formatar)
// CEP (buscar, validar)
// BRL (formatar, converter)
// Telefone BR (gerar, validar)
// Dados fake (nome, email, empresa)

// gerarCPF()	Gera 9 dígitos aleatórios + 2 dígitos verificadores (algoritmo módulo 11)
// validarCPF(cpf)	Remove não-numéricos → valida dígitos 1 e 2 com módulo 11
// gerarCNPJ()	12 dígitos aleatórios + 2 verificadores (pesos diferentes)
// validarCNPJ(cnpj)	Mesma lógica do CPF, mas com 12+2 dígitos e pesos específicos
// formatarCPF(cpf)	12345678901 → 123.456.789-01
// formatarCNPJ(cnpj)	12345678000195 → 12.345.678/0001-95

// 2. Endereço
// buscarCEP(cep)	Chama API ViaCEP → retorna logradouro, bairro, cidade, UF
// validarCEP(cep)	Regex: /^\d{5}-?\d{3}$/ (8 dígitos)
// gerarEndereco()	Retorna endereço aleatório com rua, número, bairro, cidade, UF, CEP
// listarUFs()	Retorna array com 27 UF`s válidos
// listarMunicipios(uf)	Lista municípios de uma UF (pode ser hardcoded ou API)

// 3. Telefone
// gerarTelefone()	(DDD) 9XXXX-XXXX ou (DDD) XXXX-XXXX
// validarTelefone(tel)	Regex: /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/
// formatarTelefone(tel)	11987654321 → (11) 98765-4321
// gerarDDD()	Retorna DDD válido aleatório

// 4. Moeda
// formatarBRL(valor)	1234.56 → R$ 1.234,56
// parseBRL(texto)	R$ 1.234,56 → 1234.56
// converterMoeda(valor, de, para)	Chama API exchangerate-api
// gerarValor()	Retorna valor aleatório R$ XX,XX

// 5. Validação
// validarEmail(email)	Regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// validarURL(url)	new URL(url) → se não throw, é válida
// validarSenha(senha)	Mín 8 chars, 1 maiúscula, 1 minúscula, 1 número, 1 especial
// validarIPv4(ip)	4 octetos de 0-255
// validarIPv6(ip)	8 grupos de 4 hex

// 6. Texto
// slugify(texto)	Lowercase → remove acentos → substitui espaços por -
// truncar(texto, max)	texto.slice(0, max) + '...'
// gerarSlug()	slugify + timestamp ou random
// capitalize(texto)	Primeira letra maiúscula
// camelCase(texto)	meu-texto → meuTexto
// snakeCase(texto)	meu-texto → meu_texto
// gerarLorem(qtd)	Retorna Lorem Ipsum com X palavras

// 7. Data/Hora
// dataAtual()	new Date().toLocaleDateString('pt-BR')
// horaAtual()	new Date().toLocaleTimeString('pt-BR')
// adicionarDias(data, dias)	new Date(data) + dias
// diferenciarDatas(d1, d2)	Diferença em dias, horas, minutos
// formatarData(data, formato)	YYYY-MM-DD, DD/MM/YYYY, etc
// converterFuso(data, fuso)	UTC → America/Sao_Paulo, etc
// ehFerias(data)	Verifica se é feriado nacional

// 8. Números
// gerarInteiro(min, max)	Math.floor(Math.random() * (max - min + 1)) + min
// gerarFloat(min, max, decimais)	Similar, com .toFixed(decimais)
// formatarNumero(num)	1234567 → 1.234.567
// calcularPorcentaje(valor, pct)	valor * (pct / 100)
// clamp(valor, min, max)	Limita valor entre min e max

// 9. Crypto/Hash
// gerarUUID()	crypto.randomUUID()
// md5(texto)	crypto.createHash('md5').update(texto).digest('hex')
// sha256(texto)	Similar com SHA-256
// base64Encode(texto)	Buffer.from(texto).toString('base64')
// base64Decode(hash)	Buffer.from(hash, 'base64').toString()
// 10. JSON/Dados
// jsonParaObjeto(json)	JSON.parse(json) com tratamento de erro
// objetoParaJSON(obj)	JSON.stringify(obj, null, 2)
// validarJSON(json)	Tenta parsear → true/false
// extrairCampo(json, campo)	Acessa campo aninhado com dot notation
// mesclarJSON(obj1, obj2)	{...obj1, ...obj2}
// 11. Dados Fakes
// gerarNome()	Array de nomes + sobrenomes → combina aleatório
// gerarEmail(nome)	nome.sobrenome@dominio.com
// gerarSenha(tamanho)	Caracteres aleatórios
// gerarEmpresa()	Nome de empresa fake
// gerarTexto(linhas)	Lorem Ipsum
// gerarCor()	#RRGGBB aleatório
