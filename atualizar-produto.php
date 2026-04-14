<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/produto-utils.php';

exigirAutenticacaoJson();

$dadosProduto = validarDadosProduto(lerJsonDaRequisicao(), true);

try {
    $pdo = obterConexaoBanco();
    $stmt = $pdo->prepare(
        'UPDATE produtos
         SET nome = :nome,
             categoria = :categoria,
             preco = :preco,
             descricao = :descricao,
             imagem = :imagem
         WHERE id = :id'
    );
    $stmt->execute([
        ':id' => $dadosProduto['id'],
        ':nome' => $dadosProduto['nome'],
        ':categoria' => $dadosProduto['categoria'],
        ':preco' => $dadosProduto['preco'],
        ':descricao' => $dadosProduto['descricao'],
        ':imagem' => $dadosProduto['imagem']
    ]);

    if ($stmt->rowCount() === 0) {
        $verificacao = $pdo->prepare('SELECT id FROM produtos WHERE id = :id');
        $verificacao->execute([':id' => $dadosProduto['id']]);

        if (!$verificacao->fetch()) {
            enviarJson([
                'sucesso' => false,
                'mensagem' => 'Produto nao encontrado.'
            ], 404);
        }
    }

    enviarJson([
        'sucesso' => true,
        'mensagem' => 'Produto atualizado com sucesso.',
        'produto' => $dadosProduto
    ]);
} catch (Throwable $erro) {
    enviarJson([
        'sucesso' => false,
        'mensagem' => 'Erro ao atualizar produto no banco de dados.'
    ], 500);
}
