const btnPostarServico = document.getElementById("postar-serviço");
const sessao = JSON.parse(localStorage.getItem("sessao"));
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const localizacao = document.getElementById("localizacao");
const imagem = document.getElementById("imagem");
const tempo = document.getElementById("tempo");
const idValor = document.getElementById("id");

let postagens = localStorage.getItem("postagens") ? JSON.parse(localStorage.getItem("postagens")) : [];
idValor.value = localStorage.getItem("postagemEditar") ? JSON.parse(localStorage.getItem("postagemEditar")) : "";

const tituloForm = document.querySelector(".titulo-form");

if (idValor.value) {
  const post = postagens.find(post => post.id == idValor.value);
  titulo.value = post.titulo;
  descricao.value = post.descricao;
  localizacao.value = post.localizacao;
  imagem.value = post.imagem;
  tempo.value = post.tempo;

  tituloForm.textContent = "Editar Serviço";
  btnPostarServico.textContent = "Editar Serviço";
} else {
  tituloForm.textContent = "Postar serviço";
  btnPostarServico.textContent = "Postar serviço";
}

btnPostarServico.addEventListener("click", (event) => {
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
    if (validacao()) {
      const servico = {
        id: Date.now(),
        titulo: titulo.value,
        descricao: descricao.value,
        localizacao: localizacao.value,
        imagem: imagem.value,
        tempo: tempo.value,
        usuario: sessao.email,
        nomeUsuario: sessao.nome,
        data: dataFormatada,
        tipo: "servico"
      }
      postagens.push(servico);
      localStorage.setItem("postagens", JSON.stringify(postagens));

      const modal = document.getElementById("exampleModal");
      const modalBootstrap = new bootstrap.Modal(modal, { backdrop: false });

      titulo.value = "";
      descricao.value = "";
      localizacao.value = "";
      imagem.value = "";
      tempo.value = "";

      modalBootstrap.show();
      setTimeout(() => {
        modalBootstrap.hide();
      }, 1500);
    }
  } else {
    if (validacao()) {
      const servico = postagens.find(post => post.id == idValor.value);
      servico.titulo = titulo.value;
      servico.localizacao = localizacao.value;
      servico.descricao = descricao.value;
      servico.imagem = imagem.value;
      servico.tempo = tempo.value;

      localStorage.setItem("postagens", JSON.stringify(postagens));
      localStorage.removeItem("postagemEditar");
      window.location.href = "../paginas/postagens.html";
    }
  }
});

function validacao() {
  if (titulo.value && sessao && localizacao.value && (tempo.value !== "")) return true;
  return false;
}
