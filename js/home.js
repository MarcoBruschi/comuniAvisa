document.addEventListener("DOMContentLoaded", () => {
  const sessao = JSON.parse(localStorage.getItem("sessao"));
  document.getElementById("sessao-nome").innerHTML = `Olá <strong>${sessao.nome}</strong>`;
});

