const postagensDiv = document.getElementById("postagens");
let postagens = localStorage.getItem("postagens") ? JSON.parse(localStorage.getItem("postagens")) : [];
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

  document.querySelectorAll(".excluir-post").forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();

    const idPost = btn.closest(".card").id;
    excluirPostagem(idPost);
  }));

  document.querySelectorAll(".editar-post").forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();

    const idPost = btn.closest(".card").id;
    editarPostagem(idPost);
  }));
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
  postagens = postagens.filter(post => post.id != idPostagem);
  localStorage.setItem("postagens", JSON.stringify(postagens));
  inserirPostagens(postagens);
}

function editarPostagem(idPostagem) {
  const tipo = postagens.find(post => post.id == idPostagem).tipo.toLowerCase();
  localStorage.setItem("postagemEditar", idPostagem);
  window.location.href = `./${tipo}.html`;
}

inserirPostagens(postagens);