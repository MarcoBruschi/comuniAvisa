const btnCriarAlerta = document.getElementById("criar-alerta");
const sessao = JSON.parse(localStorage.getItem("sessao"));
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const imagem = document.getElementById("imagem");
const idValor = document.getElementById("id");
const postagens = localStorage.getItem("postagens") ? JSON.parse(localStorage.getItem("postagens")) : [];
idValor.value = localStorage.getItem("postagemEditar") ? JSON.parse(localStorage.getItem("postagemEditar")) : "";

const tituloForm = document.querySelector(".titulo-form");

if (idValor.value) {
  const post = postagens.find(post => post.id == idValor.value);
  titulo.value = post.titulo;
  descricao.value = post.descricao;
  imagem.value = post.imagem;

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
    if (titulo && sessao) {
      const alerta = {
        id: Date.now(),
        titulo: titulo.value,
        descricao: descricao.value,
        imagem: imagem.value,
        status: "0",
        usuario: sessao.email,
        nomeUsuario: sessao.nome,
        data: dataFormatada,
        tipo: "Alerta"
      }
      postagens.push(alerta);
      localStorage.setItem("postagens", JSON.stringify(postagens));
      window.location.href = "./home.html";
    }
  } else {
    if (titulo && sessao) {
      const alerta = postagens.find(post => post.id == idValor.value);
      alerta.titulo = titulo.value;
      alerta.descricao = descricao.value;
      alerta.imagem = imagem.value;

      const novosPosts = postagens.filter(post => post.id != idValor.value);
      novosPosts.push(alerta);
      localStorage.setItem("postagens", JSON.stringify(novosPosts));
      localStorage.removeItem("postagemEditar");
      window.location.href = "../paginas/postagens.html";
    }
  }

});