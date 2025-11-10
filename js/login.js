const btnEntrar = document.getElementById("entrar");
const btnCriarConta = document.getElementById("criar-conta");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const telefone = document.getElementById("telefone");
const endereco = document.getElementById("endereco");

const tituloForm = document.querySelector(".titulo-login");
const nomeCampo = document.querySelector(".nome-cadastro");
const telefoneCampo = document.querySelector(".telefone-cadastro");
const enderecoCampo = document.querySelector(".endereco-cadastro");

const erroCampo = document.querySelector(".erroCampo");

let estado = "login";

function mudarEstado() {
  estado = (estado === "login") ? "cadastro" : "login";
  if (estado === 'cadastro') {
    tituloForm.textContent = 'Cadastro';

    nomeCampo.classList.remove('d-none');
    nomeCampo.classList.add('d-flex');
    telefoneCampo.classList.remove('d-none');
    telefoneCampo.classList.add('d-flex');
    enderecoCampo.classList.remove('d-none');
    enderecoCampo.classList.add('d-flex');

    btnEntrar.textContent = 'Criar Conta';
    btnCriarConta.textContent = 'Entrar';

  } else {
    tituloForm.textContent = 'Login';
    nomeCampo.classList.add('d-none');
    nomeCampo.classList.remove('d-flex');
    telefoneCampo.classList.add('d-none');
    telefoneCampo.classList.remove('d-flex');
    enderecoCampo.classList.add('d-none');
    enderecoCampo.classList.remove('d-flex');

    btnEntrar.textContent = 'Entrar';
    btnCriarConta.textContent = 'Criar conta';
  }
}

btnEntrar.addEventListener("click", async (event) => {

  event.preventDefault();
  erroCampo.textContent = "";

  if (estado === "login") {

    try {
      const fd = new FormData();
      fd.append("email", email.value);
      fd.append("senha", senha.value);


      const req = await fetch("http://localhost/comuniAvisaprojeto/php/cliente_login.php", {
        method: 'POST',
        body: fd
      });
      const res = await req.json();
      if (res.status === 'ok') {
        window.location.href = "http://localhost/comuniAvisaprojeto/paginas/home.html";
      } else {
        erroCampo.textContent = `Erro ao criar conta. ${res.mensagem}. Tente novamente.`;
      }
    } catch (error) {
      erroCampo.textContent = "Erro ao entrar. Verifique suas credenciais.";
    }

  } else {

    try {
      const fd = new FormData();
      fd.append("nome", nome.value);
      fd.append("email", email.value);
      fd.append("senha", senha.value);
      fd.append("telefone", telefone.value);
      fd.append("endereco", endereco.value);

      const req = await fetch("http://localhost/comuniAvisaprojeto/php/cliente_novo.php", {
        method: 'POST',
        body: fd
      });

      const res = await req.json();
      if (res.status === 'ok') {
        mudarEstado();
      } else {
        erroCampo.textContent = `Erro ao criar conta. ${res.mensagem}. Tente novamente.`;
      }
    } catch (error) {
      erroCampo.textContent = "Erro ao criar conta. Tente novamente.";
    }
  }
});

btnCriarConta.addEventListener("click", (event) => {

  event.preventDefault();

  erroCampo.textContent = "";

  mudarEstado();
});