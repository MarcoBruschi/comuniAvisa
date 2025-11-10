const btnCriarAlerta = document.getElementById("criar-alerta");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const localizacao = document.getElementById("localizacao");
const imagem = document.getElementById("imagem");
const gravidade = document.getElementById("gravidade");
const idValor = document.getElementById("id");
const tituloForm = document.querySelector(".titulo-form");

const req = await fetch("http://localhost/comuniAvisaprojeto/php/cliente_get.php");
const res = await req.json();
const user = res.data;

btnCriarAlerta.addEventListener("click", async (event) => {
  event.preventDefault();
  const fd = new FormData();
  fd.append("titulo", titulo.value);
  fd.append("descricao", descricao.value);
  fd.append("localizacao", localizacao.value);
  fd.append("endereco_imagem", imagem.value);
  fd.append("gravidade", gravidade.value);
  const req = await fetch("http://localhost/comuniAvisaprojeto/php/alerta_novo.php", {
    method: 'POST',
    body: fd
  });
  const res = await req.json();
  console.log(res);
});

function alertaCriado(pagina) {
  document.getElementById("exampleModal").setAttribute("data-bs-toggle", "modal");
  const tempo = setInterval(() => {
    window.location.href = pagina;
  }, 2000);
  clearInterval(tempo);
}