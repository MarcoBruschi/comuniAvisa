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
    $link = isset($_POST['link']) ? $_POST['link'] : '';
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

    if ($titulo === '' || $conteudo === '' || $tema === '' || $publico === '') {
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
    $stmt = $conexao->prepare("INSERT INTO conteudo_educativo(titulo, conteudo, link, tema, publico, data_criacao, nome_usuario, id_usuario) VALUES(?, ?, ?, ?, ?, NOW(), ?, ?)");
    $stmt->bind_param("ssssssi", $titulo, $conteudo, $link, $tema, $publico, $nome_usuario, $id_usuario);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'Conteúdo criado com sucesso',
            'data' => []
        ];
    }else{
        $retorno = [
            'status' => 'nok',
            'mensagem' => 'falha ao inserir o Conteúdo',
            'data' => []
        ];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);