const postagensDiv = document.getElementById("postagens");

async function fetchPostagens() {
  const alertas = await fetch("http://localhost/comuniAvisaprojeto/php/alerta_get.php");
  const servicos = await fetch("http://localhost/comuniAvisaprojeto/php/servico_get.php");
  const monitorias = await fetch("http://localhost/comuniAvisaprojeto/php/monitoria_get.php");
  const workshops = await fetch("http://localhost/comuniAvisaprojeto/php/workshop_get.php");
  const conteudos = await fetch("http://localhost/comuniAvisaprojeto/php/conteudo_get.php");

  const resAlertas = await alertas.json();
  const resServicos = await servicos.json();
  const resMonitorias = await monitorias.json();
  const resWorkshops = await workshops.json();
  const resConteudos = await conteudos.json();

  const postagens = {
    alerta: resAlertas.data,
    servico: resServicos.data,
    monitoria: resMonitorias.data,
    workshop: resWorkshops.data,
    conteudo: resConteudos.data
  }
  return postagens;
}

async function inserirPostagens() {
  postagensDiv.innerHTML = "";
  const p = await fetchPostagens();
  for (const tipo in p) {
    const cardsHTML = await Promise.all(
      p[tipo].map(post => cards(tipo, post))
    );
    postagensDiv.innerHTML += cardsHTML.join("");
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

async function excluirPost(id, tipo) {
  const req = await fetch(`http://localhost/comuniAvisaprojeto/php/${tipo}_excluir.php?id=` + id, {
    method: "POST",
  });
  const res = await req.json();
  console.log(res);
}

async function editarPost(id, tipo) {
  window.location.href = `../paginas/${tipo}.html?id=${id}`;
}

async function cards(tipo, postagem) {
  switch (tipo) {
    case "alerta":
      return `<div id=${postagem.id} class="card" tipo="alerta">
        <img src="${postagem.endereco_imagem}" class="card-img-top" alt="${postagem.endereco_imagem ? postagem.titulo : ""}">
        <div class="card-body">
          <h5 class="card-title"><strong class="${postagem.gravidade ? gravidadeTexto(postagem.gravidade) : ""}">Alerta</strong> : <strong>${postagem.titulo}</strong></h5>
          <p class="card-text">${postagem.descricao.length > 120 ? `${postagem.descricao.slice(0, -(postagem.descricao.length - 120))}...` : `${postagem.descricao}`}</p>
          <p class="card-text"><strong>${postagem.localizacao ? postagem.localizacao : ""}</strong></p>
          <p class="card-text">Postado por <strong>${postagem.nome_usuario}</strong></p>
          <p class="card-text">${postagem.data_criacao}</p>
          ${await botoesPostagens(postagem.id_usuario)}
        </div>
      </div>`;


    case "servico":
      return `<div id=${postagem.id} class="card" tipo="servico">
        <img src="${postagem.endereco_imagem}" class="card-img-top" alt="${postagem.endereco_imagem ? postagem.titulo : ""}">
        <div class="card-body">
          <h3><b>Serviço:</b> ${postagem.titulo}</h3>
          <p class="card-text">${postagem.descricao.length > 120 ? `${postagem.descricao.slice(0, -(postagem.descricao.length - 120))}...` : `${postagem.descricao}`}</p>
          <p class="card-text"><strong>Local: ${postagem.localizacao ? postagem.localizacao : ""} </strong></p>
          <p class="card-text">Tempo médio: <strong>${postagem.tempo_servico}</strong></p>
          <p class="card-text">Postado por <strong>${postagem.nome_usuario}</strong></p>
          <p class="card-text">${postagem.data_criacao}</p> 
          ${await botoesPostagens(postagem.id_usuario)}
        </div>
      </div>`;

    case "monitoria":
      return `<div id=${postagem.id} class="card" tipo="monitoria">
        <img src="${postagem.endereco_imagem}" class="card-img-top" alt="${postagem.endereco_imagem ? postagem.titulo : ""}">
        <div class="card-body">
          <h3><b>Monitoria:</b> ${postagem.titulo}</h3>
          ${postagem.descricao ? `<p class="card-text">Descrição: ${postagem.descricao.length > 120 ? `${postagem.descricao.slice(0, -(postagem.descricao.length - 120))}...` : `${postagem.descricao}`}</p>` : ""}
          <p class="card-text"><strong>Local: ${postagem.localizacao ? postagem.localizacao : ""} | ${postagem.data} às ${postagem.horario}</strong></p>
          <p class="card-text">Tipo de Monitoria: <strong>${postagem.tipo}</strong></p>
          <p class="card-text">Postado por <strong>${postagem.nome_usuario}</strong></p>
          <p class="card-text">${postagem.data_criacao}</p> 
          ${await botoesPostagens(postagem.id_usuario)}
        </div>
      </div>`;

    case "workshop":
      return `<div id=${postagem.id} class="card" tipo="workshop">
        <div class="card-body">
          <h3><strong>Workshop</strong> : ${postagem.tema}</h3>
          <h5 class="card-title">${postagem.titulo}</h5>
          <p class="card-text">${postagem.conteudo.length > 120 ? `${postagem.conteudo.slice(0, -(postagem.conteudo.length - 120))}...` : `${postagem.conteudo}`}</p>
          <p class="card-text"><strong>Local: ${postagem.localizacao ? postagem.localizacao : ""} | ${postagem.data} às ${postagem.horario}</strong></p>
          <p class="card-text">Destinado para <strong>${postagem.publico}</strong></p>
          <p class="card-text">Postado por <strong>${postagem.nome_usuario}</strong></p>
          <p class="card-text">${postagem.data_criacao}</p> 
          ${await botoesPostagens(postagem.id_usuario)}
        </div>
      </div>`;

    case "conteudo":
      return `<div id="${postagem.id}" class="card" tipo="conteudo">
        <div class="card-body">
        <h3>Conteúdo Educativo : ${postagem.tema}</h3>
        <h5 class="card-title">${postagem.titulo}</h5>
        <p class="card-text">${postagem.conteudo.length > 120 ? postagem.conteudo.substring(0, 120) + "..." : postagem.conteudo}</p>
        ${postagem.link ? `<p class="card-text"><strong>Link: <a href="${postagem.link}">clique aqui</a></strong></p>` : ""}
        <p class="card-text">Destinado para <strong>${postagem.publico}</strong></p>
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
    await excluirPost(card.id, card.getAttribute("tipo"));
    await inserirPostagens();
  } else if (e.target.classList.contains("editar-post")) {
    const card = e.target.closest(".card");
    await editarPost(card.id, card.getAttribute("tipo"));
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await inserirPostagens();
});