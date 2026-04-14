<?php

header('Content-Type: application/json; charset=utf-8');

$caminhoArquivo = __DIR__ . '/dados/produtos.json';
$dadosRecebidos = json_decode(file_get_contents('php://input'), true);

if (
    !is_array($dadosRecebidos) ||
    empty($dadosRecebidos['nome']) ||
    empty($dadosRecebidos['categoria']) ||
    !isset($dadosRecebidos['preco']) ||
    empty($dadosRecebidos['descricao'])
) {
    http_response_code(400);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Dados invalidos.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$preco = filter_var($dadosRecebidos['preco'], FILTER_VALIDATE_FLOAT);
$imagem = trim($dadosRecebidos['imagem'] ?? '');

if ($preco === false || $preco <= 0) {
    http_response_code(400);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Informe um preco valido.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($imagem !== '' && filter_var($imagem, FILTER_VALIDATE_URL) === false) {
    http_response_code(400);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Informe uma URL de imagem valida.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$produtos = [];

if (file_exists($caminhoArquivo)) {
    $conteudoAtual = file_get_contents($caminhoArquivo);
    $produtos = json_decode($conteudoAtual, true) ?? [];
}

$maiorId = 0;

foreach ($produtos as $produto) {
    if (isset($produto['id']) && $produto['id'] > $maiorId) {
        $maiorId = $produto['id'];
    }
}

$novoProduto = [
    'id' => $maiorId + 1,
    'nome' => trim($dadosRecebidos['nome']),
    'categoria' => trim($dadosRecebidos['categoria']),
    'preco' => (float) $preco,
    'descricao' => trim($dadosRecebidos['descricao']),
    'imagem' => $imagem
];

$produtos[] = $novoProduto;

file_put_contents(
    $caminhoArquivo,
    json_encode($produtos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);

echo json_encode([
    'sucesso' => true,
    'mensagem' => 'Produto salvo com sucesso.',
    'produto' => $novoProduto
], JSON_UNESCAPED_UNICODE);
