<?php

header('Content-Type: application/json; charset=utf-8');

$caminhoArquivo = __DIR__ . '/dados/produtos.json';

$dadosRecebidos = json_decode(file_get_contents('php://input'), true);

if (!is_array($dadosRecebidos) || empty($dadosRecebidos['id'])) {
    http_response_code(400);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'ID inválido.'
    ]);
    exit;
}

$idProduto = (int) $dadosRecebidos['id'];

$produtos = [];

if (file_exists($caminhoArquivo)) {
    $conteudoAtual = file_get_contents($caminhoArquivo);
    $produtos = json_decode($conteudoAtual, true) ?? [];
}

$produtosFiltrados = array_values(array_filter($produtos, function ($produto) use ($idProduto) {
    return (int) $produto['id'] !== $idProduto;
}));

file_put_contents(
    $caminhoArquivo,
    json_encode($produtosFiltrados, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);

echo json_encode([
    'sucesso' => true,
    'mensagem' => 'Produto excluído com sucesso.'
]);