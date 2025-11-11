<?php
    include_once('conexao.php');
    session_start();
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];
    $titulo = isset($_POST['titulo']) ? $_POST['titulo'] : '';
    $descricao = isset($_POST['descricao']) ? $_POST['descricao'] : '';
    $localizacao = isset($_POST['localizacao']) ? $_POST['localizacao'] : '';
    $endereco_imagem = isset($_POST['endereco_imagem']) ? $_POST['endereco_imagem'] : '';
    $tempo_servico = isset($_POST['tempo_servico']) ? $_POST['tempo_servico'] : '';
    $nome_usuario = isset($_SESSION['usuario'][0]) ? $_SESSION['usuario'][0]['nome'] : '';
    $id_usuario = isset($_SESSION['usuario'][0]) ? $_SESSION['usuario'][0]['id'] : '';

    if (!$id_usuario) {
      $retorno = [
          'status' => 'nok',
          'mensagem' => 'Usuário não autenticado.',
          'data' => []
      ];
      header("Content-type:application/json;charset=utf-8");
      echo json_encode($retorno);
      exit;
    }

    if ($titulo === '' || $localizacao === '' || $tempo_servico === '') {
        $retorno = [
            'status' => 'nok',
            'mensagem' => 'Todos os campos são obrigatórios.',
            'data' => []
        ];
        header("Content-type:application/json;charset=utf-8");
        echo json_encode($retorno);
        exit;
    }

    // Preparando para inserção no banco de dados
    $stmt = $conexao->prepare("INSERT INTO servico(titulo, descricao, localizacao, tempo_servico, data_criacao, endereco_imagem, nome_usuario, id_usuario) VALUES(?, ?, ?, ?, NOW(), ?, ?, ?)");
    $stmt->bind_param("ssssssi", $titulo, $descricao, $localizacao, $tempo_servico, $endereco_imagem, $nome_usuario, $id_usuario);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'Serviço criado com sucesso',
            'data' => []
        ];
    }else{
        $retorno = [
            'status' => 'nok',
            'mensagem' => 'falha ao inserir o Serviço',
            'data' => []
        ];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);