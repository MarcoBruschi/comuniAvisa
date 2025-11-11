async function valida_sessao(){
    const retorno = await fetch("http://localhost/comuniAvisaprojeto/php/valida_sessao.php");
    const resposta = await retorno.json();
    if(resposta.status == "nok"){
        window.location.href = '../index.html';
    }
}

async function sair() {
    const req = await fetch("http://localhost/comuniAvisaprojeto/php/cliente_logoff.php");
    if(!req.ok){
        return;
    }
    const res = await req.json();
    if (res.status === 'ok') {
        window.location.href = 'http://localhost/comuniAvisaprojeto/index.html';
    }
}