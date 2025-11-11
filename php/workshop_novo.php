<?php
    include_once('conexao.php');
    session_start();
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];
    $titulo = isset($_POST['titulo']) ? $_POST['titulo'] : '';
    $conteudo = isset($_POST['conteudo']) ? $_POST['conteudo'] : '';
    $localizacao = isset($_POST['localizacao']) ? $_POST['localizacao'] : '';
    $data = isset($_POST['data']) ? $_POST['data'] : '';
    $horario = isset($_POST['horario']) ? $_POST['horario'] : '';
    $tema = isset($_POST['tema']) ? $_POST['tema'] : '';
    $publico = isset($_POST['publico']) ? $_POST['publico'] : '';
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

    if ($titulo === '' || $conteudo === '' || $localizacao === '' || $data === '' || $horario === '' || $tema === '' || $publico === '') {
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
    $stmt = $conexao->prepare("INSERT INTO workshop(titulo, conteudo, localizacao, data, horario, tema, publico, nome_usuario, data_criacao, id_usuario) VALUES(?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)");
    $stmt->bind_param("ssssssssi", $titulo, $conteudo, $localizacao, $data, $horario, $tema, $publico, $nome_usuario, $id_usuario);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'Workshop criado com sucesso',
            'data' => []
        ];
    }else{
        $retorno = [
            'status' => 'nok',
            'mensagem' => 'falha ao inserir o Workshop',
            'data' => []
        ];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);