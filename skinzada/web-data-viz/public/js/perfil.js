async function carregarPerfil() {
    const idUsuario = sessionStorage.ID_USUARIO;

    try {
        const resposta = await fetch(`/usuarios/perfil/${idUsuario}`);
        const dados = await resposta.json();

        document.getElementById("nomeUsuario").textContent = dados.nomeUsuario;
        document.getElementById("emailUsuario").textContent = dados.email;
        document.getElementById("imgPerfil").src = dados.fotoPerfil
            ? `/uploads/${dados.fotoPerfil}`
            : "../../assets/img/default.png";
    } catch (erro) {
        alert("Erro ao carregar perfil: " + erro.message);
    }
}

document.getElementById("formFoto").addEventListener("submit", async function (event) {
    event.preventDefault();

    const idUsuario = sessionStorage.ID_USUARIO;
    const input = document.getElementById("inputFoto");

    if (input.files.length === 0) return alert("Escolha uma imagem!");

    const formData = new FormData();
    formData.append("foto", input.files[0]);

    try {
        const resposta = await fetch(`/usuarios/uploadFoto/${idUsuario}`, {
            method: "POST",
            body: formData
        });

        const dados = await resposta.json();
        alert("Foto atualizada!");
        document.getElementById("imgPerfil").src = `/uploads/${dados.nomeArquivo}`;
    } catch (erro) {
        console.error("Erro ao atualizar foto:", erro);
        alert("Erro ao atualizar foto.");
    }
});
