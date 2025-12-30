<?php
    header("Access-Control-Allow-Origin: *");
    session_start();
    session_unset();
    session_destroy();
    $retorno = [
        'status'    => 'ok',
        'mensagem'  => '',
        'data'      => []
    ];
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($retorno);