const skinsModel = require('../models/skinsModel');
exports.obterValoresUltimos6Meses = async (req, res) => {
    const idUsuario = Number(req.params.idUsuario);
  
    if (isNaN(idUsuario) || idUsuario <= 0) {
      return res.status(400).json({ erro: 'ID de usuário inválido' });
    }
  
    try {
      const dados = await skinsModel.buscarValoresUltimos6Meses(idUsuario);
      res.status(200).json(dados);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro ao buscar valores da skin' });
    }
  };
  
  exports.obterValoresUltimos6Meses = async (req, res) => {
    const idSkin = req.params.idSkin;
  
    try {
      const dados = await skinsModel.buscarValoresUltimos6Meses(idSkin);
      res.status(200).json(dados);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro ao buscar valores da skin' });
    }
  };
  
