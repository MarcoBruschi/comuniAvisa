<?php
    header("Access-Control-Allow-Origin: *");
    include_once('conexao.php');
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];

    if(isset($_GET['id'])){
        $titulo       = $_POST['titulo'];
        $conteudo      = $_POST['conteudo'];
        $localizacao    = $_POST['localizacao'];
        $data      = $_POST['data'];
        $horario = $_POST['horario'];
        $tema = $_POST['tema'];
        $publico = $_POST['publico'];

        $stmt = $conexao->prepare("UPDATE workshop SET titulo = ?, conteudo = ?, localizacao = ?, data = ?, horario = ?, tema = ?, publico = ? WHERE id = ?");
        $stmt->bind_param("sssssssi", $titulo, $conteudo, $localizacao, $data, $horario, $tema, $publico, $_GET['id']);
        $stmt->execute();

        if($stmt->affected_rows > 0){

            $retorno = [
                'status'    => 'ok',
                'mensagem'  => 'Workshop alterado com sucesso.',
                'data'      => []
            ];
        }else{
            $retorno = [
                'status'    => 'nok',
                'mensagem'  => 'Não foi possível alterar o Workshop (erro ou dados iguais)!',
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