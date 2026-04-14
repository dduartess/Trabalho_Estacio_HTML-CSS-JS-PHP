<?php

function iniciarSessaoSegura(): void
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
}

function obterCredenciaisPainel(): array
{
    return [
        'email' => getenv('ADMIN_EMAIL') ?: 'admin@merceariasaojose.com',
        'senha' => getenv('ADMIN_PASSWORD') ?: '123456'
    ];
}

function usuarioAutenticado(): bool
{
    iniciarSessaoSegura();

    return !empty($_SESSION['usuario_autenticado']);
}

function exigirAutenticacaoJson(): void
{
    if (usuarioAutenticado()) {
        return;
    }

    http_response_code(401);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Voce precisa fazer login para continuar.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function redirecionarSeNaoAutenticado(string $destino = 'login.php'): void
{
    if (usuarioAutenticado()) {
        return;
    }

    header('Location: ' . $destino);
    exit;
}

function autenticarUsuario(string $email, string $senha): bool
{
    $credenciais = obterCredenciaisPainel();

    return $email === $credenciais['email'] && $senha === $credenciais['senha'];
}

function registrarLogin(string $email): void
{
    iniciarSessaoSegura();
    $_SESSION['usuario_autenticado'] = true;
    $_SESSION['usuario_email'] = $email;
}

function encerrarLogin(): void
{
    iniciarSessaoSegura();
    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
    }

    session_destroy();
}
