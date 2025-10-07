const btnCriarAlerta = document.getElementById("criar-alerta");
const sessao = JSON.parse(localStorage.getItem("sessao"));
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const localizacao = document.getElementById("localizacao");
const imagem = document.getElementById("imagem");
const gravidade = document.getElementById("gravidade");
const idValor = document.getElementById("id");
const postagens = localStorage.getItem("postagens") ? JSON.parse(localStorage.getItem("postagens")) : [];
idValor.value = localStorage.getItem("postagemEditar") ? JSON.parse(localStorage.getItem("postagemEditar")) : "";

const tituloForm = document.querySelector(".titulo-form");

if (idValor.value) {
  const post = postagens.find(post => post.id == idValor.value);
  titulo.value = post.titulo;
  descricao.value = post.descricao;
  localizacao.value = post.localizacao;
  imagem.value = post.imagem;
  gravidade.value = post.gravidade;

  tituloForm.textContent = "Editar Alerta";
  btnCriarAlerta.textContent = "Editar Alerta";
} else {
  tituloForm.textContent = "Criar Alerta";
  btnCriarAlerta.textContent = "Criar Alerta";
}

btnCriarAlerta.addEventListener("click", (event) => {

  event.preventDefault();

  const data = new Date(Date.now());
  const dataFormatada = data.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  if (!idValor.value) {
    if (titulo.value && sessao && localizacao.value && gravidade.value) {
      const alerta = {
        id: Date.now(),
        titulo: titulo.value,
        descricao: descricao.value,
        localizacao: localizacao.value,
        imagem: imagem.value,
        gravidade: gravidade.value,
        usuario: sessao.email,
        nomeUsuario: sessao.nome,
        data: dataFormatada,
        tipo: "Alerta"
      }
      postagens.push(alerta);
      localStorage.setItem("postagens", JSON.stringify(postagens));
      const modal = document.getElementById("exampleModal");
      const modalBootstrap = new bootstrap.Modal(modal, {backdrop : false});
      modalBootstrap.toggle();
      const tempo = setInterval(() => {
        modalBootstrap.toggle();
        window.location.href = "./home.html";
      }, 1500);
    }
  } else {
    if (titulo.value && sessao && localizacao.value && gravidade.value) {
      const alerta = postagens.find(post => post.id == idValor.value);
      alerta.titulo = titulo.value;
      alerta.descricao = descricao.value;
      alerta.imagem = imagem.value;
      alerta.gravidade = gravidade.value;

      localStorage.setItem("postagens", JSON.stringify(postagens));
      localStorage.removeItem("postagemEditar");
      window.location.href = "../paginas/postagens.html";
    }
  }

});

function alertaCriado(pagina) {
  document.getElementById("exampleModal").setAttribute("data-bs-toggle", "modal");
  const tempo = setInterval(() => {
    window.location.href = pagina;
  }, 2000);
  clearInterval(tempo);
}