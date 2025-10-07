const postagensDiv = document.getElementById("postagens");
const postagens = localStorage.getItem("postagens") ? JSON.parse(localStorage.getItem("postagens")) : [];
const sessao = JSON.parse(localStorage.getItem("sessao"));

function inserirPostagens(postagens) {
  postagensDiv.innerHTML = postagens.map(postagem =>
    `<div id=${postagem.id} class="card" tipo=${postagem.tipo}>
      <img src="${postagem.imagem}" class="card-img-top" alt="${postagem.imagem ? postagem.titulo : ""}">
      <div class="card-body">
        <h5 class="card-title">${postagem.titulo} : <strong class="${postagem.gravidade ? gravidadeTexto(postagem.gravidade) : ""}">${postagem.tipo}</strong></h5>
        <p class="card-text">${postagem.descricao.length > 120 ? `${postagem.descricao.slice(0, -(postagem.descricao.length - 120))}...` : `${postagem.descricao}`}</p>
        <p class="card-text">Postado por <strong>${postagem.nomeUsuario}</strong></p>
        <p class="card-text"><strong>${postagem.localizacao ? postagem.localizacao : ""}</strong></p>
        <p class="card-text">${postagem.data}</p>
        ${botoes(postagem.usuario, sessao.email)}
      </div>
    </div>`
  ).join("");
}

function gravidadeTexto(gravidade) {
  if (gravidade === "alto") return "text-danger";
  if (gravidade === "medio") return "text-warning";
  if (gravidade === "baixo") return "text-primary";
  else return "text-dark";
}

function botoes(emailPostagem, emailSessao) {
  if (emailPostagem === emailSessao) {
    return `<div class="text-center"><button class="btn btn-danger excluir-post">Excluir post</button> <button class="btn editar-post">Editar post</button></div>`
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
    const idPost = btn.closest(".card").id;
    const tipoPost = btn.closest(".card").getAttribute("tipo");
    editarPostagem(idPost, tipoPost);
  }))
});