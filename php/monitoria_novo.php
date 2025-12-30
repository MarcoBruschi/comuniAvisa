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
    $tipo = isset($_POST['tipo']) ? $_POST['tipo'] : '';
    $localizacao = isset($_POST['localizacao']) ? $_POST['localizacao'] : '';
    $data = isset($_POST['data']) ? $_POST['data'] : '';
    $horario = isset($_POST['horario']) ? $_POST['horario'] : '';
    $endereco_imagem = isset($_POST['endereco_imagem']) ? $_POST['endereco_imagem'] : '';
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

    if ($titulo === '' || $localizacao === '' || $tipo === '' || $data === '' || $horario === '') {
        $retorno = [
            'status' => 'nok',
            'mensagem' => 'Todos os campos são obrigatórios.',
            'data' => []
        ];
        header("Content-type:application/json;charset=utf-8");
        echo json_encode($retorno);
        exit;
    }

    $stmt = $conexao->prepare("INSERT INTO monitoria(titulo, descricao, localizacao, tipo, data, horario, endereco_imagem, nome_usuario, data_criacao, id_usuario) VALUES(?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)");
    $stmt->bind_param("ssssssssi", $titulo, $descricao, $localizacao, $tipo, $data, $horario, $endereco_imagem, $nome_usuario, $id_usuario);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'Monitoria criada com sucesso',
            'data' => []
        ];
    }else{
        $retorno = [
            'status' => 'nok',
            'mensagem' => 'falha ao inserir a Monitoria',
            'data' => []
        ];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);