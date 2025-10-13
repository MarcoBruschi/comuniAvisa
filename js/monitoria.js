let postagens = localStorage.getItem("postagens") ? JSON.parse(localStorage.getItem("postagens")) : [];
const sessao = JSON.parse(localStorage.getItem("sessao"));
const btnCriarAlerta = document.getElementById("criar-alerta");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const tipoInput = document.getElementById("tipo");
const localizacao = document.getElementById("localizacao");
const dataInput = document.getElementById("data");
const horarioInput = document.getElementById("horario");
const imagem = document.getElementById("imagem");
const btnCriarMonitoria = document.getElementById("criar-monitoria");
const tituloForm = document.querySelector(".titulo-form");
const idValor = document.getElementById("id");
idValor.value = localStorage.getItem("postagemEditar") ? JSON.parse(localStorage.getItem("postagemEditar")) : "";

if (idValor.value) {
  const post = postagens.find(post => post.id == idValor.value);
  titulo.value = post.titulo;
  descricao.value = post.descricao;
  localizacao.value = post.localizacao;
  imagem.value = post.imagem;
  tipoInput.value = post.tipo;
  dataInput.value = post.dia;
  horarioInput.value = post.horario;

  tituloForm.textContent = "Editar Monitoria";
  btnCriarMonitoria.textContent = "Editar Monitoria";
} else {
  tituloForm.textContent = "Criar Monitoria";
  btnCriarMonitoria.textContent = "Criar Monitoria";
}

btnCriarMonitoria.addEventListener("click", (event) => {

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
      const monitoria = {
        id: Date.now(),
        titulo: titulo.value,
        descricao: descricao.value,
        localizacao: localizacao.value,
        imagem: imagem.value,
        horario: horarioInput.value,
        tipo: tipoInput.value,
        dia: dataInput.value,
        usuario: sessao.email,
        nomeUsuario: sessao.nome,
        data: dataFormatada,
        tipo: "Monitoria"
      }
      postagens.push(monitoria);
      localStorage.setItem("postagens", JSON.stringify(postagens));
      const modal = document.getElementById("exampleModal");
      const modalBootstrap = new bootstrap.Modal(modal, {backdrop : false});

      titulo.value = "";
      descricao.value = "";
      localizacao.value = "";
      imagem.value = "";
        tipoInput.value = "Tipo de Monitoria";
        dataInput.value = "";
        horarioInput.value = "";

      
      modalBootstrap.show();
      setTimeout(() => {
        modalBootstrap.hide();
      }, 1500);
    }
  } else {
    if (validacao()) {

      const monitoria = postagens.find(post => post.id == idValor.value);
      monitoria.titulo = titulo.value;
      monitoria.localizacao = localizacao.value;
      monitoria.descricao = descricao.value;
      monitoria.imagem = imagem.value;
      monitoria.tipo = tipoInput.value;
      monitoria.data = dataInput.value;
      monitoria.horario = horarioInput.value;

      localStorage.setItem("postagens", JSON.stringify(postagens));
      localStorage.removeItem("postagemEditar");
      window.location.href = "../paginas/postagens.html";
    }
  }

});

function validacao() {
  if (titulo.value && localizacao.value && horarioInput.value && dataInput.value && (tipoInput.value !== "Tipo da Monitoria")) return true;
  return false;
}