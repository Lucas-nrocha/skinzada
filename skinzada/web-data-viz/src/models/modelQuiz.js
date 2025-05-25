var database = require("../database/config");

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

function registrarTentativa(idUsuario, pontuacao) {
    var instrucaoSql = `
        INSERT INTO tentativas_quiz (idUsuario, data_tentativa, pontuacao)
        VALUES (${idUsuario}, NOW(), ${pontuacao});
    `;
    return database.executar(instrucaoSql);
}

function pegarUltimaTentativa(idUsuario) {
    var instrucaoSql = `
        SELECT idTentativa FROM tentativas_quiz 
        WHERE idUsuario = ${idUsuario} 
        ORDER BY idTentativa DESC 
        LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

function registrarResposta(idTentativa, idUsuario, idPergunta, alternativaRespondida, acertou) {
    var instrucaoSql = `
        INSERT INTO respostas_usuario 
        (idTentativa, idUsuario, idPergunta, alternativa_respondida, acertou)
        VALUES (${idTentativa}, ${idUsuario}, ${idPergunta}, '${alternativaRespondida}', ${acertou});
    `;
    return database.executar(instrucaoSql);
}

function dadosDashboard(idUsuario) {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM respostas_usuario WHERE idUsuario = ${idUsuario} AND acertou = 1) AS acertos,
            (SELECT COUNT(*) FROM respostas_usuario WHERE idUsuario = ${idUsuario} AND acertou = 0) AS erros,
            (SELECT pergunta FROM perguntas 
             JOIN respostas_usuario ON perguntas.idPergunta = respostas_usuario.idPergunta 
             WHERE respostas_usuario.acertou = 1 
             GROUP BY perguntas.idPergunta 
             ORDER BY COUNT(*) DESC 
             LIMIT 1) AS perguntaMaisAcertada,
            (SELECT pergunta FROM perguntas 
             JOIN respostas_usuario ON perguntas.idPergunta = respostas_usuario.idPergunta 
             WHERE respostas_usuario.acertou = 0 
             GROUP BY perguntas.idPergunta 
             ORDER BY COUNT(*) DESC 
             LIMIT 1) AS perguntaMaisErrada;
    `;
    return database.executar(sql);
}

module.exports = {
    listarPerguntas,
    registrarTentativa,
    pegarUltimaTentativa,
    registrarResposta,
    dadosDashboard
};
