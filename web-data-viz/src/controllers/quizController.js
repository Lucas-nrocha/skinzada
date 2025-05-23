var quizModel = require("../models/quizModel");

// GET /quiz/perguntas
function listarPerguntas(req, res) {
    quizModel.listarPerguntas()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma pergunta encontrada!");
            }
        }).catch(function (erro) {
            console.log("Erro ao listar perguntas:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// POST /quiz/tentativa
function registrarTentativa(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var pontuacao = req.body.pontuacaoServer;

    if (idUsuario == undefined || pontuacao == undefined) {
        res.status(400).send("Campos obrigatórios não enviados.");
    } else {
        quizModel.registrarTentativa(idUsuario, pontuacao)
            .then(() => {
                return quizModel.pegarUltimaTentativa(idUsuario);
            })
            .then(resultado => {
                res.status(200).json({ idTentativa: resultado[0].idTentativa });
            })
            .catch(erro => {
                console.log("Erro ao registrar tentativa:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

// POST /quiz/respostas
function registrarResposta(req, res) {
    var idTentativa = req.body.idTentativaServer;
    var idUsuario = req.body.idUsuarioServer;
    var idPergunta = req.body.idPerguntaServer;
    var alternativaRespondida = req.body.alternativaRespondidaServer;
    var acertou = req.body.acertouServer;

    if (!idTentativa || !idUsuario || !idPergunta || !alternativaRespondida) {
        res.status(400).send("Dados incompletos para registrar resposta.");
    } else {
        quizModel.registrarResposta(idTentativa, idUsuario, idPergunta, alternativaRespondida, acertou)
            .then(resultado => {
                res.status(200).json(resultado);
            }).catch(erro => {
                console.log("Erro ao registrar resposta:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    listarPerguntas,
    registrarTentativa,
    registrarResposta
};
