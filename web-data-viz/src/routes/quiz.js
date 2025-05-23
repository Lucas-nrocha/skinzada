var express = require("express");
var router = express.Router();
var quizController = require("../controllers/quizController");

// Rota GET para listar perguntas
router.get("/perguntas", function (req, res) {
    quizController.listarPerguntas(req, res);
});

// Rota POST para registrar tentativa
router.post("/tentativa", function (req, res) {
    quizController.registrarTentativa(req, res);
});

// Rota POST para registrar resposta
router.post("/respostas", function (req, res) {
    quizController.registrarResposta(req, res);
});

module.exports = router;
