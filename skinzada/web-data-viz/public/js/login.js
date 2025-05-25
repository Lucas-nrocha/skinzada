function entrar() {
    var email = ipt_email.value;
    var senha = ipt_senha.value;

    if (email === "" || senha === "") {
        alert("Preencha todos os campos!");
        return false;
    }

    console.log("E-mail:", email, "Senha:", senha);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha
        })
    })
    .then(resposta => {
        if (resposta.ok) {
            return resposta.json();
        } else {
            throw new Error("Erro ao autenticar.");
        }
    })
    .then(json => {
        console.log("JSON de resposta:", json);

        sessionStorage.EMAIL_USUARIO = json.email;
        sessionStorage.NOME_USUARIO = json.nomeUsuario;
        sessionStorage.ID_USUARIO = json.idUsuario;

        window.location = "perfil.html";
    })
    .catch(erro => {
        console.error("Erro:", erro);
        alert("Erro ao tentar logar. Verifique o console.");
    });
}
