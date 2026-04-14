<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/produto-utils.php';

exigirAutenticacaoJson();

$dadosRecebidos = lerJsonDaRequisicao();
$idProduto = isset($dadosRecebidos['id']) ? (int) $dadosRecebidos['id'] : 0;

if ($idProduto <= 0) {
    enviarJson([
        'sucesso' => false,
        'mensagem' => 'Informe um ID valido.'
    ], 400);
}

try {
    $pdo = obterConexaoBanco();
    $stmt = $pdo->prepare('DELETE FROM produtos WHERE id = :id');
    $stmt->execute([':id' => $idProduto]);

    if ($stmt->rowCount() === 0) {
        enviarJson([
            'sucesso' => false,
            'mensagem' => 'Produto nao encontrado.'
        ], 404);
    }

    enviarJson([
        'sucesso' => true,
        'mensagem' => 'Produto excluido com sucesso.'
    ]);
} catch (Throwable $erro) {
    enviarJson([
        'sucesso' => false,
        'mensagem' => 'Erro ao excluir produto do banco de dados.'
    ], 500);
}
