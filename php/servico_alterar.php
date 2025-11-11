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
        $descricao      = $_POST['descricao'];
        $localizacao    = $_POST['localizacao'];
        $endereco_imagem = $_POST['endereco_imagem'];
        $tempo_servico   = $_POST['tempo_servico'];

        $stmt = $conexao->prepare("UPDATE servico SET titulo = ?, descricao = ?, localizacao = ?, tempo_servico = ?, endereco_imagem = ? WHERE id = ?");
        $stmt->bind_param("sssssi", $titulo, $descricao, $localizacao, $tempo_servico, $endereco_imagem, $_GET['id']);
        $stmt->execute();

        if($stmt->affected_rows > 0){

            $retorno = [
                'status'    => 'ok',
                'mensagem'  => 'Serviço alterado com sucesso.',
                'data'      => []
            ];
        }else{
            $retorno = [
                'status'    => 'nok',
                'mensagem'  => 'Não foi possível alterar o Serviço (erro ou dados iguais)!',
                'data'      => []
            ];
        }
        $stmt->close();
    }else{
        $retorno = [
            'status'    => 'nok',
            'mensagem'  => 'Não posso alterar um serviço sem um ID informado.',
            'data'      => []
        ];
    }
       
    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);