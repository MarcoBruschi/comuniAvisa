document.addEventListener("DOMContentLoaded", () => {
  const sessao = JSON.parse(localStorage.getItem("sessao"));
  if (!sessao) {
    window.location.href = "../index.html";
  }
  document.getElementById("sessao-nome").innerHTML = `Olá <strong>${sessao.nome}</strong>`;
});

