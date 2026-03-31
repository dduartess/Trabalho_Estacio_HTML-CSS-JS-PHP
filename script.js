async function carregarProdutos() {
  const container = document.getElementById('lista-produtos');

  if (!container) {
    return;
  }

  try {
    const resposta = await fetch('produtos.php');
    const produtos = await resposta.json();

    container.innerHTML = '';

    produtos.forEach((produto) => {
      const card = document.createElement('article');
      card.className = 'product-card';

      card.innerHTML = `
        <div class="product-image">${produto.nome}</div>
        <div class="product-content">
          <span class="product-category">${produto.categoria}</span>
          <h3>${produto.nome}</h3>
          <p>${produto.descricao}</p>
          <div class="product-footer">
            <strong>R$ ${Number(produto.preco).toFixed(2).replace('.', ',')}</strong>
            <span>unidade</span>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (erro) {
    container.innerHTML = '<p>Não foi possível carregar os produtos.</p>';
  }
}

carregarProdutos();