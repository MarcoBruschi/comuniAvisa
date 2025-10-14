let postagens = localStorage.getItem("postagens") ? JSON.parse(localStorage.getItem("postagens")) : [];
const sessao = JSON.parse(localStorage.getItem("sessao"));
const nomeInput = document.getElementById("nome");
const conteudoInput = document.getElementById("conteudo");
const linkInput = document.getElementById("link");
const temaInput = document.getElementById("tema");
const publicoInput = document.getElementById("publico");
const btnCriarConteudo = document.getElementById("criar-conteudo");
const tituloForm = document.querySelector(".titulo-form");
const idValor = document.getElementById("id");

idValor.value = localStorage.getItem("postagemEditar") ? JSON.parse(localStorage.getItem("postagemEditar")) : "";

if (idValor.value) {
  const post = postagens.find((post) => post.id == idValor.value);
  nomeInput.value = post.titulo;
  conteudoInput.value = post.descricao;
  linkInput.value = post.link;
  temaInput.value = post.tema;
  publicoInput.value = post.publico;

  tituloForm.textContent = "Editar Conteúdo Educativo";
  btnCriarConteudo.textContent = "Editar Conteúdo";
} else {
  tituloForm.textContent = "Criar Conteúdo Educativo";
  btnCriarConteudo.textContent = "Criar Conteúdo";
}

btnCriarConteudo.addEventListener("click", (event) => {
  event.preventDefault();

  const data = new Date(Date.now());
  const dataFormatada = data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  if (!idValor.value) {
    // Criar novo conteúdo
    if (validacao()) {
    const conteudo = {
      id: Date.now(),
      titulo: nomeInput.value,
      descricao: conteudoInput.value,
      link: linkInput.value,
      tema: temaInput.value,
      publico: publicoInput.value,
      usuario: sessao.email,
      nomeUsuario: sessao.nome,
      data: dataFormatada,
      tipo: "conteudo",
    };


      postagens.push(conteudo);
      localStorage.setItem("postagens", JSON.stringify(postagens));
      const modal = document.getElementById("exampleModal");
      const modalBootstrap = new bootstrap.Modal(modal, { backdrop: false });

      nomeInput.value = "";
      conteudoInput.value = "";
      linkInput.value = "";
      temaInput.value = "Tema";
      publicoInput.value = "Público Alvo";

      modalBootstrap.show();
      setTimeout(() => {
        modalBootstrap.hide();
      }, 1500);
    }
  } else {
    if (validacao()) {
      const conteudo = postagens.find((post) => post.id == idValor.value);
      conteudo.titulo = nomeInput.value;
      conteudo.descricao = conteudoInput.value;
      conteudo.link = linkInput.value;
      conteudo.tema = temaInput.value;
      conteudo.publico =publicoInput.value;

      localStorage.setItem("postagens", JSON.stringify(postagens));
      localStorage.removeItem("postagemEditar");
      window.location.href = "../paginas/postagens.html";
    }
  }
});

// Validação dos campos obrigatórios do formulário
function validacao() {
  if (
    nomeInput.value &&
    conteudoInput.value &&
    (temaInput.value !== "Tema" && publicoInput.value !== "Público Alvo")
  ) {
    return true;
  }
  return false;
}

