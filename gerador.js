/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Criador:『Tosh』
➪ Módulo: Gerador de Imagens e Figurinhas IA
➪ Função: Cria imagens personalizadas e figurinhas prontas usando API gratuita
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/

//➪ Importa a biblioteca para fazer requisições HTTP
const axios = require('axios');

//➪ CONFIGURAÇÕES DE PROTEÇÃO E DESEMPENHO
//➪ timeout: Tempo máximo de espera por resposta 30 segundos
//➪ maxTentativas: Quantas vezes tenta novamente se falhar
//➪ atrasoTentativa: Tempo de espera entre cada tentativa em milissegundos
const CONFIG = {
timeout: 30000,
maxTentativas: 2,
atrasoTentativa: 1200
};

//➪ CABEÇALHOS PARA EVITAR BLOQUEIOS
//➪ Simula um navegador real para não ser barrado pelo servidor
const CABECALHOS = {
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  "Accept": "*/*"
};

//➪ FUNÇÃO AUXILIAR DE NOVA TENTATIVA
//➪ Se a requisição falhar, tenta novamente automaticamente até atingir o limite
async function tentarExecutar(funcao) {
let ultimoErro = null;
let tentativa = 1;

while (tentativa <= CONFIG.maxTentativas) {
try {
return await funcao();
} catch (erro) {
ultimoErro = erro;
tentativa = tentativa + 1;
await new Promise(resolve => setTimeout(resolve, CONFIG.atrasoTentativa));
}
}
throw ultimoErro;
}

//➪ FUNÇÃO: GERAR IMAGEM NORMAL EM ALTA RESOLUÇÃO
//➪ Recebe o texto/descrição e retorna link da imagem 1024x1024 sem marca d'água
async function imagemAi(texto) {
return tentarExecutar(async () => {
const prompt = encodeURIComponent(texto);
const url = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=1024&nologo=true`;

await axios.get(url, { headers: CABECALHOS, timeout: CONFIG.timeout });

return {
status: true,
criador: "Tosh Tech",
resultado: {
imagem: url }
};
});
}

//➪ FUNÇÃO: GERAR FIGURINHA NO FORMATO WEB-P
//➪ Otimizado para WhatsApp/Telegram: tamanho 512x512 e formato leve transparente
async function stickAi(texto) {
return tentarExecutar(async () => {
const prompt = encodeURIComponent(texto);
//➪ Tamanho ideal ,formato webp compatível com figurinhas
const url = `https://image.pollinations.ai/prompt/${prompt}?width=512&height=512&nologo=true&format=webp`;

await axios.get(url, { headers: CABECALHOS, timeout: CONFIG.timeout });

return {
status: true,
criador: "Tosh Tech",
imagem: [url] };
});
}

//➪ Exporta As Funções Para Usar Nas Rotas Da Api
module.exports = { imagemAi, stickAi };

