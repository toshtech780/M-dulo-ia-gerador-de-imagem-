const path = require('path');//➪ Cria caminhos de pasta corretos
//➪ Caminhos globais
global.Raiz_Tech = process.cwd();
//➪ obs static também da certo é umas de várias opções de garantia de que a rota vai encontrar o arquivo. porém mapeamento é garantido porque ele vai procurar em todos os arquivos, nao só em pasras pré definidas
/*
⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱
༺『Tosh Tech』༻
➪ Módulos『Inteligência artificial』༻
⊰᯽⊱┈────────❊╌────────┈⊰᯽⊱
*/
//➪ Ajustar o caminho conforme o projeto 
const caminhostreamImagem = path.join(Raiz_Tech, 'banco_dados', 'inteligencia_artificial',  'imagem');
const { imagemAi, stickAi } = require(caminhostreamImagem);

//➪ Inteligência Stick AI
app.get("/api/inteligencia/stickAi", async (req, res) => {
const { apikey, query } = req.query;
if (!apikey) return res.status(400).json({ erro: "Parâmetro 'apikey' é obrigatório" });
if (!query) return res.status(400).json({ erro: "Parâmetro 'query' é obrigatório" });
const erro = await buscarUsuarioPorApiKey(apikey, 'figurunha');
if (erro) return res.status(403).json({ erro });
try {
const data = await stickAi(query);
let imgUrl = "";
if (data && data.imagem && Array.isArray(data.imagem) && data.imagem.length > 0) {
imgUrl = data.imagem[0];
}
if (!imgUrl) return res.status(404).json({ erro: "Nenhuma imagem retornada" });
const resposta = await axios.get(imgUrl, { responseType: "arraybuffer" });
res.setHeader("Content-Type", "image/webp");
res.send(resposta.data);
} catch (e) {
console.error(e);
res.status(500).json({ 
status: "offline", 
criador,
erro: "Erro ao gerar a figurinha"  });
}
});

//➪ Inteligência Imagem IA
app.get("/api/inteligencia/imagemAi", async (req, res) => {
const { apikey, query } = req.query;
if (!apikey) return res.status(400).json({ erro: "Parâmetro 'apikey' é obrigatório" });
if (!query) return res.status(400).json({ erro: "Parâmetro 'query' é obrigatório" });
const erro = await buscarUsuarioPorApiKey(apikey, 'NOME');
if (erro) return res.status(403).json({ erro });
try {
const result = await imagemAi(query);
console.log(result);
let urlImagem = "";
if (result && result.resultado && result.resultado.imagem) {
urlImagem = result.resultado.imagem;
}
if (!urlImagem) return res.status(404).json({ erro: "Imagem não encontrada" });
const response = await axios.get(urlImagem, { responseType: "arraybuffer" });
res.setHeader("Content-Type", response.headers["content-type"]);
res.send(response.data);
} catch (e) {
console.error(e);
res.status(500).json({
status: "offline",
criador,
erro: "Deu erro na sua solicitação" });
}
});

//➪ Obs: isso buscarUsuarioPorApiKey é do meu projeto para verificação de plano do usuário ajuste conforme o seu projeto 
