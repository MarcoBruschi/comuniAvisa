const btnCriarAlerta = document.getElementById("criar-alerta");
const sessao = JSON.parse(localStorage.getItem("sessao"));
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const imagem = document.getElementById("imagem");
const alertas = localStorage.getItem("alertas") ? JSON.parse(localStorage.getItem("alertas")) : [];
const idValor = document.getElementById("id");
idValor.value = localStorage.getItem("postagemEditar") ? JSON.parse(localStorage.getItem("postagemEditar")) : "";

const tituloForm = document.querySelector(".titulo-form");

if (idValor.value) {
  const alerta = alertas.find(alerta => alerta.id == idValor.value);
  titulo.value = alerta.titulo;
  descricao.value = alerta.descricao;
  imagem.value = alerta.imagem;

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
      alertas.push(alerta);
      localStorage.setItem("alertas", JSON.stringify(alertas));
      window.location.href = "./home.html";
    }
  } else {
    if (titulo && sessao) {
      const alerta = alertas.find(alerta => alerta.id == idValor.value);
      alerta.titulo = titulo.value;
      alerta.descricao = descricao.value;
      alerta.imagem = imagem.value;

      const novosAlertas = alertas.filter(alertas => alertas.id != idValor.value);
      novosAlertas.push(alerta);
      localStorage.setItem("alertas", JSON.stringify(novosAlertas));
      localStorage.removeItem("postagemEditar");
      window.location.href = "../paginas/postagens.html";
    }
  }

});