<?php
    header("Access-Control-Allow-Origin: *");
    include_once('conexao.php');
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];

    if(isset($_GET['id'])){
        $titulo = isset($_POST['titulo']) ? $_POST['titulo'] : '';
        $descricao = isset($_POST['descricao']) ? $_POST['descricao'] : '';
        $tipo = isset($_POST['tipo']) ? $_POST['tipo'] : '';
        $localizacao = isset($_POST['localizacao']) ? $_POST['localizacao'] : '';
        $data = isset($_POST['data']) ? $_POST['data'] : '';
        $horario = isset($_POST['horario']) ? $_POST['horario'] : '';
        $endereco_imagem = isset($_POST['endereco_imagem']) ? $_POST['endereco_imagem'] : '';

        $stmt = $conexao->prepare("UPDATE monitoria SET titulo = ?, descricao = ?, localizacao = ?, tipo = ?, endereco_imagem = ?, data = ?, horario = ? WHERE id = ?");
        $stmt->bind_param("sssssssi", $titulo, $descricao, $localizacao, $tipo, $endereco_imagem, $data, $horario, $_GET['id']);
        $stmt->execute();

        if($stmt->affected_rows > 0){

            $retorno = [
                'status'    => 'ok',
                'mensagem'  => 'Monitoria alterada com sucesso.',
                'data'      => []
            ];
        }else{
            $retorno = [
                'status'    => 'nok',
                'mensagem'  => 'Não foi possível alterar a Monitoria (erro ou dados iguais)!',
                'data'      => []
            ];
        }
        $stmt->close();
    }else{
        $retorno = [
            'status'    => 'nok',
            'mensagem'  => 'Não posso alterar uma Monitoria sem um ID informado.',
            'data'      => []
        ];
    }
       
    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);