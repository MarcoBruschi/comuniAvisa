const contas = localStorage.getItem("contas") ? JSON.parse(localStorage.getItem("contas")) : [];

const btnEntrar = document.getElementById("entrar");
const btnCriarConta = document.getElementById("criar-conta");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

if (localStorage.getItem("sessao")) {
  localStorage.removeItem("sessao");
}

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

btnEntrar.addEventListener("click", (event) => {
  event.preventDefault();

  const contaUsuario = contas.find(conta => conta.email === email.value);

  erroCampo.textContent = "";

  if (estado === "login") {
    if (email.value && senha.value) {
      if (contaUsuario) {
        if (contaUsuario.senha === senha.value) {
          const sessao = {
            nome: contaUsuario.nome,
            email: contaUsuario.email,
          }
          localStorage.setItem("sessao", JSON.stringify(sessao));
          window.location.href = "./paginas/home.html";
        } else {
          erroCampo.textContent = "Senha incorreta";
        }
      } else {
        erroCampo.textContent = "Conta inexistente";
      }
    } else {
      erroCampo.textContent = "Todos os campos devem ser preenchidos";
    }
  } else {
    if (!contaUsuario) {
      if (nome.value && email.value && senha.value) {
        const conta = {
          nome: nome.value,
          email: email.value,
          senha: senha.value
        }

        contas.push(conta);
        localStorage.setItem("contas", JSON.stringify(contas));

        mudarEstado();
      } else {
        erroCampo.textContent = "Todos os campos devem ser preenchidos";
      }
    } else {
      erroCampo.textContent = "Esse e-mail já está cadastrado";
    }
  }
});

btnCriarConta.addEventListener("click", (event) => {
  event.preventDefault();

  erroCampo.textContent = "";

  mudarEstado();
});