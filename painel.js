function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function exibirMensagemFormulario(texto, tipo = 'info') {
  const mensagem = document.getElementById('mensagem-formulario');

  if (!mensagem) {
    return;
  }

  mensagem.textContent = texto;
  mensagem.className = `feedback-message is-${tipo}`;
  mensagem.hidden = false;
}

function limparMensagemFormulario() {
  const mensagem = document.getElementById('mensagem-formulario');

  if (!mensagem) {
    return;
  }

  mensagem.hidden = true;
  mensagem.textContent = '';
  mensagem.className = 'feedback-message';
}

function criarLinhaProduto(produto) {
  const linha = document.createElement('tr');

  const colunaNome = document.createElement('td');
  colunaNome.textContent = produto.nome;

  const colunaCategoria = document.createElement('td');
  colunaCategoria.textContent = produto.categoria;

  const colunaPreco = document.createElement('td');
  colunaPreco.textContent = formatarPreco(produto.preco);

  const colunaDescricao = document.createElement('td');
  colunaDescricao.textContent = produto.descricao;

  const colunaAcoes = document.createElement('td');
  const botaoExcluir = document.createElement('button');
  botaoExcluir.type = 'button';
  botaoExcluir.className = 'table-btn danger';
  botaoExcluir.textContent = 'Excluir';
  botaoExcluir.addEventListener('click', () => excluirProduto(produto.id));

  colunaAcoes.appendChild(botaoExcluir);
  linha.append(
    colunaNome,
    colunaCategoria,
    colunaPreco,
    colunaDescricao,
    colunaAcoes
  );

  return linha;
}

async function carregarProdutosPainel() {
  const corpoTabela = document.getElementById('tabela-produtos');

  if (!corpoTabela) {
    return;
  }

  try {
    const resposta = await fetch('produtos.php');

    if (!resposta.ok) {
      throw new Error('Falha ao buscar produtos.');
    }

    const produtos = await resposta.json();
    corpoTabela.innerHTML = '';

    if (!Array.isArray(produtos) || produtos.length === 0) {
      const linha = document.createElement('tr');
      const coluna = document.createElement('td');
      coluna.colSpan = 5;
      coluna.textContent = 'Nenhum produto cadastrado.';
      linha.appendChild(coluna);
      corpoTabela.appendChild(linha);
      return;
    }

    produtos.forEach((produto) => {
      corpoTabela.appendChild(criarLinhaProduto(produto));
    });
  } catch (erro) {
    corpoTabela.innerHTML = '<tr><td colspan="5">Erro ao carregar produtos.</td></tr>';
  }
}

async function salvarProduto(evento) {
  evento.preventDefault();

  const formulario = document.getElementById('form-produto');
  const nome = document.getElementById('nome').value.trim();
  const categoria = document.getElementById('categoria').value.trim();
  const preco = document.getElementById('preco').value.trim();
  const descricao = document.getElementById('descricao').value.trim();

  limparMensagemFormulario();

  if (!nome || !categoria || !preco || !descricao) {
    exibirMensagemFormulario('Preencha todos os campos.', 'error');
    return;
  }

  try {
    const resposta = await fetch('salvar-produto.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome,
        categoria,
        preco,
        descricao
      })
    });

    const resultado = await resposta.json();

    if (!resposta.ok || !resultado.sucesso) {
      exibirMensagemFormulario(resultado.mensagem || 'Erro ao salvar produto.', 'error');
      return;
    }

    exibirMensagemFormulario('Produto cadastrado com sucesso.', 'success');
    formulario.reset();
    await carregarProdutosPainel();
  } catch (erro) {
    exibirMensagemFormulario('Erro ao salvar produto.', 'error');
  }
}

async function excluirProduto(id) {
  try {
    const resposta = await fetch('excluir-produto.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    const resultado = await resposta.json();

    if (!resposta.ok || !resultado.sucesso) {
      exibirMensagemFormulario(resultado.mensagem || 'Erro ao excluir produto.', 'error');
      return;
    }

    exibirMensagemFormulario('Produto excluído com sucesso.', 'success');
    await carregarProdutosPainel();
  } catch (erro) {
    exibirMensagemFormulario('Erro ao excluir produto.', 'error');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('form-produto');

  if (!formulario) {
    return;
  }

  formulario.addEventListener('submit', salvarProduto);
  carregarProdutosPainel();
});
