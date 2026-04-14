<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/produto-utils.php';

$dadosProduto = validarDadosProduto(lerJsonDaRequisicao());

try {
    $pdo = obterConexaoBanco();
    $stmt = $pdo->prepare(
        'INSERT INTO produtos (nome, categoria, preco, descricao, imagem)
         VALUES (:nome, :categoria, :preco, :descricao, :imagem)'
    );
    $stmt->execute([
        ':nome' => $dadosProduto['nome'],
        ':categoria' => $dadosProduto['categoria'],
        ':preco' => $dadosProduto['preco'],
        ':descricao' => $dadosProduto['descricao'],
        ':imagem' => $dadosProduto['imagem']
    ]);

    $dadosProduto['id'] = (int) $pdo->lastInsertId();

    enviarJson([
        'sucesso' => true,
        'mensagem' => 'Produto cadastrado com sucesso.',
        'produto' => $dadosProduto
    ]);
} catch (Throwable $erro) {
    enviarJson([
        'sucesso' => false,
        'mensagem' => 'Erro ao salvar produto no banco de dados.'
    ], 500);
}
