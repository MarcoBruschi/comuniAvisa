<?php
    header("Access-Control-Allow-Origin: *");
    session_start();
    include_once('conexao.php');
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];

    if(isset($_POST['id'])){
        // Simulando as informações que vem do front
        $nome       = $_POST['nome']; // $_POST['nome'];
        $email      = $_POST['email'];
        $telefone    = $_POST['telefone'];
        $endereco   = $_POST['endereco'];
        $senha      = $_POST['senha'];
    
        // Preparando para inserção no banco de dados
        if ($senha === '') {
            // Se a senha estiver vazia, não a atualize
            $stmt = $conexao->prepare("UPDATE usuario SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE id = ?");
            $stmt->bind_param("ssssi", $nome, $email, $telefone, $endereco, $_POST['id']);
        } else {
            $stmt = $conexao->prepare("UPDATE usuario SET nome = ?, email = ?, telefone = ?, endereco = ?, senha = ? WHERE id = ?");
            $stmt->bind_param("sssssi", $nome, $email, $telefone, $endereco, $senha, $_POST['id']);
        }
        $stmt->execute();

        if($stmt->affected_rows > 0){
            if (isset($_SESSION['usuario'])) {
                $usuario = $_SESSION['usuario'][0];
                $usuario['nome'] = $nome;
                $usuario['email'] = $email;
                $usuario['telefone'] = $telefone;
                $usuario['endereco'] = $endereco;
                if ($senha !== '') {
                    $usuario['senha'] = $senha;
                }
                $_SESSION['usuario'][0] = $usuario;
            }
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

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);