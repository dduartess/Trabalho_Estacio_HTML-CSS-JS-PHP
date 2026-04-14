CREATE DATABASE IF NOT EXISTS mercearia_sao_jose
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mercearia_sao_jose;

CREATE TABLE IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  descricao TEXT NOT NULL,
  imagem VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO produtos (nome, categoria, preco, descricao, imagem)
SELECT 'Arroz Tipo 1 - 5kg', 'Graos', 28.90, 'Produto essencial para o dia a dia, com rendimento e qualidade.', 'assets/produtos/arroz.svg'
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Arroz Tipo 1 - 5kg');

INSERT INTO produtos (nome, categoria, preco, descricao, imagem)
SELECT 'Feijao Carioca - 1kg', 'Graos', 8.99, 'Selecionado para manter sabor, praticidade e economia na compra.', 'assets/produtos/feijao.svg'
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Feijao Carioca - 1kg');

INSERT INTO produtos (nome, categoria, preco, descricao, imagem)
SELECT 'Oleo de Soja - 900ml', 'Cozinha', 7.49, 'Ideal para o preparo das refeicoes do dia a dia.', 'assets/produtos/oleo.svg'
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Oleo de Soja - 900ml');

INSERT INTO produtos (nome, categoria, preco, descricao, imagem)
SELECT 'Cafe Torrado e Moido - 500g', 'Bebidas', 15.90, 'Perfeito para comecar o dia com mais sabor.', 'assets/produtos/cafe.svg'
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Cafe Torrado e Moido - 500g');

UPDATE produtos
SET imagem = 'assets/produtos/arroz.svg'
WHERE nome = 'Arroz Tipo 1 - 5kg' AND (imagem IS NULL OR imagem = '');

UPDATE produtos
SET imagem = 'assets/produtos/feijao.svg'
WHERE nome = 'Feijao Carioca - 1kg' AND (imagem IS NULL OR imagem = '');

UPDATE produtos
SET imagem = 'assets/produtos/oleo.svg'
WHERE nome = 'Oleo de Soja - 900ml' AND (imagem IS NULL OR imagem = '');

UPDATE produtos
SET imagem = 'assets/produtos/cafe.svg'
WHERE nome = 'Cafe Torrado e Moido - 500g' AND (imagem IS NULL OR imagem = '');
