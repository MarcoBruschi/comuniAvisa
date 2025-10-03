const postagensDiv = document.getElementById("postagens");
const alertas = localStorage.getItem("alertas") ? JSON.parse(localStorage.getItem("alertas")) : [];
const sessao = JSON.parse(localStorage.getItem("sessao"));

function inserirPostagens(postagens) {
  postagensDiv.innerHTML = postagens.map(postagem => 
    `<div id=${postagem.id} class="card pb-1" style="max-width: 15em; max-height: 25em">
      <img src="${postagem.imagem}" class="card-img-top"/>
      <h5 class="card-title p-1">${postagem.titulo}</h5>
      <p class="card-text p-1">${postagem.descricao}</p>
      <p class="p-1">Postado por <strong>${postagem.nomeUsuario}</strong></p>
      <p class="p-1">${postagem.data}</p>
      ${botoes(postagem.usuario, sessao.email)}
    </div>`
  ).join("");
}

function botoes(emailPostagem, emailSessao) {
  if (emailPostagem === emailSessao) {
    return `<div class="text-center"> <button class="btn btn-danger excluir-post">Excluir post</button> <button class="btn btn-warning editar-post">Editar post</button> </div>`
  } else {
    return ``;
  }
}

function excluirPostagem(idPostagem) {
  const novosAlertas = alertas.filter(alertas => alertas.id != idPostagem);
  localStorage.setItem("alertas", JSON.stringify(novosAlertas));
}

function editarPostagem(idPostagem) {
  localStorage.setItem("postagemEditar", idPostagem);
  window.location.href = "../paginas/alerta.html";
}

document.addEventListener("DOMContentLoaded", () => {
  inserirPostagens(alertas);
  const btnExcluirPostagem = document.querySelectorAll(".excluir-post");
  const btnEditarPostagem = document.querySelectorAll(".editar-post");
  btnExcluirPostagem.forEach(btn => btn.addEventListener("click", () => {
    const idPost = btn.parentNode.parentNode.id;
    excluirPostagem(idPost);
  }));
  btnEditarPostagem.forEach(btn => btn.addEventListener("click", () => {
    const idPost = btn.parentNode.parentNode.id;
    editarPostagem(idPost);
  }))
});