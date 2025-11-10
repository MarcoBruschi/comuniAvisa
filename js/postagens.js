const postagensDiv = document.getElementById("postagens");

async function fetchPostagens() {
  const alertas = await fetch("../php/alerta_get.php");
  const resAlertas = await alertas.json();
  const postagens = {
    alerta: resAlertas.data
  }
  return postagens;
}

async function inserirPostagens() {
  const p = await fetchPostagens();

  for (const tipo in p) {
    const cardsHTML = await Promise.all(p[tipo].map(post => cards(tipo, post)));
    postagensDiv.innerHTML = cardsHTML.join("");
  }
};

function gravidadeTexto(gravidade) {
  if (gravidade === "alto") return "text-danger";
  if (gravidade === "medio") return "text-warning";
  if (gravidade === "baixo") return "text-primary";
  else return "text-dark";
}

async function botoesPostagens(idUsuarioPost) {
  const req = await fetch("http://localhost/comuniAvisaprojeto/php/cliente_get.php");
  const res = await req.json();
  const user = res.data;
  if (user.id === Number(idUsuarioPost)) {
    return `<div class="text-center"><button class="btn btn-danger excluir-post">Excluir post</button> <button class="btn editar-post">Editar post</button></div>`;
  }
  return "";
}

async function excluirPost(id) {
  const req = await fetch("../php/alerta_excluir.php?id="+id, {
    method: "POST",
  });
  const res = await req.json();
  console.log(res);
}

async function editarPost(id) {
  window.location.href = `../paginas/alerta.html?id=${id}`;
}

async function cards(tipo, postagem) {
  switch (tipo) {
    case "alerta":
      return `<div id=${postagem.id} class="card" tipo=${postagem.tipo}>
        <img src="${postagem.endereco_imagem}" class="card-img-top" alt="${postagem.imagem ? postagem.titulo : ""}">
        <div class="card-body">
          <h5 class="card-title"><strong class="${postagem.gravidade ? gravidadeTexto(postagem.gravidade) : ""}">Alerta</strong> : <strong>${postagem.titulo}</strong></h5>
          <p class="card-text">${postagem.descricao.length > 120 ? `${postagem.descricao.slice(0, -(postagem.descricao.length - 120))}...` : `${postagem.descricao}`}</p>
          <p class="card-text"><strong>${postagem.localizacao ? postagem.localizacao : ""}</strong></p>
          <p class="card-text">Postado por <strong>${postagem.nome_usuario}</strong></p>
          <p class="card-text">${postagem.data_criacao}</p>
          ${await botoesPostagens(postagem.id_usuario)}
        </div>
      </div>`;
  }
}

postagensDiv.addEventListener("click", async (e) => {
  if (e.target.classList.contains("excluir-post")) {
    const card = e.target.closest(".card");
    await excluirPost(card.id);
    await inserirPostagens();
  } else if (e.target.classList.contains("editar-post")) {
    const card = e.target.closest(".card");
    await editarPost(card.id);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await inserirPostagens();
});