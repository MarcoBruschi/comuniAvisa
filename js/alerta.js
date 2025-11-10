const btnCriarAlerta = document.getElementById("criar-alerta");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const localizacao = document.getElementById("localizacao");
const imagem = document.getElementById("imagem");
const gravidade = document.getElementById("gravidade");
const tituloForm = document.querySelector(".titulo-form");

const params = new URLSearchParams(window.location.search);
const idPost = params.get("id");

async function verificarEdicao(id) {
  const reqAlerta = await fetch("http://localhost/comuniAvisaprojeto/php/alerta_get.php?id=" + id);
  const resAlerta = await reqAlerta.json();
  const alerta = resAlerta.data[0];

  const reqUser = await fetch("http://localhost/comuniAvisaprojeto/php/cliente_get.php");
  const resUser = await reqUser.json();
  const user = resUser.data;

  if (alerta.id_usuario === user.id) {
    titulo.value = alerta.titulo;
    descricao.value = alerta.descricao;
    localizacao.value = alerta.localizacao;
    imagem.value = alerta.endereco_imagem;
    gravidade.value = alerta.gravidade;
    tituloForm.innerText = "Editar Alerta";
  } else {
    window.location.href = "../paginas/postagens.html";
  }
}

btnCriarAlerta.addEventListener("click", async (e) => {

  e.preventDefault();

  if (idPost) {
    const fd = new FormData();
    fd.append("titulo", titulo.value);
    fd.append("descricao", descricao.value);
    fd.append("localizacao", localizacao.value);
    fd.append("endereco_imagem", imagem.value);
    fd.append("gravidade", gravidade.value);

    const req = await fetch("http://localhost/comuniAvisaprojeto/php/alerta_alterar.php?id="+idPost, {
      method: 'POST',
      body: fd
    });

    const res = await req.json();
    if (res.status === "ok") {
      const modal = document.getElementById("exampleModal");
      document.getElementById("mensagemModal").innerHTML = "Seu Alerta foi alterado com sucesso!";
      const modalBootstrap = new bootstrap.Modal(modal, { backdrop: false });
      modalBootstrap.show();
      setTimeout(() => {
        modalBootstrap.hide();
      }, 1500);
    }
  } else {
    const fd = new FormData();
    fd.append("titulo", titulo.value);
    fd.append("descricao", descricao.value);
    fd.append("localizacao", localizacao.value);
    fd.append("endereco_imagem", imagem.value);
    fd.append("gravidade", gravidade.value);

    const req = await fetch("http://localhost/comuniAvisaprojeto/php/alerta_novo.php", {
      method: 'POST',
      body: fd
    });

    const res = await req.json();
    if (res.status === "ok") {
      const modal = document.getElementById("exampleModal");
      document.getElementById("mensagemModal").innerHTML = "Seu Alerta foi criado com sucesso!";
      const modalBootstrap = new bootstrap.Modal(modal, { backdrop: false });
      modalBootstrap.show();
      setTimeout(() => {
        modalBootstrap.hide();
      }, 1500);
    }
  }


});

document.addEventListener("DOMContentLoaded", async () => {
  if (idPost) {
    await verificarEdicao(idPost);
  }
});
