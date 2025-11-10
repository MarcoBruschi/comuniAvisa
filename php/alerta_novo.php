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
    $gravidade = isset($_POST['gravidade']) ? $_POST['gravidade'] : '';
    $status = isset($_POST['status']) ? $_POST['status'] : 'Não resolvido';
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

    if ($titulo === '' || $localizacao === '' || $gravidade === '' || $nome_usuario === '') {
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
    $stmt = $conexao->prepare("INSERT INTO alerta(titulo, descricao, localizacao, gravidade, status, data_criacao, endereco_imagem, nome_usuario, id_usuario) VALUES(?, ?, ?, ?, ?, NOW(), ?, ?, ?)");
    $stmt->bind_param("sssssssi", $titulo, $descricao, $localizacao, $gravidade, $status, $endereco_imagem, $nome_usuario, $id_usuario);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'Alerta criado com sucesso',
            'data' => []
        ];
    }else{
        $retorno = [
            'status' => 'nok',
            'mensagem' => 'falha ao inserir o Alerta',
            'data' => []
        ];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);