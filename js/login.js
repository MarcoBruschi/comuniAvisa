const contas = localStorage.getItem("contas") ? JSON.parse(localStorage.getItem("contas")) : [];

const btnEntrar = document.getElementById("entrar");
const btnCriarConta = document.getElementById("criar-conta");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

btnEntrar.addEventListener("click", (event) => {
  event.preventDefault();

  const contaUsuario = contas.find(conta => conta.email === email.value);

  if (email.value && senha.value) {
    if (contaUsuario) {
      if (contaUsuario.senha === senha.value) {
        const sessao = {
          nome : nome.value,
          email : email.value
        }
        localStorage.setItem("sessao", JSON.stringify(sessao));
        window.location.href = "./paginas/home.html";
      }
    }
  }
});

btnCriarConta.addEventListener("click", (event) => {
  event.preventDefault();

  const contaUsuario = contas.find(conta => conta.email === email.value);

  if (!contaUsuario) {
    if (email.value && senha.value) {
      const conta = {
        nome : nome.value,
        email : email.value,
        senha : senha.value
      }
      
      contas.push(conta);
      localStorage.setItem("contas", JSON.stringify(contas));
    }
  }
});