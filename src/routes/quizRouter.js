var express = require("express");
var router = express.Router();
var quizController = require("../controllers/quizController");

router.get("/perguntas", function (req, res) {
    quizController.listarPerguntas(req, res);
});

router.post("/tentativa", function (req, res) {
    quizController.registrarTentativa(req, res);
});

router.post("/respostas", function (req, res) {
    quizController.registrarResposta(req, res);
});

router.get("/dashboard/:idUsuario", function (req, res) {
    quizController.dashboard(req, res);
});

module.exports = router;
