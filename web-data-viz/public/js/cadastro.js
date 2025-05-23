function cadastrar(nome, email, senha) {

    console.log
        (
            "Nome " + nome + "\n",
            "E-mail " + email+ "\n",
            "Senha " + senha + "\n"
        )

    if
        (
        nome == "" ||
        email == "" ||
        senha == "" 
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
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha
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