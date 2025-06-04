let listaDeQuestoes = [];
let numeroDaQuestaoAtual = 0;
let pontuacaoFinal = 0;
let certas = 0;
let erradas = 0;
let idTentativa = null;

const idUsuario = sessionStorage.ID_USUARIO;

function onloadEsconder() {
    document.getElementById('pontuacao').style.display = "none";
    document.getElementById('jogo').style.display = "none";
}

async function carregarQuestoesDoBanco() {
    try {
        const resposta = await fetch("/quiz/perguntas");
        listaDeQuestoes = await resposta.json();
        document.getElementById('qtdQuestoes').innerHTML = listaDeQuestoes.length;
        preencherHTMLcomQuestaoAtual(0);
    } catch (erro) {
        alert("Erro ao carregar perguntas do banco: " + erro);
    }
}

async function iniciarQuiz() {
    try {
        const resposta = await fetch("/quiz/tentativa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idUsuarioServer: idUsuario,
                pontuacaoServer: 0
            })
        });

        if (!resposta.ok) {
            throw new Error("Erro ao criar tentativa.");
        }

        const resultado = await resposta.json();
        idTentativa = resultado.idTentativa;  

        document.getElementById('pontuacao').style.display = "flex";
        document.getElementById('jogo').style.display = "flex";
        document.getElementById('btnIniciarQuiz').style.display = "none";

        carregarQuestoesDoBanco();

    } catch (erro) {
        alert("Erro ao iniciar quiz: " + erro.message);
    }
}


function preencherHTMLcomQuestaoAtual(index) {
    habilitarAlternativas(true);
    numeroDaQuestaoAtual = index;
    const questao = listaDeQuestoes[index];
    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = index + 1;
    document.getElementById("spanQuestaoExibida").innerHTML = questao.pergunta;
    document.getElementById("labelOpcaoUm").innerHTML = questao.alternativa_a;
    document.getElementById("labelOpcaoDois").innerHTML = questao.alternativa_b;
    document.getElementById("labelOpcaoTres").innerHTML = questao.alternativa_c;
}

function responderEAvancar() {
    const options = document.getElementsByName("option");
    let selecionada = null;
    for (let option of options) {
        if (option.checked) {
            selecionada = option.value;
            break;
        }
    }
    if (!selecionada) {
        alert("Escolha uma alternativa!");
        return;
    }
    checarResposta(selecionada);
    avancar();
}

function checarResposta(alternativaRespondida) {
    const questao = listaDeQuestoes[numeroDaQuestaoAtual];
    const correta = "alternativa" + questao.alternativa_correta.toUpperCase();
    const acertou = alternativaRespondida === correta;

    if (acertou) {
        pontuacaoFinal++;
        certas++;
        document.getElementById("spanCertas").innerHTML = certas;
    } else {
        erradas++;
        document.getElementById("spanErradas").innerHTML = erradas;
    }

    enviarResposta(questao.idPergunta, alternativaRespondida, acertou);
    numeroDaQuestaoAtual++;
}

function avancar() {
    desmarcarRadioButtons();
    limparCoresBackgroundOpcoes();

    if (numeroDaQuestaoAtual < listaDeQuestoes.length) {
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual);
    } else {
        finalizarJogo();
    }
}

function finalizarJogo() {
    let porcentagem = (pontuacaoFinal / listaDeQuestoes.length);
    let mensagem = "";
    let classe = "";

    if (porcentagem <= 0.3) {
        mensagem = "Você é um bronze em skins em ...";
        classe = "text-danger-with-bg";
    } else if (porcentagem < 0.9) {
        mensagem = "Você é um xerife em skins em!";
        classe = "text-warning-with-bg";
    } else {
        mensagem = "Você é Global em skins, sabe de tudo!";
        classe = "text-success-with-bg";
    }

    mensagem += `<br> Você acertou ${Math.round(porcentagem * 100)}% das questões.`;

    document.getElementById('msgFinal').innerHTML = mensagem;
    document.getElementById('msgFinal').classList.add(classe);
    document.getElementById('spanPontuacaoFinal').innerHTML = pontuacaoFinal;

    document.getElementById('btnResponder').disabled = true;
    document.getElementById('btnTentarNovamente').disabled = false;
    document.getElementById('btnDashboard').disabled = false;
}

function tentarNovamente() {
    window.location.reload();
}

function irParaDashboard() {
    window.location.href='../dashboard/dashboard.html'
}

function desmarcarRadioButtons() {
    const options = document.getElementsByName("option");
    for (let option of options) {
        option.checked = false;
    }
}

function habilitarAlternativas(enable) {
    const ids = ["primeiraOpcao", "segundaOpcao", "terceiraOpcao"];
    for (let id of ids) {
        const el = document.getElementById(id);
        if (el) el.disabled = !enable;
    }
}

function limparCoresBackgroundOpcoes() {
    const options = document.getElementsByName("option");
    for (let option of options) {
        const labelId = option.labels[0].id;
        document.getElementById(labelId).classList.remove("text-danger-with-bg", "text-success-with-bg");
    }
}

async function registrarTentativa() {
    try {
        const resposta = await fetch("/quiz/tentativa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idUsuarioServer: idUsuario,
                pontuacaoServer: pontuacaoFinal
            })
        });

        const resultado = await resposta.json();
        idTentativa = resultado.idTentativa;
        console.log("ID da tentativa registrada:", idTentativa);
    } catch (erro) {
        console.error("Erro ao registrar tentativa: ", erro);
    }
}


async function enviarResposta(idPergunta, alternativaRespondida, acertou) {
    console.log("Enviando resposta:", { idTentativa, idUsuario, idPergunta, alternativaRespondida, acertou });
    try {
        const response = await fetch("/quiz/respostas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idTentativaServer: idTentativa,
                idUsuarioServer: idUsuario,
                idPerguntaServer: idPergunta,
                alternativaRespondidaServer: alternativaRespondida.slice(-1),
                acertouServer: acertou
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro ao enviar resposta:", errorText);
        }
    } catch (erro) {
        console.error("Erro no fetch enviarResposta:", erro);
    }
}

