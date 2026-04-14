# Mercearia São José

Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento Web, evoluído da primeira entrega em HTML + CSS para a segunda etapa com JavaScript + PHP, tornando a aplicação dinâmica.

## Sobre o projeto

O sistema simula uma pequena mercearia de bairro com:

- página principal para exibição dos produtos
- painel administrativo
- cadastro dinâmico de produtos
- exclusão de produtos
- consumo de dados com JavaScript
- backend em PHP usando JSON como base de dados local

## Evolução do projeto

### Primeira entrega

- HTML5
- CSS3
- layout estático
- informações fixas

### Segunda entrega

- JavaScript
- PHP
- consumo dinâmico de dados
- produtos carregados automaticamente
- painel com cadastro e exclusão

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
|   |-- produtos.json
|
`-- styles/
    `-- styles.css
```

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- PHP
- JSON

## Funcionalidades

- listagem dinâmica de produtos
- cadastro de novos produtos
- exclusão de produtos
- atualização automática da interface
- painel administrativo separado

## Como executar

Como o projeto usa PHP para leitura e gravação dos produtos, ele deve ser executado em um servidor local com suporte a PHP.

Exemplo com o servidor embutido do PHP:

```bash
php -S localhost:8000
```

Depois, abra no navegador:

```text
http://localhost:8000/index.html
```

## Autor

Desenvolvido por **Daniel Duarte Soares**.

Projeto acadêmico - 2026
