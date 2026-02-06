const btnCriarMonitoria = document.getElementById("criar-monitoria");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const tipo = document.getElementById("tipo");
const localizacao = document.getElementById("localizacao");
const imagem = document.getElementById("imagem");

const tituloForm = document.querySelector(".titulo-form");
const mensagemErro = document.getElementById("mensagemErro");

const params = new URLSearchParams(window.location.search);
const idPost = params.get("id");

async function verificarEdicao(id) {
  const reqMonitoria = await fetch("/comuniAvisa/php/monitoria_get.php?id="+id);
  const resMonitoria = await reqMonitoria.json();
  const monitoria = resMonitoria.data[0];

  const reqUser = await fetch("/comuniAvisa/php/cliente_get.php");
  const resUser = await reqUser.json();
  const user = resUser.data;

  if (monitoria.id_usuario === user.id) {
    titulo.value = monitoria.titulo;
    descricao.value = monitoria.descricao;
    localizacao.value = monitoria.localizacao;
    imagem.value = monitoria.endereco_imagem;
    tipo.value = monitoria.tipo;
    data.value = monitoria.data;
    horario.value = monitoria.horario;
    tituloForm.innerText = "Editar Monitoria";
  } else {
    window.location.href = "/comuniAvisa/paginas/postagens.html";
  }
}

btnCriarMonitoria.addEventListener("click", async (e) => {
  mensagemErro.textContent = "";
  e.preventDefault();

  if (idPost) {
    try {
      const fd = new FormData();
      fd.append("titulo", titulo.value);
      fd.append("descricao", descricao.value);
      fd.append("tipo", tipo.value);
      fd.append("localizacao", localizacao.value);
      fd.append("data", data.value);
      fd.append("horario", horario.value);
      fd.append("endereco_imagem", imagem.value);


      const req = await fetch("/comuniAvisa/php/monitoria_alterar.php?id="+idPost, {
        method: 'POST',
        body: fd
      });

      const res = await req.json();
      if (res.status === "nok") {
        mensagemErro.textContent = res.mensagem;
        return
      }
      const modal = document.getElementById("exampleModal");
      document.getElementById("mensagemModal").innerHTML = "Sua Monitoria foi alterada com sucesso!";
      const modalBootstrap = new bootstrap.Modal(modal, { backdrop: false });
      modalBootstrap.show();
      setTimeout(() => {
        modalBootstrap.hide();
        window.location.href = "/comuniAvisa/paginas/postagens.html";
      }, 1500);
    } catch (error) {
      mensagemErro.textContent = "Erro ao alterar a monitoria. Tente novamente.";
    }


  } else {
    try {
      const fd = new FormData();
      fd.append("titulo", titulo.value);
      fd.append("descricao", descricao.value);
      fd.append("tipo", tipo.value);
      fd.append("localizacao", localizacao.value);
      fd.append("data", data.value);
      fd.append("horario", horario.value);
      fd.append("endereco_imagem", imagem.value);

      const req = await fetch("/comuniAvisa/php/monitoria_novo.php", {
        method: 'POST',
        body: fd
      });

      const res = await req.json();
      if (res.status === "nok") {
        mensagemErro.textContent = res.mensagem;
        return
      }
      const modal = document.getElementById("exampleModal");
      document.getElementById("mensagemModal").innerHTML = "Sua Monitoria foi criada com sucesso!";
      const modalBootstrap = new bootstrap.Modal(modal, { backdrop: false });
      modalBootstrap.show();
      setTimeout(() => {
        modalBootstrap.hide();
        window.location.href = "/comuniAvisa/paginas/monitoria.html";
      }, 1500);
    } catch (error) {
      mensagemErro.textContent = "Erro ao criar a monitoria. Tente novamente.";
    }
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  if (idPost) {
    await verificarEdicao(idPost);
  }
});
