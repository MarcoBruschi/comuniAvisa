document.addEventListener("DOMContentLoaded", async () => {
  const req = await fetch("http://localhost/comuniAvisaprojeto/php/cliente_get.php");
  const res = await req.json();
  const user = res.data;

  document.getElementById("nome").value = user.nome;
  document.getElementById("email").value = user.email;
  document.getElementById("telefone").value = user.telefone;
  document.getElementById("endereco").value = user.endereco;
  document.getElementById("id").value = user.id;

  const campoErro = document.querySelector(".erroCampo");
  campoErro.textContent = "";

  const btnSalvar = document.getElementById("salvar-perfil");
  btnSalvar.addEventListener("click", async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("id", Number(document.getElementById("id").value));
    fd.append("nome", document.getElementById("nome").value);
    fd.append("email", document.getElementById("email").value);
    fd.append("telefone", document.getElementById("telefone").value);
    fd.append("endereco", document.getElementById("endereco").value);
    fd.append("senha", document.getElementById("senha").value);

    const req = await fetch("../php/cliente_alterar.php", {
      method: 'POST',
      body: fd
    });
    const res = await req.json();
    if (res.status === 'ok') {
      window.location.href = "../paginas/home.html";
    } else {
      campoErro.textContent = `Erro ao salvar perfil. ${res.mensagem}. Tente novamente.`;
    }
  });
  const btnExcluir = document.getElementById("excluir-perfil");
  btnExcluir.addEventListener("click", async () => {
    const req = await fetch("../php/cliente_excluir.php?id="+document.getElementById("id").value);
    const res = await req.json();
    console.log(res, document.getElementById("id").value);
    if (res.status === 'ok') {
      const logoff = await fetch("../php/cliente_logoff.php");
      window.location.href = "../index.html";
    } else {
      campoErro.textContent = `Erro ao excluir perfil. ${res.mensagem}. Tente novamente.`;
    }
  });
});