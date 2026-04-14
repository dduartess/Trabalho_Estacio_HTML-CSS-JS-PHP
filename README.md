# Mercearia Sao Jose

Projeto academico desenvolvido com HTML, CSS, JavaScript e PHP para simular o site e o painel administrativo de uma mercearia de bairro. A aplicacao agora usa MySQL em container Docker para armazenar os produtos e oferece CRUD completo pelo painel.

## Objetivo

Este projeto representa a evolucao de uma entrega estatica para uma versao com interacao no frontend e persistencia em banco de dados relacional. O foco esta em:

- exibicao dinamica de produtos na pagina principal
- gerenciamento de produtos em um painel administrativo
- integracao entre JavaScript e PHP
- uso de MySQL como base de dados

## Funcionalidades

- listagem dinamica de produtos na pagina inicial
- painel administrativo separado da vitrine principal
- cadastro de novos produtos com envio via `fetch`
- edicao de produtos no painel
- exclusao de produtos diretamente na tabela do painel
- mensagens de feedback para sucesso e erro
- persistencia em MySQL

## Estrutura do projeto

```text
Trabalho_Estacio_HTML-CSS-JS-PHP/
|-- index.html
|-- painel.html
|-- script.js
|-- painel.js
|-- db.php
|-- produto-utils.php
|-- produtos.php
|-- salvar-produto.php
|-- atualizar-produto.php
|-- excluir-produto.php
|-- docker-compose.yml
|-- README.md
|
|-- db/
|   `-- init.sql
|
`-- styles/
    `-- styles.css
```

## Paginas e arquivos principais

### Frontend

- `index.html`: vitrine principal da mercearia
- `painel.html`: painel administrativo para cadastro, edicao e exclusao
- `script.js`: busca os produtos em `produtos.php` e monta os cards na pagina inicial
- `painel.js`: lista produtos no painel, envia cadastro, atualizacao e exclusao
- `styles/styles.css`: estilos compartilhados entre a vitrine e o painel

### Backend

- `db.php`: centraliza a conexao PDO com o MySQL
- `produto-utils.php`: funcoes auxiliares de validacao e resposta JSON
- `produtos.php`: lista os produtos cadastrados no banco
- `salvar-produto.php`: recebe dados via `POST`, valida e insere um novo produto
- `atualizar-produto.php`: recebe dados via `POST` e atualiza um produto existente
- `excluir-produto.php`: recebe um `id` via `POST` e remove o produto correspondente
- `db/init.sql`: cria o schema, a tabela e dados iniciais

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- PHP
- MySQL
- Docker

## Como executar

Como o projeto depende de arquivos PHP e de um banco MySQL, ele deve ser executado com:

- Docker para subir o banco
- PHP local com suporte a PDO MySQL

### 1. Suba o banco com Docker

```bash
docker compose up -d
```

O container cria automaticamente o banco `mercearia_sao_jose`, a tabela `produtos` e insere os produtos iniciais via `db/init.sql`.

### 2. Inicie o servidor PHP local

Exemplo com o servidor embutido do PHP:

```bash
php -S localhost:8000
```

### 3. Acesse a aplicacao

Site:

```text
http://localhost:8000/index.html
```

Painel administrativo:

```text
http://localhost:8000/painel.html
```

## Configuracao do banco

Por padrao, o projeto usa estas credenciais:

- host: `127.0.0.1`
- porta: `3306`
- banco: `mercearia_sao_jose`
- usuario: `mercearia_user`
- senha: `mercearia_pass`

Se necessario, voce pode sobrescrever os valores com variaveis de ambiente:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

## Fluxo da aplicacao

1. A pagina inicial faz uma requisicao para `produtos.php`.
2. O PHP consulta o banco MySQL e devolve os produtos em JSON.
3. O JavaScript monta a interface dinamicamente no navegador.
4. No painel, o formulario envia novos produtos para `salvar-produto.php`.
5. Quando o usuario entra em modo de edicao, o formulario envia os dados para `atualizar-produto.php`.
6. A exclusao envia o `id` do item para `excluir-produto.php`.
7. A tabela `produtos` e atualizada e a interface recarrega os dados.

## Observacoes

- O projeto agora usa MySQL, nao mais JSON como fonte principal de dados.
- O PHP precisa estar com a extensao `pdo_mysql` habilitada.
- Se o projeto for aberto apenas clicando no arquivo HTML, as requisicoes para PHP nao vao funcionar.

## Autor

Desenvolvido por **Daniel Duarte Soares**.

Projeto academico - 2026
