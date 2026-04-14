# Mercearia Sao Jose

Projeto academico desenvolvido com HTML, CSS, JavaScript e PHP para simular o site e o painel administrativo de uma mercearia de bairro. A aplicacao carrega produtos dinamicamente a partir de um arquivo JSON local e permite cadastrar e excluir itens pelo painel.

## Objetivo

Este projeto representa a evolucao de uma entrega estatica para uma versao com interacao no frontend e persistencia simples no backend. O foco esta em:

- exibicao dinamica de produtos na pagina principal
- gerenciamento de produtos em um painel administrativo
- integracao entre JavaScript e PHP
- uso de JSON como base de dados local

## Funcionalidades

- listagem dinamica de produtos na pagina inicial
- painel administrativo separado da vitrine principal
- cadastro de novos produtos com envio via `fetch`
- exclusao de produtos diretamente na tabela do painel
- mensagens de feedback para sucesso e erro
- persistencia em `dados/produtos.json`

## Estrutura do projeto

```text
Trabalho_Estacio_HTML-CSS-JS-PHP/
|-- index.html
|-- painel.html
|-- script.js
|-- painel.js
|-- produtos.php
|-- salvar-produto.php
|-- excluir-produto.php
|-- README.md
|
|-- dados/
|   `-- produtos.json
|
`-- styles/
    `-- styles.css
```

## Paginas e arquivos principais

### Frontend

- `index.html`: vitrine principal da mercearia
- `painel.html`: painel administrativo para cadastro e exclusao
- `script.js`: busca os produtos em `produtos.php` e monta os cards na pagina inicial
- `painel.js`: lista produtos no painel, envia cadastro e faz exclusao
- `styles/styles.css`: estilos compartilhados entre a vitrine e o painel

### Backend

- `produtos.php`: retorna o conteudo do arquivo JSON como resposta em formato JSON
- `salvar-produto.php`: recebe dados via `POST`, valida e adiciona um novo produto
- `excluir-produto.php`: recebe um `id` via `POST` e remove o produto correspondente
- `dados/produtos.json`: armazenamento local dos produtos

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- PHP
- JSON

## Como executar

Como o projeto depende de arquivos PHP para leitura e gravacao dos produtos, ele deve ser executado em um servidor local com suporte a PHP.

Exemplo com o servidor embutido do PHP:

```bash
php -S localhost:8000
```

Depois, acesse:

```text
http://localhost:8000/index.html
```

Para abrir o painel administrativo:

```text
http://localhost:8000/painel.html
```

## Fluxo da aplicacao

1. A pagina inicial faz uma requisicao para `produtos.php`.
2. O PHP le `dados/produtos.json` e devolve os produtos.
3. O JavaScript monta a interface dinamicamente no navegador.
4. No painel, o formulario envia novos produtos para `salvar-produto.php`.
5. A exclusao envia o `id` do item para `excluir-produto.php`.
6. O arquivo JSON e atualizado e a interface recarrega os dados.

## Observacoes

- O projeto usa armazenamento local em JSON, sem banco de dados relacional.
- Para funcionar corretamente, o servidor precisa ter permissao de leitura e escrita na pasta `dados/`.
- Se o projeto for aberto apenas clicando no arquivo HTML, as requisicoes para PHP nao vao funcionar.

## Autor

Desenvolvido por **Daniel Duarte Soares**.

Projeto academico - 2026
