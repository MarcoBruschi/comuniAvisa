async function valida_sessao(){
    const retorno = await fetch("../php/valida_sessao.php");
    const resposta = await retorno.json();
    if(resposta.status == "nok"){
        window.location.href = '../index.html';
    }
    console.log(resposta);
}

async function sair() {
    const req = await fetch("../php/cliente_logoff.php");
    if(!req.ok){
        console.log(req.mensagem);
        return;
    }
    const res = await req.json();
    if (res.status === 'ok') {
        window.location.href = '../index.html';
    }
}