<?php
    header("Access-Control-Allow-Origin: *");
    include_once('conexao.php');
    session_start();
    if  (isset($_SESSION['usuario'])){
        $usuario = $_SESSION['usuario'][0];
    
        $retorno = [
            'status'    => 'ok',
            'mensagem'  => 'Dados da sessão.',
            'data'      => $usuario
        ];
     }  else{
        $retorno = [
            'status'    => 'nok',
            'mensagem'  => 'Nenhuma sessão ativa.',
            'data'      => []
        ];
    }

    
    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);
?>