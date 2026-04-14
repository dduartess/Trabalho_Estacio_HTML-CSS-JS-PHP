<?php

function obterConfiguracaoBanco(): array
{
    return [
        'host' => getenv('DB_HOST') ?: '127.0.0.1',
        'port' => getenv('DB_PORT') ?: '3306',
        'dbname' => getenv('DB_NAME') ?: 'mercearia_sao_jose',
        'user' => getenv('DB_USER') ?: 'mercearia_user',
        'password' => getenv('DB_PASSWORD') ?: 'mercearia_pass',
        'charset' => 'utf8mb4'
    ];
}

function obterConexaoBanco(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $config = obterConfiguracaoBanco();

    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=%s',
        $config['host'],
        $config['port'],
        $config['dbname'],
        $config['charset']
    );

    $pdo = new PDO($dsn, $config['user'], $config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    return $pdo;
}
