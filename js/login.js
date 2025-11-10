const btnEntrar = document.getElementById("entrar");
const btnCriarConta = document.getElementById("criar-conta");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

const tituloForm = document.querySelector(".titulo-login");
const nomeCampo = document.querySelector(".nome-cadastro");

const erroCampo = document.querySelector(".erroCampo");

let estado = "login";

function mudarEstado() {
  estado = (estado === "login") ? "cadastro" : "login";

  if (estado === 'cadastro') {
    tituloForm.textContent = 'Cadastro';
    nomeCampo.classList.remove('d-none');
    nomeCampo.classList.add('d-flex');

    btnEntrar.textContent = 'Criar Conta';
    btnCriarConta.textContent = 'Entrar';

  } else {
    tituloForm.textContent = 'Login';
    nomeCampo.classList.add('d-none');
    nomeCampo.classList.remove('d-flex');
    nome.removeAttribute('required');

    btnEntrar.textContent = 'Entrar';
    btnCriarConta.textContent = 'Criar conta';
  }
}

btnEntrar.addEventListener("click", async (event) => {

  event.preventDefault();
  erroCampo.textContent = "";

  if (estado === "login") {

    const fd = new FormData();
    fd.append("nome", nome.value);
    fd.append("email", email.value);
    fd.append("senha", senha.value);


    const req = await fetch("http://localhost/comuniAvisa/php/cliente_login.php", {
      method: 'POST',
      body: fd
    });

    const res = await req.json();
    if (res.status === 'ok') {
      window.location.href = "http://localhost/comuniAvisa/paginas/home.html";
    }

  } else {

    const fd = new FormData();
    fd.append("nome", nome.value);
    fd.append("email", email.value);
    fd.append("senha", senha.value);


    const req = await fetch("http://localhost/comuniAvisa/php/cliente_novo.php", {
      method: 'POST',
      body: fd
    });

    const res = await req.json();
    if (res.status === 'ok') {
      mudarEstado();
    }
  }
});

btnCriarConta.addEventListener("click", (event) => {

  event.preventDefault();

  erroCampo.textContent = "";

  mudarEstado();
});