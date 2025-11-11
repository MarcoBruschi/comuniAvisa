<?php
    header("Access-Control-Allow-Origin: *");
    include_once('conexao.php');
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];

    if(isset($_GET['id'])){
        $titulo = $_POST['titulo'];
        $conteudo = $_POST['conteudo'];
        $link = $_POST['link'];
        $tema = $_POST['tema'];
        $publico = $_POST['publico'];

        $stmt = $conexao->prepare("UPDATE conteudo_educativo SET titulo = ?, conteudo = ?, link = ?, tema = ?, publico = ? WHERE id = ?");
        $stmt->bind_param("sssssi", $titulo, $conteudo, $link, $tema, $publico, $_GET['id']);
        $stmt->execute();

        if($stmt->affected_rows > 0){

            $retorno = [
                'status'    => 'ok',
                'mensagem'  => 'Conteúdo alterado com sucesso.',
                'data'      => []
            ];
        }else{
            $retorno = [
                'status'    => 'nok',
                'mensagem'  => 'Não foi possível alterar o Conteúdo (erro ou dados iguais)!',
                'data'      => []
            ];
        }
        $stmt->close();
    }else{
        $retorno = [
            'status'    => 'nok',
            'mensagem'  => 'Não posso alterar um Conteúdo sem um ID informado.',
            'data'      => []
        ];
    }
       
    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);