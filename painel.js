const estadoFormulario = {
  modo: 'cadastro',
  produtoId: null
};

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

function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function obterElementosFormulario() {
  return {
    formulario: document.getElementById('form-produto'),
    campoId: document.getElementById('produto-id'),
    campoNome: document.getElementById('nome'),
    campoCategoria: document.getElementById('categoria'),
    campoPreco: document.getElementById('preco'),
    campoDescricao: document.getElementById('descricao'),
    campoImagem: document.getElementById('imagem'),
    titulo: document.getElementById('titulo-formulario'),
    botaoSubmit: document.getElementById('botao-submit'),
    botaoCancelar: document.getElementById('botao-cancelar')
  };
}

function atualizarModoFormulario() {
  const elementos = obterElementosFormulario();
  const emEdicao = estadoFormulario.modo === 'edicao';

  elementos.titulo.textContent = emEdicao ? 'Editar produto' : 'Novo produto';
  elementos.botaoSubmit.textContent = emEdicao ? 'Atualizar' : 'Salvar';
  elementos.botaoCancelar.hidden = !emEdicao;
}

function preencherFormulario(produto) {
  const elementos = obterElementosFormulario();

  estadoFormulario.modo = 'edicao';
  estadoFormulario.produtoId = Number(produto.id);

  elementos.campoId.value = produto.id;
  elementos.campoNome.value = produto.nome || '';
  elementos.campoCategoria.value = produto.categoria || '';
  elementos.campoPreco.value = produto.preco || '';
  elementos.campoDescricao.value = produto.descricao || '';
  elementos.campoImagem.value = produto.imagem || '';

  atualizarModoFormulario();
  limparMensagemFormulario();
  elementos.campoNome.focus();
}

function resetarFormulario() {
  const elementos = obterElementosFormulario();

  estadoFormulario.modo = 'cadastro';
  estadoFormulario.produtoId = null;

  elementos.formulario.reset();
  elementos.campoId.value = '';

  atualizarModoFormulario();
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

function criarCelulaImagem(produto) {
  const colunaImagem = document.createElement('td');

  if (!produto.imagem) {
    colunaImagem.textContent = 'Sem imagem';
    return colunaImagem;
  }

  const link = document.createElement('a');
  link.href = produto.imagem;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'image-link';
  link.textContent = 'Abrir imagem';

  colunaImagem.appendChild(link);
  return colunaImagem;
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

  const colunaImagem = criarCelulaImagem(produto);

  const colunaAcoes = document.createElement('td');
  colunaAcoes.className = 'table-actions';

  const botaoEditar = document.createElement('button');
  botaoEditar.type = 'button';
  botaoEditar.className = 'table-btn';
  botaoEditar.textContent = 'Editar';
  botaoEditar.addEventListener('click', () => preencherFormulario(produto));

  const botaoExcluir = document.createElement('button');
  botaoExcluir.type = 'button';
  botaoExcluir.className = 'table-btn danger';
  botaoExcluir.textContent = 'Excluir';
  botaoExcluir.addEventListener('click', () => excluirProduto(produto.id));

  colunaAcoes.append(botaoEditar, botaoExcluir);
  linha.append(
    colunaNome,
    colunaCategoria,
    colunaPreco,
    colunaDescricao,
    colunaImagem,
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
    const dados = await lerRespostaJson(resposta);
    corpoTabela.innerHTML = '';

    if (!resposta.ok) {
      throw new Error(dados?.mensagem || 'Erro ao carregar produtos.');
    }

    const produtos = Array.isArray(dados) ? dados : [];

    if (produtos.length === 0) {
      const linha = document.createElement('tr');
      const coluna = document.createElement('td');
      coluna.colSpan = 6;
      coluna.textContent = 'Nenhum produto cadastrado.';
      linha.appendChild(coluna);
      corpoTabela.appendChild(linha);
      return;
    }

    produtos.forEach((produto) => {
      corpoTabela.appendChild(criarLinhaProduto(produto));
    });
  } catch (erro) {
    corpoTabela.innerHTML = `<tr><td colspan="6">${erro.message || 'Erro ao carregar produtos.'}</td></tr>`;
  }
}

async function salvarProduto(evento) {
  evento.preventDefault();

  const elementos = obterElementosFormulario();
  const nome = elementos.campoNome.value.trim();
  const categoria = elementos.campoCategoria.value.trim();
  const preco = elementos.campoPreco.value.trim();
  const descricao = elementos.campoDescricao.value.trim();
  const imagem = elementos.campoImagem.value.trim();

  limparMensagemFormulario();

  if (!nome || !categoria || !preco || !descricao) {
    exibirMensagemFormulario('Preencha todos os campos obrigatorios.', 'error');
    return;
  }

  try {
    const endpoint = estadoFormulario.modo === 'edicao'
      ? 'atualizar-produto.php'
      : 'salvar-produto.php';

    const corpo = {
      nome,
      categoria,
      preco,
      descricao,
      imagem
    };

    if (estadoFormulario.modo === 'edicao') {
      corpo.id = estadoFormulario.produtoId;
    }

    const resposta = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(corpo)
    });

    const resultado = await lerRespostaJson(resposta);

    if (!resposta.ok || !resultado?.sucesso) {
      exibirMensagemFormulario(resultado?.mensagem || 'Erro ao salvar produto.', 'error');
      return;
    }

    exibirMensagemFormulario(
      estadoFormulario.modo === 'edicao'
        ? 'Produto atualizado com sucesso.'
        : 'Produto cadastrado com sucesso.',
      'success'
    );
    resetarFormulario();
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

    const resultado = await lerRespostaJson(resposta);

    if (!resposta.ok || !resultado?.sucesso) {
      exibirMensagemFormulario(resultado?.mensagem || 'Erro ao excluir produto.', 'error');
      return;
    }

    exibirMensagemFormulario('Produto excluido com sucesso.', 'success');
    await carregarProdutosPainel();
  } catch (erro) {
    exibirMensagemFormulario('Erro ao excluir produto.', 'error');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const { formulario, botaoCancelar } = obterElementosFormulario();

  if (!formulario) {
    return;
  }

  atualizarModoFormulario();
  formulario.addEventListener('submit', salvarProduto);
  botaoCancelar.addEventListener('click', () => {
    resetarFormulario();
    limparMensagemFormulario();
  });
  carregarProdutosPainel();
});
