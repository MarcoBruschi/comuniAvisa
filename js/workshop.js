const btnCriarWorkshop = document.getElementById("criar-workshop");
const titulo = document.getElementById("titulo");
const conteudo = document.getElementById("conteudo");
const localizacao = document.getElementById("localizacao");
const data = document.getElementById("data");
const horario = document.getElementById("horario");
const tema = document.getElementById("tema");
const publico = document.getElementById("publico");
const tituloForm = document.querySelector(".titulo-form");
const mensagemErro = document.getElementById("mensagemErro");

const params = new URLSearchParams(window.location.search);
const idPost = params.get("id");

async function verificarEdicao(id) {
  const reqWorkshop = await fetch("/comuniAvisa/php/workshop_get.php?id=" + id);
  const resWorkshop = await reqWorkshop.json();
  const workshop = resWorkshop.data[0];

  const reqUser = await fetch("/comuniAvisa/php/cliente_get.php");
  const resUser = await reqUser.json();
  const user = resUser.data;

  if (workshop.id_usuario === user.id) {
    titulo.value = workshop.titulo;
    conteudo.value = workshop.conteudo;
    localizacao.value = workshop.localizacao;
    data.value = workshop.data;
    horario.value = workshop.horario;
    tema.value = workshop.tema;
    publico.value = workshop.publico;
    tituloForm.innerText = "Editar Alerta";
  } else {
    window.location.href = "/comuniAvisa/paginas/postagens.html";
  }
}

btnCriarWorkshop.addEventListener("click", async (e) => {
  mensagemErro.textContent = "";
  e.preventDefault();

  if (idPost) {
    try {
      const fd = new FormData();
      fd.append("titulo", titulo.value);
      fd.append("conteudo", conteudo.value);
      fd.append("localizacao", localizacao.value);
      fd.append("data", data.value);
      fd.append("horario", horario.value);
      fd.append("tema", tema.value);
      fd.append("publico", publico.value);


      const req = await fetch("/comuniAvisa/php/workshop_alterar.php?id=" + idPost, {
        method: 'POST',
        body: fd
      });

      const res = await req.json();
      if (res.status === "nok") {
        mensagemErro.textContent = res.mensagem;
        return
      }
      const modal = document.getElementById("exampleModal");
      document.getElementById("mensagemModal").innerHTML = "Seu Workshop foi alterado com sucesso!";
      const modalBootstrap = new bootstrap.Modal(modal, { backdrop: false });
      modalBootstrap.show();
      setTimeout(() => {
        modalBootstrap.hide();
        window.location.href = "/comuniAvisa/paginas/postagens.html";
      }, 1500);
    } catch (error) {
      mensagemErro.textContent = "Erro ao alterar o Workshop. Tente novamente.";
    }


  } else {
    try {
      const fd = new FormData();
      fd.append("titulo", titulo.value);
      fd.append("conteudo", conteudo.value);
      fd.append("localizacao", localizacao.value);
      fd.append("data", data.value);
      fd.append("horario", horario.value);
      fd.append("tema", tema.value);
      fd.append("publico", publico.value);

      const req = await fetch("/comuniAvisa/php/workshop_novo.php", {
        method: 'POST',
        body: fd
      });

      const res = await req.json();
      if (res.status === "nok") {
        mensagemErro.textContent = res.mensagem;
        return
      }
      const modal = document.getElementById("exampleModal");
      document.getElementById("mensagemModal").innerHTML = "Seu Workshop foi criado com sucesso!";
      const modalBootstrap = new bootstrap.Modal(modal, { backdrop: false });
      modalBootstrap.show();
      setTimeout(() => {
        modalBootstrap.hide();
        window.location.href = "/comuniAvisa/paginas/workshop.html";
      }, 1500);
    } catch (error) {
      mensagemErro.textContent = "Erro ao criar o Workshop. Tente novamente.";
    }
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  if (idPost) {
    await verificarEdicao(idPost);
  }
});
