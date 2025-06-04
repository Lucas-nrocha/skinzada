var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");

var usuarioController = require("../controllers/usuarioController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("public/assets/uploads"));
    },
    filename: function (req, file, cb) {
        const nomeFinal = Date.now() + path.extname(file.originalname);
        cb(null, nomeFinal);
    }
});

const upload = multer({ storage: storage });

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/uploadFoto/:idUsuario", upload.single("foto"), (req, res) => {
    usuarioController.uploadFoto(req, res);
});

router.get("/perfil/:idUsuario", (req, res) => {
    usuarioController.exibirPerfil(req, res);
});

module.exports = router;