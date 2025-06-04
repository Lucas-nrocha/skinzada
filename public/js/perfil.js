async function carregarPerfil() {
    const idUsuario = sessionStorage.ID_USUARIO;

    try {
        const resposta = await fetch(`/usuarios/perfil/${idUsuario}`);
        const dados = await resposta.json();

        document.getElementById("nomeUsuario").textContent = dados.nomeUsuario;
        document.getElementById("emailUsuario").textContent = dados.email;

        const caminhoFoto = dados.foto_perfil
            ? `/assets/uploads/${dados.foto_perfil}`
            : `/assets/imgs/avatar-padrao.png`;

        document.getElementById("fotoPerfil").src = caminhoFoto;

    } catch (erro) {
        alert("Erro ao carregar perfil: " + erro.message);
    }
}

document.getElementById("formFoto").addEventListener("submit", async function (event) {
    event.preventDefault();

    const idUsuario = sessionStorage.ID_USUARIO;
    const input = document.getElementById("inputFoto");

    if (input.files.length === 0) {
        alert("Escolha uma imagem!");
        return;
    }

    const formData = new FormData();
    formData.append("foto", input.files[0]);

    try {
        const resposta = await fetch(`/usuarios/uploadFoto/${idUsuario}`, {
            method: "POST",
            body: formData
        });

        const dados = await resposta.json();
        alert("Foto atualizada com sucesso!");

        document.getElementById("fotoPerfil").src = `/assets/uploads/${dados.nomeArquivo}`;
    } catch (erro) {
        console.error("Erro ao atualizar foto:", erro);
        alert("Erro ao atualizar foto.");
    }
});
