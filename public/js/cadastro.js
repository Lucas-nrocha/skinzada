function cadastrar() {
    var nomeVar = ipt_nome.value;
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    console.log
        (
            "Nome " + nomeVar + "\n",
            "E-mail " + emailVar + "\n",
            "Senha " + senhaVar + "\n"
        )

    if
        (
        nomeVar == "" ||
        emailVar == "" ||
        senhaVar == "" 
    ) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        return false;
    } else {
        console.log('sumir mensagem')
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        }),
    })
    .then(async (resposta) => {
        console.log("Status da resposta:", resposta.status);
        if (resposta.ok) {
            window.location = "login.html";
        } else {
            const textoErro = await resposta.text();
            console.error("Erro do servidor:", textoErro);
            alert("Erro ao cadastrar: " + textoErro);
            throw textoErro;
        }
    })
    .catch(erro => {
        console.error("Erro ao tentar realizar o cadastro!", erro);
    });
    
    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none";
}