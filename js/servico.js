const btnCriarServico = document.getElementById("postar-serviço");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const localizacao = document.getElementById("localizacao");
const imagem = document.getElementById("imagem");
const tempo = document.getElementById("tempo");
const tituloForm = document.querySelector(".titulo-form");
const mensagemErro = document.getElementById("mensagemErro");

const params = new URLSearchParams(window.location.search);
const idPost = params.get("id");

async function verificarEdicao(id) {
  const reqServico = await fetch("http://localhost/comuniAvisaprojeto/php/servico_get.php?id="+id);
  const resServico = await reqServico.json();
  const servico = resServico.data[0];

  const reqUser = await fetch("http://localhost/comuniAvisaprojeto/php/cliente_get.php");
  const resUser = await reqUser.json();
  const user = resUser.data;

  if (servico.id_usuario === user.id) {
    titulo.value = servico.titulo;
    descricao.value = servico.descricao;
    localizacao.value = servico.localizacao;
    imagem.value = servico.endereco_imagem;
    tempo.value = servico.tempo_servico;
    tituloForm.innerText = "Editar Serviço";
  } else {
    window.location.href = "http://localhost/comuniAvisaprojeto/paginas/postagens.html";
  }
}

btnCriarServico.addEventListener("click", async (e) => {
  mensagemErro.textContent = "";
  e.preventDefault();

  if (idPost) {
    try {
      const fd = new FormData();
      fd.append("titulo", titulo.value);
      fd.append("descricao", descricao.value);
      fd.append("localizacao", localizacao.value);
      fd.append("endereco_imagem", imagem.value);
      fd.append("tempo_servico", tempo.value);


      const req = await fetch("http://localhost/comuniAvisaprojeto/php/servico_alterar.php?id="+idPost, {
        method: 'POST',
        body: fd
      });

      const res = await req.json();
      if (res.status === "nok") {
        mensagemErro.textContent = res.mensagem;
        return;
      }
      const modal = document.getElementById("exampleModal");
      document.getElementById("mensagemModal").innerHTML = "Seu serviço foi alterado com sucesso!";
      const modalBootstrap = new bootstrap.Modal(modal, { backdrop: false });
      modalBootstrap.show();
      setTimeout(() => {
        modalBootstrap.hide();
        window.location.href = "http://localhost/comuniAvisaprojeto/paginas/postagens.html";
      }, 1500);
    } catch (error) {
      mensagemErro.textContent = "Erro ao alterar o serviço. Tente novamente.";
    }


  } else {
    try {
      const fd = new FormData();
      fd.append("titulo", titulo.value);
      fd.append("descricao", descricao.value);
      fd.append("localizacao", localizacao.value);
      fd.append("endereco_imagem", imagem.value);
      fd.append("tempo_servico", tempo.value);

      const req = await fetch("http://localhost/comuniAvisaprojeto/php/servico_novo.php", {
        method: 'POST',
        body: fd
      });

      const res = await req.json();
      if (res.status === "nok") {
        mensagemErro.textContent = res.mensagem;
        return;
      }
      const modal = document.getElementById("exampleModal");
      document.getElementById("mensagemModal").innerHTML = "Seu Serviço foi criado com sucesso!";
      const modalBootstrap = new bootstrap.Modal(modal, { backdrop: false });
      modalBootstrap.show();
      setTimeout(() => {
        modalBootstrap.hide();
        window.location.href = "http://localhost/comuniAvisaprojeto/paginas/servico.html";
      }, 1500);
    } catch (error) {
      mensagemErro.textContent = "Erro ao criar o serviço. Tente novamente.";
    }
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  if (idPost) {
    await verificarEdicao(idPost);
  }
});
