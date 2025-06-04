var database = require("../database/config");

function buscarValoresUltimos6Meses(idSkin) {
    var instrucaoSql = `
        SELECT 
            DATE_FORMAT(data_referencia, '%M') AS mes,
            AVG(valor) AS valor_medio
        FROM valor_skin
        WHERE idSkins = ${idSkin}
          AND data_referencia >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        GROUP BY mes
        ORDER BY data_referencia ASC;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarValoresUltimos6Meses
};
