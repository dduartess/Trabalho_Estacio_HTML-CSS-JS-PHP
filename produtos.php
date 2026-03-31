<?php

header('Content-Type: application/json; charset=utf-8');

$caminhoArquivo = __DIR__ . '/dados/produtos.json';

if (!file_exists($caminhoArquivo)) {
    echo json_encode([]);
    exit;
}

$conteudo = file_get_contents($caminhoArquivo);

if ($conteudo === false || trim($conteudo) === '') {
    echo json_encode([]);
    exit;
}

echo $conteudo;