<?php
    header("Access-Control-Allow-Origin: *");
    include_once('conexao.php');
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];

    if(isset($_GET['id'])){
        $stmt = $conexao->prepare("DELETE FROM monitoria WHERE id = ?");
        $stmt->bind_param("i",$_GET['id']);
        $stmt->execute();

        if($stmt->affected_rows > 0){
            $retorno = [
                'status'    => 'ok',
                'mensagem'  => 'Monitoria excluida',
                'data'      => []
            ];
        }else{
            $retorno = [
                'status'    => 'nok',
                'mensagem'  => 'Monitoria não excluida',
                'data'      => []
            ];
        }
        $stmt->close();
    }else{
        $retorno = [
            'status'    => 'nok',
            'mensagem'  => 'É necessário informar um ID para exclusão',
            'data'      => []
        ];
    }
    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);