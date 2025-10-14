const postagensDiv = document.getElementById("postagens");
let postagens = localStorage.getItem("postagens") ? JSON.parse(localStorage.getItem("postagens")) : [];
const sessao = JSON.parse(localStorage.getItem("sessao"));

if (localStorage.getItem("postagemEditar")) {
  localStorage.removeItem("postagemEditar");
}

function inserirPostagens(postagens) {
  postagensDiv.innerHTML = postagens.map(postagem => cards(postagem.tipo.toLowerCase(), postagem)).join("");

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


function cards(tipo, postagem) {
  switch (tipo) {
    case "alerta":
      return `<div id=${postagem.id} class="card" tipo=${postagem.tipo}>
        <img src="${postagem.imagem}" class="card-img-top" alt="${postagem.imagem ? postagem.titulo : ""}">
        <div class="card-body">
          <h5 class="card-title">${postagem.titulo} : <strong class="${postagem.gravidade ? gravidadeTexto(postagem.gravidade) : ""}">${postagem.tipo}</strong></h5>
          <p class="card-text">${postagem.descricao.length > 120 ? `${postagem.descricao.slice(0, -(postagem.descricao.length - 120))}...` : `${postagem.descricao}`}</p>
          <p class="card-text"><strong>${postagem.localizacao ? postagem.localizacao : ""}</strong></p>
          <p class="card-text">Postado por <strong>${postagem.nomeUsuario}</strong></p>
          <p class="card-text">${postagem.data}</p>
          ${botoes(postagem.usuario, sessao.email)}
        </div>
      </div>`;

    case "workshop":
      return `<div id=${postagem.id} class="card" tipo=${postagem.tipo}>
        <img src="${postagem.imagem}" class="card-img-top" alt="${postagem.imagem ? postagem.titulo : ""}">
        <div class="card-body">
          <h3>${postagem.tipo} : ${postagem.tema}</h3>
          <h5 class="card-title">${postagem.titulo}</h5>
          <p class="card-text">${postagem.descricao.length > 120 ? `${postagem.descricao.slice(0, -(postagem.descricao.length - 120))}...` : `${postagem.descricao}`}</p>
          <p class="card-text"><strong>Local: ${postagem.localizacao ? postagem.localizacao : ""} | ${postagem.dia} às ${postagem.horario}</strong></p>
          <p class="card-text">Destinado para <strong>${postagem.publico}</strong></p>
          <p class="card-text">Postado por <strong>${postagem.nomeUsuario}</strong></p>
          ${botoes(postagem.usuario, sessao.email)}
        </div>
      </div>`;

    case "monitoria":
      return `<div id=${postagem.id} class="card" tipo=${postagem.tipo}>
        <img src="${postagem.imagem}" class="card-img-top" alt="${postagem.imagem ? postagem.titulo : ""}">
        <div class="card-body">
          <h3><b>${postagem.tipo}:</b> ${postagem.titulo}</h3>
          ${postagem.descricao ? `<p class="card-text">Descrição: ${postagem.descricao.length > 120 ? `${postagem.descricao.slice(0, -(postagem.descricao.length - 120))}...` : `${postagem.descricao}`}</p>` : "" }
          <p class="card-text"><strong>Local: ${postagem.localizacao ? postagem.localizacao : ""} | ${postagem.dia} às ${postagem.horario}</strong></p>
          <p class="card-text">Tipo de Monitoria: <strong>${postagem.tipoMonitoria}</strong></p>
          <p class="card-text">Postado por <strong>${postagem.nomeUsuario}</strong></p>
          ${botoes(postagem.usuario, sessao.email)}
        </div>
      </div>`;

      case "servico":
      return `<div id=${postagem.id} class="card" tipo=${postagem.tipo}>
        <img src="${postagem.imagem}" class="card-img-top" alt="${postagem.imagem ? postagem.titulo : ""}">
        <div class="card-body">
          <h3><b>Serviço:</b> ${postagem.titulo}</h3>
          <p class="card-text">Descrição: ${postagem.descricao.length > 120 ? `${postagem.descricao.slice(0, -(postagem.descricao.length - 120))}...` : `${postagem.descricao}`}</p>
          <p class="card-text"><strong>Local: ${postagem.localizacao ? postagem.localizacao : ""} </strong></p>
          <p class="card-text">Tempo médio: <strong>${postagem.tempo}</strong></p>
          <p class="card-text">Postado por <strong>${postagem.nomeUsuario}</strong></p>
          <p class="card-text">${postagem.data}</p> 
          ${botoes(postagem.usuario, sessao.email)}
        </div>
      </div>`;

      case "conteudo":
      return `<div id="${postagem.id}" class="card" tipo="${postagem.tipo}">
        ${postagem.imagem ? `<img src="${postagem.imagem}" class="card-img-top" alt="${postagem.titulo}">` : ""}
        <div class="card-body">
        <h3>${postagem.tipo.charAt(0).toUpperCase() + postagem.tipo.slice(1)} : ${postagem.tema}</h3>
        <h5 class="card-title">${postagem.titulo}</h5>
        <p class="card-text">${postagem.descricao.length > 120 ? postagem.descricao.substring(0, 120) + "..." : postagem.descricao}</p>
        <p class="card-text"><strong>Link: ${postagem.link || ""} | ${postagem.dia || ""} às ${postagem.horario || ""}</strong></p>
        <p class="card-text">Destinado para <strong>${postagem.publico}</strong></p>
        <p class="card-text">Postado por <strong>${postagem.nomeUsuario}</strong></p>
        ${botoes(postagem.usuario, sessao.email)}
      </div>
    </div>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (postagens.length > 0) {
    inserirPostagens(postagens);
  }
});