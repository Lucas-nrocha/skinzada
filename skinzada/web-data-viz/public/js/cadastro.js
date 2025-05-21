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
            nome: nomeVar,
            email: emailVar,
            senha: senhaVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {               
                window.location = "login.html";
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        });
    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none";
}