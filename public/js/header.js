window.addEventListener("DOMContentLoaded", async () => {
    const nomeUsuario = sessionStorage.NOME_USUARIO;
    const emailUsuario = sessionStorage.EMAIL_USUARIO;
    const idUsuario = sessionStorage.ID_USUARIO;
  
    const ul = document.querySelector("header .conteudo ul");

    if (!ul) return;

    if (nomeUsuario && emailUsuario && idUsuario) {
      try {
        const resposta = await fetch(`/usuarios/perfil/${idUsuario}`);
        const dados = await resposta.json();
  
        const foto = dados.foto_perfil
          ? `/assets/uploads/${dados.foto_perfil}`
          : "../../assets/imgs/avatar-padrao.png";
  
        ul.innerHTML = `
          <li><a href="../../index.html">Home</a></li>
          <li><a href="#">Sobre</a></li>
          <li><a href="../quiz/quizz.html">Quiz</a></li>
          <li>
            <a href="../cadastro/perfil.html">
              <img src="${foto}" alt="Avatar" class="avatar-header" title="${nomeUsuario}" />
            </a>
          </li>
          <li><button onclick="limparSessao()" class="botao-sair">Sair</button></li>
        `;
      } catch (erro) {
        console.error("Erro ao carregar avatar:", erro);
      }
    } else {
      ul.innerHTML = `
        <li><a href="../../index.html">Home</a></li>
        <li><a href="../pages/sobre-mim/sobremim.html">Sobre</a></li>
        <li><a href="../quiz/quizz.html" style="display: none">Quiz</a></li>
        <li><a href="../cadastro/login.html">Login</a></li>
        <li><a href="../cadastro/cadastro.html">Registro</a></li>
      `;
    }
  });
  