var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); 

                                if (resultadoAutenticar.length == 1) {
                                    res.json({
                                        idUsuario: resultadoAutenticar[0].idUsuario,
                                        nome: resultadoAutenticar[0].nomeUsuario,
                                        email: resultadoAutenticar[0].email
                                    });
                                }
                                 else if (resultadoAutenticar.length == 0) {
                                  res.status(403).send("Email e/ou senha inválido(s)");
                                } else {
                                  res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                                }
                            }).catch(
                                function (erro) {
                                console.log(erro);
                                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                                res.status(500).json(erro.sqlMessage);
                            }
                        );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;


    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function uploadFoto(req, res) {
    const idUsuario = req.params.idUsuario;
    const nomeArquivo = req.file.filename;

    usuarioModel.atualizarFotoPerfil(idUsuario, nomeArquivo)
        .then(() => res.status(200).json({ mensagem: "Foto atualizada com sucesso!", nomeArquivo }))
        .catch(erro => {
            console.log("Erro ao atualizar foto:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function uploadFoto(req, res) {
    const idUsuario = req.params.idUsuario;
    const nomeArquivo = req.file?.filename;

    if (!nomeArquivo) {
        return res.status(400).send("Nenhuma imagem foi enviada.");
    }

    usuarioModel.atualizarFotoPerfil(idUsuario, nomeArquivo)
        .then(() => {
            res.status(200).json({
                mensagem: "Foto de perfil atualizada com sucesso!",
                nomeArquivo: nomeArquivo
            });
        })
        .catch(erro => {
            console.error("Erro ao atualizar foto:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function exibirPerfil(req, res) {
    const idUsuario = req.params.idUsuario;

    usuarioModel.buscarPerfil(idUsuario)
        .then(resultado => {
            if (resultado.length === 1) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(404).send("Usuário não encontrado.");
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar perfil:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    autenticar,
    cadastrar,
    uploadFoto,
    exibirPerfil
};
