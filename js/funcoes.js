function sair() {
  if (localStorage.getItem("sessao")) {
    localStorage.removeItem("sessao");
    window.location.href = "../index.html";
  }
}