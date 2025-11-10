<?php
    header("Access-Control-Allow-Origin: *");
    include_once('conexao.php');
    
        $retorno = [
            'status'    => 'ok',
            'mensagem'  => 'Dados da sessão.',
            'data'      => $usuario
        ];
    
    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);
?>