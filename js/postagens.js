const postagensDiv = document.getElementById("postagens");
const postagens = localStorage.getItem("postagens") ? JSON.parse(localStorage.getItem("postagens")) : [];
const sessao = JSON.parse(localStorage.getItem("sessao"));

function inserirPostagens(postagens) {
  postagensDiv.innerHTML = postagens.map(postagem =>
   `<div id=${postagem.id} class="card" tipo=${postagem.tipo} style="width: 18rem; max-height:40rem">
      <img src="${postagem.imagem}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${postagem.titulo} : <strong class="text-warning">${postagem.tipo}</strong></h5>
        <p class="card-text">${postagem.descricao.length > 120 ? `${postagem.descricao.slice(0, -(postagem.descricao.length - 120))}...` : `${postagem.descricao}`}</p>
        <p class="card-text">Postado por <strong>${postagem.nomeUsuario}</strong></p>
        <p class="card-text">${postagem.data}</p>
        ${botoes(postagem.usuario, sessao.email)}
      </div>
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
  const novosPosts = postagens.filter(post => post.id != idPostagem);
  localStorage.setItem("postagens", JSON.stringify(novosPosts));
  inserirPostagens(novosPosts);
}

function editarPostagem(idPostagem, tipo) {
  localStorage.setItem("postagemEditar", idPostagem);
  window.location.href = `../paginas/${tipo}.html`;
}

document.addEventListener("DOMContentLoaded", () => {
  inserirPostagens(postagens);
  const btnExcluirPostagem = document.querySelectorAll(".excluir-post");
  const btnEditarPostagem = document.querySelectorAll(".editar-post");
  btnExcluirPostagem.forEach(btn => btn.addEventListener("click", () => {
    const idPost = btn.parentElement.parentElement.parentElement.id;
    excluirPostagem(idPost);
  }));
  btnEditarPostagem.forEach(btn => btn.addEventListener("click", () => {
    const idPost = btn.parentElement.parentElement.parentElement.id;
    const tipoPost = btn.parentElement.parentElement.parentElement.getAttribute("tipo");
    editarPostagem(idPost, tipoPost);
  }))
});