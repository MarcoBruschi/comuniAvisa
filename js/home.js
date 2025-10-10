const postagens = localStorage.getItem("postagens") ? JSON.parse(localStorage.getItem("postagens")) : [];
localStorage.setItem("postagens", JSON.stringify(postagens));

document.addEventListener("DOMContentLoaded", () => {
  const sessao = JSON.parse(localStorage.getItem("sessao"));
  if (!sessao) {
    window.location.href = "../index.html";
  }
  document.getElementById("sessao-nome").innerHTML = `Bem vindo ao <strong class="text-primary">ComuniAvisa</strong> <strong>${sessao.nome}</strong>👋<br><br>Deseja ver <a href="../paginas/postagens.html">as postagens ativas</a>?`;
});

