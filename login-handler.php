<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/auth.php';

$dados = json_decode(file_get_contents('php://input'), true);
$email = trim($dados['email'] ?? '');
$senha = trim($dados['senha'] ?? '');

if ($email === '' || $senha === '') {
    http_response_code(400);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Informe email e senha.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!autenticarUsuario($email, $senha)) {
    http_response_code(401);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Email ou senha invalidos.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

registrarLogin($email);

echo json_encode([
    'sucesso' => true,
    'mensagem' => 'Login realizado com sucesso.'
], JSON_UNESCAPED_UNICODE);
