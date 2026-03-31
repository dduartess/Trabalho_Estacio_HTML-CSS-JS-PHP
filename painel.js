async function carregarProdutosPainel() {
  const corpoTabela = document.getElementById('tabela-produtos');

  if (!corpoTabela) {
    return;
  }

  try {
    const resposta = await fetch('produtos.php');
    const produtos = await resposta.json();

    corpoTabela.innerHTML = '';

    produtos.forEach((produto) => {
      const linha = document.createElement('tr');

      linha.innerHTML = `
        <td>${produto.nome}</td>
        <td>${produto.categoria}</td>
        <td>R$ ${Number(produto.preco).toFixed(2).replace('.', ',')}</td>
        <td>${produto.descricao}</td>
        <td>
          <button type="button" class="table-btn danger" onclick="excluirProduto(${produto.id})">
            Excluir
          </button>
        </td>
      `;

      corpoTabela.appendChild(linha);
    });
  } catch (erro) {
    corpoTabela.innerHTML = '<tr><td colspan="5">Erro ao carregar produtos.</td></tr>';
  }
}

async function salvarProduto(evento) {
  evento.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const categoria = document.getElementById('categoria').value.trim();
  const preco = document.getElementById('preco').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const mensagem = document.getElementById('mensagem-formulario');

  if (!nome || !categoria || !preco || !descricao) {
    mensagem.textContent = 'Preencha todos os campos.';
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

    if (!resultado.sucesso) {
      mensagem.textContent = resultado.mensagem;
      return;
    }

    mensagem.textContent = 'Produto cadastrado com sucesso.';
    document.getElementById('form-produto').reset();
    carregarProdutosPainel();
  } catch (erro) {
    mensagem.textContent = 'Erro ao salvar produto.';
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

    if (resultado.sucesso) {
      carregarProdutosPainel();
    }
  } catch (erro) {
    alert('Erro ao excluir produto.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('form-produto');

  if (formulario) {
    formulario.addEventListener('submit', salvarProduto);
    carregarProdutosPainel();
  }
});