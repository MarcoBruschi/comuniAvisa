const btnCriarConteudo = document.getElementById("criar-conteudo");
const titulo = document.getElementById("titulo");
const conteudoInput = document.getElementById("conteudo");
const link = document.getElementById("link");
const tema = document.getElementById("tema");
const publico = document.getElementById("publico");
const tituloForm = document.querySelector(".titulo-form");
const mensagemErro = document.getElementById("mensagemErro");

const params = new URLSearchParams(window.location.search);
const idPost = params.get("id");

async function verificarEdicao(id) {
  const reqConteudo = await fetch("http://localhost/comuniAvisaprojeto/php/conteudo_get.php?id="+id);
  const resConteudo = await reqConteudo.json();
  const conteudo = resConteudo.data[0];

  const reqUser = await fetch("http://localhost/comuniAvisaprojeto/php/cliente_get.php");
  const resUser = await reqUser.json();
  const user = resUser.data;

  if (conteudo.id_usuario === user.id) {
    titulo.value = conteudo.titulo;
    conteudoInput.value = conteudo.conteudo;
    link.value = conteudo.link;
    tema.value = conteudo.tema;
    publico.value = conteudo.publico;
    tituloForm.innerText = "Editar Alerta";
  } else {
    window.location.href = "http://localhost/comuniAvisaprojeto/paginas/postagens.html";
  }
}

btnCriarConteudo.addEventListener("click", async (e) => {
  mensagemErro.textContent = "";
  e.preventDefault();

  if (idPost) {
    try {
      const fd = new FormData();
      fd.append("titulo", titulo.value);
      fd.append("conteudo", conteudoInput.value);
      fd.append("link", link.value);
      fd.append("tema", tema.value);
      fd.append("publico", publico.value);


      const req = await fetch("http://localhost/comuniAvisaprojeto/php/conteudo_alterar.php?id="+idPost, {
        method: 'POST',
        body: fd
      });

      const res = await req.json();
      if (res.status === "nok") {
        mensagemErro.textContent = res.mensagem;
        return
      }
      const modal = document.getElementById("exampleModal");
      document.getElementById("mensagemModal").innerHTML = "Seu Conteúdo foi alterado com sucesso!";
      const modalBootstrap = new bootstrap.Modal(modal, { backdrop: false });
      modalBootstrap.show();
      setTimeout(() => {
        modalBootstrap.hide();
        window.location.href = "http://localhost/comuniAvisaprojeto/paginas/postagens.html";
      }, 1500);
    } catch (error) {
      mensagemErro.textContent = "Erro ao alterar o Conteúdo. Tente novamente.";
    }

  } else {
    try {
      const fd = new FormData();
      fd.append("titulo", titulo.value);
      fd.append("conteudo", conteudoInput.value);
      fd.append("link", link.value);
      fd.append("tema", tema.value);
      fd.append("publico", publico.value);

      const req = await fetch("http://localhost/comuniAvisaprojeto/php/conteudo_novo.php", {
        method: 'POST',
        body: fd
      });

      const res = await req.json();
      if (res.status === "nok") {
        mensagemErro.textContent = res.mensagem;
        return
      }
      const modal = document.getElementById("exampleModal");
      document.getElementById("mensagemModal").innerHTML = "Seu Conteúdo foi criado com sucesso!";
      const modalBootstrap = new bootstrap.Modal(modal, { backdrop: false });
      modalBootstrap.show();
      setTimeout(() => {
        modalBootstrap.hide();
        window.location.href = "http://localhost/comuniAvisaprojeto/paginas/conteudo.html";
      }, 1500);
    } catch(error) {
      mensagemErro.textContent = "Erro ao criar o Conteúdo. Tente novamente.";
    }
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  if (idPost) {
    await verificarEdicao(idPost);
  }
});
