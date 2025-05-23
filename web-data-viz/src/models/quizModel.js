var database = require("../database/config");

// LISTAR PERGUNTAS DO QUIZ
function listarPerguntas() {
    var instrucaoSql = `
        SELECT 
            idPergunta,
            pergunta,
            alternativa_a,
            alternativa_b,
            alternativa_c,
            alternativa_correta
        FROM perguntas
    `;
    return database.executar(instrucaoSql);
}

// INSERIR TENTATIVA
function registrarTentativa(idUsuario, pontuacao) {
    var instrucaoSql = `
        INSERT INTO tentativas_quiz (idUsuario, data_tentativa, pontuacao)
        VALUES (${idUsuario}, NOW(), ${pontuacao});
    `;
    return database.executar(instrucaoSql);
}

// PEGAR ID DA ÚLTIMA TENTATIVA (auto_increment)
function pegarUltimaTentativa(idUsuario) {
    var instrucaoSql = `
        SELECT idTentativa FROM tentativas_quiz 
        WHERE idUsuario = ${idUsuario} 
        ORDER BY idTentativa DESC 
        LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

// INSERIR RESPOSTAS DE UMA TENTATIVA
function registrarResposta(idTentativa, idUsuario, idPergunta, alternativaRespondida, acertou) {
    var instrucaoSql = `
        INSERT INTO respostas_usuario 
        (idTentativa, idUsuario, idPergunta, alternativa_respondida, acertou)
        VALUES (${idTentativa}, ${idUsuario}, ${idPergunta}, '${alternativaRespondida}', ${acertou});
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPerguntas,
    registrarTentativa,
    pegarUltimaTentativa,
    registrarResposta
};
