document.addEventListener("DOMContentLoaded", () => {
    const idUsuario = sessionStorage.ID_USUARIO;
    const nomeUsuario = sessionStorage.NOME_USUARIO;

    fetch(`/quiz/estatisticas/${idUsuario}`)
        .then(res => res.json())
        .then(dados => {
            montarGraficoDesempenho(dados.acertos, dados.erros);
            popularLista(dados.maisAcertadas, "listaMaisAcertadas");
            popularLista(dados.maisErradas, "listaMaisErradas");
        })
        .catch(err => {
            console.error("Erro ao carregar estatísticas: ", err);
        });
});

function montarGraficoDesempenho(acertos, erros) {
    const ctx = document.getElementById("graficoDesempenho").getContext("2d");

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Acertos', 'Erros'],
            datasets: [{
                label: 'Desempenho',
                data: [acertos, erros],
                backgroundColor: ['#4caf50', '#f44336'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function popularLista(lista, idElemento) {
    const ul = document.getElementById(idElemento);
    ul.innerHTML = "";

    if (!lista || lista.length === 0) {
        ul.innerHTML = "<li>Nenhuma informação.</li>";
        return;
    }

    lista.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.pergunta} (${item.qtd}x)`;
        ul.appendChild(li);
    });
}
