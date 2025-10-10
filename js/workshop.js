let postagens = localStorage.getItem("postagens")
  ? JSON.parse(localStorage.getItem("postagens"))
  : {};
const sessao = JSON.parse(localStorage.getItem("sessao"));
const nomeDoInput =
  document.getElementById("nome") || document.querySelector("#nome");
const conteudoDoInput =
  document.getElementById("conteudo") || document.querySelector("#conteudo");
const localDoInput =
  document.getElementById("local") || document.querySelector("#local");
const horarioDoInput =
  document.getElementById("horario") || document.querySelector("#horario");
const temaDoInput =
  document.getElementById("tema") || document.querySelector("#tema");
const publicoDoInput =
  document.getElementById("publico") || document.querySelector("#publico");
const btnCriarWorkshop = document.getElementById("criar-workshop");

const idValor = document.getElementById("id");
console.log(idValor.value)
const tituloForm = document.querySelector(".titulo-form");

if (idValor.value) {
  const post = postagens.find((post) => post.id == idValor.value);
  nomeDoInput.value = post.titulo;
  conteudoDoInput.value = post.conteudo;
  localDoInput.value = post.local;
  horarioDoInput.value = post.horario;
  temaDoInput.value = post.tema;
  publicoDoInput.value = post.publico;

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
    if (
      nomeDoInput.value &&
      sessao &&
      localDoInput.value &&
      temaDoInput.value !== "Tema do Workshop" &&
      publicoDoInput.value !== "Público do Workshop"
    ) {
      const workshop = {
        id: Date.now(),
        titulo: nomeDoInput.value,
        descricao: conteudoDoInput.value,
        localizacao: localDoInput.value,
        horario: horarioDoInput.value,
        tema: temaDoInput.value,
        publico: publicoDoInput.value,
        usuario: sessao.email,
        nomeUsuario: sessao.nome,
        data: dataFormatada,
        tipo: "Workshop",
      };

      postagens.push(workshop);
      localStorage.setItem("postagens", JSON.stringify(postagens));
      const modal = document.getElementById("exampleModal");
      const modalBootstrap = new bootstrap.Modal(modal, { backdrop: false });

      nomeDoInput.value = "";
      conteudoDoInput.value = "";
      localDoInput.value = "";
      horarioDoInput.value = "";
      temaDoInput.value = "Tema do Workshop";
      publicoDoInput.value = "Público do Workshop";

      modalBootstrap.show();
      setTimeout(() => {
        modalBootstrap.hide();
      }, 1500);
    }
  } else {
    if (
      nomeDoInput.value &&
      sessao &&
      localDoInput.value(temaDoInput.value !== "Tema do Workshop") &&
      publicoDoInput.value !== "Público do Workshop"
    ) {
      const alerta = postagens.find((post) => post.id == idValor.value);
      workshop.titulo = nomeDoInput.value;
      workshop.conteudo = conteudoDoInput.value;
      workshop.local = localDoInput.value;
      workshop.horario = horarioDoInput.value;

      localStorage.setItem("postagens", JSON.stringify(postagens));
      localStorage.removeItem("postagemEditar");
      window.location.href = "../paginas/postagens.html";
    }
  }
});

function workshopCriado(pagina) {
  document
    .getElementById("exampleModal")
    .setAttribute("data-bs-toggle", "modal");
  const tempo = setInterval(() => {
    window.location.href = pagina;
  }, 2000);
  clearInterval(tempo);
}
