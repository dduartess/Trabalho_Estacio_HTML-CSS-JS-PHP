const PLACEHOLDER_IMAGEM = 'https://via.placeholder.com/640x420?text=Sem+Imagem';

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

function exibirMensagemProdutos(texto) {
  const mensagem = document.getElementById('mensagem-produtos');

  if (!mensagem) {
    return;
  }

  mensagem.textContent = texto;
  mensagem.hidden = false;
}

function esconderMensagemProdutos() {
  const mensagem = document.getElementById('mensagem-produtos');

  if (!mensagem) {
    return;
  }

  mensagem.hidden = true;
  mensagem.textContent = '';
}

function criarImagemProduto(produto) {
  const image = document.createElement('img');
  image.className = 'product-image';
  image.src = produto.imagem || PLACEHOLDER_IMAGEM;
  image.alt = produto.nome;
  image.loading = 'lazy';

  image.addEventListener('error', () => {
    if (image.src !== PLACEHOLDER_IMAGEM) {
      image.src = PLACEHOLDER_IMAGEM;
    }
  });

  return image;
}

function criarCardProduto(produto) {
  const card = document.createElement('article');
  card.className = 'product-card';

  const image = criarImagemProduto(produto);

  const content = document.createElement('div');
  content.className = 'product-content';

  const category = document.createElement('span');
  category.className = 'product-category';
  category.textContent = produto.categoria;

  const title = document.createElement('h3');
  title.textContent = produto.nome;

  const description = document.createElement('p');
  description.textContent = produto.descricao;

  const footer = document.createElement('div');
  footer.className = 'product-footer';

  const price = document.createElement('strong');
  price.textContent = formatarPreco(produto.preco);

  const unit = document.createElement('span');
  unit.textContent = 'unidade';

  footer.append(price, unit);
  content.append(category, title, description, footer);
  card.append(image, content);

  return card;
}

async function carregarProdutos() {
  const container = document.getElementById('lista-produtos');

  if (!container) {
    return;
  }

  try {
    const resposta = await fetch('produtos.php');
    const dados = await lerRespostaJson(resposta);
    container.innerHTML = '';

    if (!resposta.ok) {
      throw new Error(
        dados?.mensagem || 'Nao foi possivel consultar os produtos no servidor.'
      );
    }

    const produtos = Array.isArray(dados) ? dados : [];

    if (produtos.length === 0) {
      exibirMensagemProdutos('Nenhum produto cadastrado no momento.');
      return;
    }

    esconderMensagemProdutos();

    produtos.forEach((produto) => {
      container.appendChild(criarCardProduto(produto));
    });
  } catch (erro) {
    container.innerHTML = '';
    exibirMensagemProdutos(erro.message || 'Nao foi possivel carregar os produtos.');
  }
}

document.addEventListener('DOMContentLoaded', carregarProdutos);
