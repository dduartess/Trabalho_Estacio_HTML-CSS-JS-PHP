<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/produto-utils.php';

try {
    echo json_encode(buscarTodosProdutos(), JSON_UNESCAPED_UNICODE);
} catch (Throwable $erro) {
    enviarJson([
        'sucesso' => false,
        'mensagem' => 'Erro ao consultar produtos no banco de dados.'
    ], 500);
}
