<?php
// Variáveis de conexão com o Banco de Dados
$servidor = "127.0.0.1:3306";
$usuario  = "root";
$senha    = "@Ma061106@";
$nome_banco = "comuniavisa";

$conexao = new mysqli($servidor, $usuario, $senha, $nome_banco);
if($conexao->connect_error){
    echo $conexao->connect_error;
}