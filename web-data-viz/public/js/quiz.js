let listaDeQuestoes = [];
let numeroDaQuestaoAtual = 0;
let pontuacaoFinal = 0;
let certas = 0;
let erradas = 0;
let idTentativa = null;
let tempoRestante = 30;

const idUsuario = sessionStorage.getItem("ID_USUARIO");

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
        iniciarTimer();
    } catch (erro) {
        alert("Erro ao carregar perguntas do banco: " + erro);
    }
}

function iniciarQuiz() {
    document.getElementById('pontuacao').style.display = "flex";
    document.getElementById('jogo').style.display = "flex";
    document.getElementById('btnIniciarQuiz').style.display = "none";

    carregarQuestoesDoBanco();
    btnSubmeter.disabled = false;
    btnTentarNovamente.disabled = true;
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

function submeter() {
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

    btnSubmeter.disabled = true;
    habilitarAlternativas(false);
    checarResposta(selecionada);

    setTimeout(() => {
        avancar();
    }, 2000);
}

function checarResposta(alternativaRespondida) {
    const questao = listaDeQuestoes[numeroDaQuestaoAtual];
    const correta = "alternativa" + questao.alternativa_correta.toUpperCase();
    const acertou = alternativaRespondida === correta;

    if (acertou) {
        pontuacaoFinal++;
        certas++;
        document.getElementById("spanCertas").innerHTML = certas;

        if (alternativaRespondida === "alternativaA") {
            document.getElementById("labelOpcaoUm").classList.add("text-success-with-bg");
        } else if (alternativaRespondida === "alternativaB") {
            document.getElementById("labelOpcaoDois").classList.add("text-success-with-bg");
        } else if (alternativaRespondida === "alternativaC") {
            document.getElementById("labelOpcaoTres").classList.add("text-success-with-bg");
        } 

    } else {
        erradas++;
        document.getElementById("spanErradas").innerHTML = erradas;

        if (alternativaRespondida === "alternativaA") {
            document.getElementById("labelOpcaoUm").classList.add("text-danger-with-bg");
        } else if (alternativaRespondida === "alternativaB") {
            document.getElementById("labelOpcaoDois").classList.add("text-danger-with-bg");
        } else if (alternativaRespondida === "alternativaC") {
            document.getElementById("labelOpcaoTres").classList.add("text-danger-with-bg");
        }

        if (correta === "alternativaA") {
            document.getElementById("labelOpcaoUm").classList.add("text-success-with-bg");
        } else if (correta === "alternativaB") {
            document.getElementById("labelOpcaoDois").classList.add("text-success-with-bg");
        } else if (correta === "alternativaC") {
            document.getElementById("labelOpcaoTres").classList.add("text-success-with-bg");
        } 
    }

    enviarResposta(questao.idPergunta, alternativaRespondida, acertou);
    numeroDaQuestaoAtual++;
}

function avancar() {
    btnSubmeter.disabled = false;
    desmarcarRadioButtons();
    limparCoresBackgroundOpcoes();

    if (numeroDaQuestaoAtual < listaDeQuestoes.length) {
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual);
    } else {
        finalizarJogo();
    }
}

async function finalizarJogo() {
    document.getElementById('msgFinal').innerHTML = "Calculando pontuação...";
    await registrarTentativa();

    let porcentagem = (pontuacaoFinal / listaDeQuestoes.length);
    let mensagem = "";
    let classe = "";

    if (porcentagem <= 0.3) {
        mensagem = "Parece que você não estudou...";
        classe = "text-danger-with-bg";
    } else if (porcentagem < 0.9) {
        mensagem = "Pode melhorar na próxima, hein!";
        classe = "text-warning-with-bg";
    } else {
        mensagem = "Uau, parabéns!";
        classe = "text-success-with-bg";
    }

    mensagem += `<br> Você acertou ${Math.round(porcentagem * 100)}% das questões.`;

    document.getElementById('msgFinal').innerHTML = mensagem;
    document.getElementById('msgFinal').classList.add(classe);
    document.getElementById('spanPontuacaoFinal').innerHTML = pontuacaoFinal;

    btnTentarNovamente.disabled = false;
    btnSubmeter.disabled = true;
}

function desmarcarRadioButtons() {
    const options = document.getElementsByName("option");
    for (let option of options) {
        option.checked = false;
    }
}

function habilitarAlternativas(enable) {
    const radios = ["primeiraOpcao", "segundaOpcao", "terceiraOpcao"];
    for (let id of radios) {
        document.getElementById(id).disabled = !enable;
    }
}

function limparCoresBackgroundOpcoes() {
    const options = document.getElementsByName("option");
    for (let option of options) {
        document.getElementById(option.labels[0].id).classList.remove("text-success-with-bg", "text-danger-with-bg");
    }
}

function tentarNovamente() {
    window.location.reload();
}

async function registrarTentativa() {
    try {
        console.log("Tentativa -> ID_USUARIO:", idUsuario, "| pontuação:", pontuacaoFinal);

        const resposta = await fetch("/quiz/tentativa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idUsuarioServer: idUsuario,
                pontuacaoServer: pontuacaoFinal
            })
        });

        if (!resposta.ok) {
            const texto = await resposta.text();
            throw new Error("Erro do servidor: " + texto);
        }

        const resultado = await resposta.json();
        idTentativa = resultado.idTentativa;
    } catch (erro) {
        console.error("Erro ao registrar tentativa: ", erro.message);
    }
}

async function enviarResposta(idPergunta, alternativaRespondida, acertou) {
    try {
        await fetch("/quiz/respostas", {
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
    } catch (erro) {
        console.error("Erro ao enviar resposta: ", erro);
    }
}

function iniciarTimer() {
    tempoRestante = 30;
    document.getElementById("spanTempoRestante").innerHTML = tempoRestante;
    document.getElementById("barraProgressoInterna").style.width = "100%";

    timer = setInterval(() => {
        tempoRestante--;
        document.getElementById("spanTempoRestante").innerHTML = tempoRestante;
        document.getElementById("barraProgressoInterna").style.width = `${(tempoRestante / 30) * 100}%`;

        if (tempoRestante <= 0) {
            clearInterval(timer);
            submeter();
        }
    }, 1000);
}
