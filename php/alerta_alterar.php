<?php
    header("Access-Control-Allow-Origin: *");
    session_start();
    include_once('conexao.php');
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];

    if(isset($_GET['id'])){
        $titulo       = $_POST['titulo'];
        $descricao      = $_POST['descricao'];
        $localizacao    = $_POST['localizacao'];
        $gravidade      = $_POST['gravidade'];
        $endereco_imagem = $_POST['endereco_imagem'];

        $stmt = $conexao->prepare("UPDATE alerta SET titulo = ?, descricao = ?, localizacao = ?, gravidade = ?, endereco_imagem = ? WHERE id = ?");
        $stmt->bind_param("sssssi", $titulo, $descricao, $localizacao, $gravidade, $endereco_imagem, $_GET['id']);
        $stmt->execute();

        if($stmt->affected_rows > 0){

            $retorno = [
                'status'    => 'ok',
                'mensagem'  => 'Alerta alterado com sucesso.',
                'data'      => []
            ];
        }else{
            $retorno = [
                'status'    => 'nok',
                'mensagem'  => 'Não posso alterar um Alerta.',
                'data'      => []
            ];
        }
        $stmt->close();
    }else{
        $retorno = [
            'status'    => 'nok',
            'mensagem'  => 'Não posso alterar um alerta sem um ID informado.',
            'data'      => []
        ];
    }
       
    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);