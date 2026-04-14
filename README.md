# Mercearia Sao Jose

Sistema web de uma mercearia de bairro com vitrine publica, area administrativa protegida por login e gerenciamento completo de produtos.

O projeto utiliza PHP, MySQL e Docker para oferecer um fluxo completo de cadastro, listagem, edicao e exclusao de itens do catalogo.

## Objetivo

Este projeto foi evoluido para atender uma entrega com banco de dados, CRUD completo e integracao entre frontend e backend.

O foco da aplicacao esta em:

- exibicao dinamica de produtos na pagina principal
- gerenciamento de produtos em uma area administrativa separada
- autenticacao simples por email e senha
- persistencia em banco de dados MySQL
- comunicacao entre interface e endpoints PHP em formato JSON

## Funcionalidades

- vitrine principal com exibicao dinamica dos produtos
- area de login para acesso ao painel da loja
- cadastro de novos produtos
- edicao de produtos existentes
- exclusao de produtos
- mensagens de feedback para sucesso e erro
- persistencia em MySQL
- imagens iniciais para os produtos de exemplo

## Estrutura do projeto

```text
Trabalho_Estacio_HTML-CSS-JS-PHP/
|-- index.html
|-- login.php
|-- login.js
|-- login-handler.php
|-- logout.php
|-- painel.php
|-- painel.html
|-- script.js
|-- painel.js
|-- auth.php
|-- db.php
|-- produto-utils.php
|-- produtos.php
|-- salvar-produto.php
|-- atualizar-produto.php
|-- excluir-produto.php
|-- docker-compose.yml
|-- README.md
|
|-- assets/
|   `-- produtos/
|       |-- arroz.svg
|       |-- cafe.svg
|       |-- feijao.svg
|       `-- oleo.svg
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
- `login.php`: tela de acesso da area da loja
- `painel.php`: painel administrativo protegido por sessao
- `script.js`: busca os produtos em `produtos.php` e monta os cards na pagina inicial
- `painel.js`: lista produtos no painel, envia cadastro, atualizacao e exclusao
- `login.js`: envia email e senha para o backend de autenticacao
- `styles/styles.css`: estilos compartilhados entre vitrine, login e painel

### Backend

- `auth.php`: controle de sessao e validacao simples de login
- `db.php`: centraliza a conexao PDO com o MySQL
- `produto-utils.php`: funcoes auxiliares de validacao e resposta JSON
- `login-handler.php`: valida email e senha e cria a sessao
- `logout.php`: encerra a sessao e redireciona para o login
- `produtos.php`: lista os produtos cadastrados no banco
- `salvar-produto.php`: recebe dados via `POST`, valida e insere um novo produto
- `atualizar-produto.php`: recebe dados via `POST` e atualiza um produto existente
- `excluir-produto.php`: recebe um `id` via `POST` e remove o produto correspondente
- `db/init.sql`: cria o banco, a tabela e os dados iniciais

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- PHP
- MySQL
- Docker

## Como executar

O projeto depende de:

- Docker para subir o banco MySQL
- PHP local com suporte a `PDO MySQL`

### 1. Suba o banco com Docker

```bash
docker compose up -d
```

O container cria automaticamente:

- banco `mercearia_sao_jose`
- tabela `produtos`
- produtos iniciais com imagens locais

### 2. Inicie o servidor PHP local

```bash
php -S localhost:8000
```

### 3. Acesse a aplicacao

Pagina principal:

```text
http://localhost:8000/index.html
```

Tela de login:

```text
http://localhost:8000/login.php
```

Painel da loja:

```text
http://localhost:8000/painel.php
```

## Credenciais padrao do painel

Por padrao, o acesso da area administrativa usa:

- email: `admin@merceariasaojose.com`
- senha: `123456`

Esses valores podem ser alterados com variaveis de ambiente:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## Configuracao do banco

Por padrao, o projeto usa estas credenciais:

- host: `127.0.0.1`
- porta: `3306`
- banco: `mercearia_sao_jose`
- usuario: `mercearia_user`
- senha: `mercearia_pass`

Se necessario, voce pode sobrescrever os valores com:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

## Fluxo da aplicacao

1. A pagina principal faz uma requisicao para `produtos.php`.
2. O backend consulta o banco MySQL e devolve os produtos em JSON.
3. A interface monta os cards dinamicamente no navegador.
4. Para acessar a area administrativa, o usuario faz login em `login.php`.
5. O backend valida email e senha em `login-handler.php` e cria uma sessao.
6. No painel, o formulario envia novos produtos para `salvar-produto.php`.
7. No modo de edicao, o formulario envia os dados para `atualizar-produto.php`.
8. A exclusao envia o `id` do item para `excluir-produto.php`.
9. As rotas de escrita exigem autenticacao ativa.

## Observacoes

- O projeto usa MySQL como fonte principal de dados.
- O PHP precisa estar com a extensao `pdo_mysql` habilitada.
- O painel usa autenticacao simples com sessao, sem token.
- `painel.html` foi mantido apenas como redirecionamento para `painel.php`.
- Se o projeto for aberto apenas clicando no arquivo HTML, as requisicoes para PHP nao vao funcionar.

## Autor

Desenvolvido por **Daniel Duarte Soares**.

Projeto academico - 2026
