<?php
    include_once('conexao.php');

    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];

    if(isset($_GET['id'])){
        // Simulando as informações que vem do front
        $nome       = $_POST['nome']; // $_POST['nome'];
        $email      = $_POST['email'];
        $senha      = $_POST['senha'];
    
        // Preparando para inserção no banco de dados
        $stmt = $conexao->prepare("UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?");
        $stmt->bind_param("sssi",$nome, $email, $senha, $_GET['id']);
        $stmt->execute();

        if($stmt->affected_rows > 0){
            $retorno = [
                'status'    => 'ok',
                'mensagem'  => 'Registro alterado com sucesso.',
                'data'      => []
            ];
        }else{
            $retorno = [
                'status'    => 'nok',
                'mensagem'  => 'Não posso alterar um registro.'.json_encode($_GET),
                'data'      => []
            ];
        }
        $stmt->close();
    }else{
        $retorno = [
            'status'    => 'nok',
            'mensagem'  => 'Não posso alterar um registro sem um ID informado.',
            'data'      => []
        ];
    }
       
    $conexao->close();

    // Cabeçalho JSON correto com charset
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($retorno);