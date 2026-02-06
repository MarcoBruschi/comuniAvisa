async function valida_sessao(){
    const retorno = await fetch("/comuniAvisa/php/valida_sessao.php");
    const resposta = await retorno.json();
    if(resposta.status == "nok"){
        window.location.href = '/comuniAvisa/index.html';
    }
}

async function sair() {
    const req = await fetch("/comuniAvisa/php/cliente_logoff.php");
    if(!req.ok){
        return;
    }
    const res = await req.json();
    if (res.status === 'ok') {
        window.location.href = '/comuniAvisa/index.html';
    }
}