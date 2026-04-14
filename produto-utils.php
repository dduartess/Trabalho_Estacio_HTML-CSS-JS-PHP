<?php

require_once __DIR__ . '/db.php';

function enviarJson(array $dados, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    exit;
}

function lerJsonDaRequisicao(): array
{
    $dados = json_decode(file_get_contents('php://input'), true);

    return is_array($dados) ? $dados : [];
}

function validarDadosProduto(array $dadosRecebidos, bool $exigirId = false): array
{
    $id = isset($dadosRecebidos['id']) ? (int) $dadosRecebidos['id'] : 0;
    $nome = trim($dadosRecebidos['nome'] ?? '');
    $categoria = trim($dadosRecebidos['categoria'] ?? '');
    $descricao = trim($dadosRecebidos['descricao'] ?? '');
    $imagem = trim($dadosRecebidos['imagem'] ?? '');
    $preco = filter_var($dadosRecebidos['preco'] ?? null, FILTER_VALIDATE_FLOAT);

    if ($exigirId && $id <= 0) {
        enviarJson([
            'sucesso' => false,
            'mensagem' => 'Informe um ID valido.'
        ], 400);
    }

    if ($nome === '' || $categoria === '' || $descricao === '' || $preco === false || $preco <= 0) {
        enviarJson([
            'sucesso' => false,
            'mensagem' => 'Preencha os campos obrigatorios com valores validos.'
        ], 400);
    }

    if ($imagem !== '' && filter_var($imagem, FILTER_VALIDATE_URL) === false) {
        enviarJson([
            'sucesso' => false,
            'mensagem' => 'Informe uma URL de imagem valida.'
        ], 400);
    }

    return [
        'id' => $id,
        'nome' => $nome,
        'categoria' => $categoria,
        'preco' => (float) $preco,
        'descricao' => $descricao,
        'imagem' => $imagem !== '' ? $imagem : null
    ];
}

function buscarTodosProdutos(): array
{
    $pdo = obterConexaoBanco();
    $stmt = $pdo->query(
        'SELECT id, nome, categoria, preco, descricao, imagem
         FROM produtos
         ORDER BY id DESC'
    );

    return $stmt->fetchAll();
}
