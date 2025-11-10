<?php
    header("Access-Control-Allow-Origin: *");
    session_start();
    if(isset($_SESSION['usuario'])){
        $retorno = [
            'status'    => 'ok', // ok - nok
            'mensagem'  => '', // mensagem que envio para o front
            'data'      => []
        ];
    }else{
        $retorno = [
            'status'    => 'nok', // ok - nok
            'mensagem'  => '', // mensagem que envio para o front
            'data'      => []
        ];
    }
    // Cabeçalho JSON correto com charset
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($retorno);