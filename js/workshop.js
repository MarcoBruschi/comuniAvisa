let postagens = localStorage.getItem("postagens") ? JSON.parse(localStorage.getItem("postagens")) : [];
const sessao = JSON.parse(localStorage.getItem("sessao"));
const nomeInput = document.getElementById("nome");
const conteudoInput = document.getElementById("conteudo");
const localInput = document.getElementById("local");
const horarioInput = document.getElementById("horario");
const dataInput = document.getElementById("data");
const temaInput = document.getElementById("tema");
const publicoInput = document.getElementById("publico");
const btnCriarWorkshop = document.getElementById("criar-workshop");
const tituloForm = document.querySelector(".titulo-form");
const idValor = document.getElementById("id");
idValor.value = localStorage.getItem("postagemEditar") ? JSON.parse(localStorage.getItem("postagemEditar")) : "";


if (idValor.value) {
  const post = postagens.find((post) => post.id == idValor.value);
  nomeInput.value = post.titulo;
  conteudoInput.value = post.descricao;
  localInput.value = post.localizacao;
  horarioInput.value = post.horario;
  dataInput.value = post.dia;
  temaInput.value = post.tema;
  publicoInput.value = post.publico;

  tituloForm.textContent = "Editar Workshop";
  btnCriarWorkshop.textContent = "Editar Workshop";
} else {
  tituloForm.textContent = "Criar Workshop";
  btnCriarWorkshop.textContent = "Criar Workshop";
}

btnCriarWorkshop.addEventListener("click", (event) => {
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
    if (validacao()) {
      const workshop = {
        id: Date.now(),
        titulo: nomeInput.value,
        descricao: conteudoInput.value,
        localizacao: localInput.value,
        horario: horarioInput.value,
        dia: dataInput.value,
        tema: temaInput.value,
        publico: publicoInput.value,
        usuario: sessao.email,
        nomeUsuario: sessao.nome,
        data: dataFormatada,
        tipo: "Workshop",
      };

      postagens.push(workshop);
      localStorage.setItem("postagens", JSON.stringify(postagens));
      const modal = document.getElementById("exampleModal");
      const modalBootstrap = new bootstrap.Modal(modal, { backdrop: false });

      nomeInput.value = "";
      conteudoInput.value = "";
      localInput.value = "";
      horarioInput.value = "";
      dataInput.value = "";
      temaInput.value = "Tema";
      publicoInput.value = "Público";

      modalBootstrap.show();
      setTimeout(() => {
        modalBootstrap.hide();
      }, 1500);
    }
  } else {
    if (validacao()) {
      const workshop = postagens.find((post) => post.id == idValor.value);
      workshop.titulo = nomeInput.value;
      workshop.descricao = conteudoInput.value;
      workshop.localizacao = localInput.value;
      workshop.horario = horarioInput.value;
      workshop.dia = dataInput.value;
      workshop.tema = temaInput.value;
      workshop.publico = publicoInput.value;

      localStorage.setItem("postagens", JSON.stringify(postagens));
      localStorage.removeItem("postagemEditar");
      window.location.href = "../paginas/postagens.html";
    }
  }
});

function validacao() {
  if (nomeInput.value && conteudoInput.value && localInput.value && horarioInput.value && dataInput.value && (temaInput.value !== "Tema" && publicoInput.value !== "Público")) {
    return true;
  } 
  return false;
}