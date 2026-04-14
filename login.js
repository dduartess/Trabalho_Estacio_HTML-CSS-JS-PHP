async function lerRespostaJson(resposta) {
  const texto = await resposta.text();

  if (!texto) {
    return null;
  }

  try {
    return JSON.parse(texto);
  } catch (erro) {
    return null;
  }
}

function exibirMensagemLogin(texto, tipo = 'error') {
  const mensagem = document.getElementById('mensagem-login');

  if (!mensagem) {
    return;
  }

  mensagem.textContent = texto;
  mensagem.className = `feedback-message is-${tipo}`;
  mensagem.hidden = false;
}

function limparMensagemLogin() {
  const mensagem = document.getElementById('mensagem-login');

  if (!mensagem) {
    return;
  }

  mensagem.hidden = true;
  mensagem.textContent = '';
  mensagem.className = 'feedback-message';
}

async function enviarLogin(evento) {
  evento.preventDefault();

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();

  limparMensagemLogin();

  if (!email || !senha) {
    exibirMensagemLogin('Informe email e senha.');
    return;
  }

  try {
    const resposta = await fetch('login-handler.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    });

    const resultado = await lerRespostaJson(resposta);

    if (!resposta.ok || !resultado?.sucesso) {
      exibirMensagemLogin(resultado?.mensagem || 'Nao foi possivel entrar.');
      return;
    }

    window.location.href = 'painel.php';
  } catch (erro) {
    exibirMensagemLogin('Erro ao processar o login.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('form-login');

  if (!formulario) {
    return;
  }

  formulario.addEventListener('submit', enviarLogin);
});
