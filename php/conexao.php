<?php
$servidor = "servidor";
$usuario  = "usuario";
$senha    = "senha";
$nome_banco = "nomeDoBanco";

$conexao = new mysqli($servidor, $usuario, $senha, $nome_banco);
if($conexao->connect_error){
    echo $conexao->connect_error;
}