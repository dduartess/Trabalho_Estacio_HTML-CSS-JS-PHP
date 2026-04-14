<?php

require_once __DIR__ . '/auth.php';

if (usuarioAutenticado()) {
    header('Location: painel.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acesso da Loja</title>
  <link rel="stylesheet" href="./styles/styles.css">
</head>
<body class="panel-page login-page">
  <main class="login-main">
    <section class="login-card">
      <a class="brand login-brand" href="index.html" aria-label="Voltar para a pagina inicial">
        <div class="brand-badge">MSJ</div>
        <div>
          <h1>Acesso da Loja</h1>
          <p>Entre com email e senha para gerenciar o catalogo.</p>
        </div>
      </a>

      <form id="form-login" class="product-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="admin@merceariasaonjose.com" required>
        </div>

        <div class="form-group">
          <label for="senha">Senha</label>
          <input type="password" id="senha" name="senha" placeholder="Digite sua senha" required>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Entrar</button>
          <a href="index.html" class="btn btn-secondary">Voltar ao site</a>
        </div>

        <p id="mensagem-login" class="feedback-message" hidden></p>
      </form>
    </section>
  </main>

  <script src="login.js"></script>
</body>
</html>
