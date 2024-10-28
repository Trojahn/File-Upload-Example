const bd = require("mysql2/promise");

async function conecta() {
    const conexao = await bd.createConnection({
        host: "localhost",
        port: 3306,
        database: "exemplo_upload_arquivo",
        user: "root",
        password: ""
    });
    return conexao;
}

async function existeLogin(login) {
    let conexao = await conecta();
    let sql = "SELECT COUNT(*) as qtde FROM perfil WHERE login = ?;"
    const [resposta] = await conexao.query(sql, [login]);
    return resposta[0].qtde > 0;
}

async function existeId(id) {
    let conexao = await conecta();
    let sql = "SELECT COUNT(*) as qtde FROM perfil WHERE id = ?;"
    const [resposta] = await conexao.query(sql, [id]);
    return resposta[0].qtde > 0;
}

async function cadastrarPerfil(login, nomeArquivo) {
    let conexao = await conecta();
    let sql = "INSERT INTO perfil(login, foto) VALUES (?, ?);"
    const resposta = await conexao.query(sql, [login, nomeArquivo]);
    return resposta[0].affectedRows;
}

async function listarPerfil() {
    const conexao = await conecta();
    let sql = "SELECT * FROM perfil";
    let [respostas] = await conexao.query(sql, []);
    return respostas;
}

async function obterFotoPorId(id) {
    const conexao = await conecta();
    let sql = "SELECT foto FROM perfil WHERE id = ?;";
    let [resposta] = await conexao.query(sql, [id]);
    return resposta[0].foto;
}

async function removerPerfilPorId(id) {
    let conexao = await conecta();
    let sql = "DELETE FROM perfil WHERE id = ?;"
    const resposta = await conexao.query(sql, [id]);
    return resposta[0].affectedRows;
}

module.exports = { existeLogin, cadastrarPerfil, listarPerfil, obterFotoPorId, existeId, removerPerfilPorId }