# Sistema Distribuído com Docker

Este repositório contém um sistema distribuído configurado para rodar com Docker e Docker Compose. Há dois arquivos principais de configuração do Docker Compose:

- `docker-compose.dev.yml`: Usado para ambiente de desenvolvimento com portas expostas diretamente.
- `docker-compose.yml`: Usado para ambiente de produção onde todos os serviços ficam isolados e são acessíveis apenas através do proxy reverso Nginx.

## Estrutura dos Arquivos

### `docker-compose.dev.yml`

Este arquivo é usado para configurar o ambiente de desenvolvimento. Nele, todas as portas dos serviços são expostas diretamente, permitindo fácil acesso e depuração.

#### Serviços

- **auth-db**: Banco de dados para autenticação.
- **auth-api**: API de autenticação.
- **bl-db**: Banco de dados para lógica de negócios.
- **bl-api**: API de lógica de negócios.
- **importer**: Serviço de importação de dados.
- **frontend**: Aplicação frontend em React.

#### Exemplo de uso

```sh
docker-compose -f docker-compose.dev.yml up --build
```

### `docker-compose.yml`

Este arquivo é usado para configurar o ambiente de produção. Nele, os serviços não têm suas portas diretamente expostas, sendo acessíveis apenas através do Nginx, que faz o roteamento das requisições.

#### Serviços

- **auth-db**: Banco de dados para autenticação.
- **auth-api**: API de autenticação.
- **bl-db**: Banco de dados para lógica de negócios.
- **bl-api**: API de lógica de negócios.
- **importer**: Serviço de importação de dados.
- **frontend**: Aplicação frontend em React.
- **nginx**: Servidor Nginx para roteamento de requisições.

#### Exemplo de uso

```sh
docker-compose -f docker-compose.yml up --build
```

### Variáveis de Ambiente

O arquivo `.env` contém todas as variáveis de ambiente necessárias para configurar os serviços. Um exemplo de arquivo `.env` é fornecido como `.env.example`.

#### Exemplo de `.env`

```env
USE_DEV_MODE=true           #if true, it will allow auto-reload when changes are done to the src files

AUTH_DB_PORT=15432          #port for the auth DB (not used in production)
BL_DB_PORT=25432            #port for the business logic DB (not used in production)
AUTH_API_PORT=18080         #port for the authentication api (not used in production)

ACCESS_TOKEN_SECRET=        #secret used for generating and validating JWT
FRONTEND_PORT=80            #port for the react frontend
SWAGGER_PORT=8081           #port for the swagger
BL_API_PORT=8080            #port for the business logic api
```

## Gerando o Secret com OpenSSL

Para gerar um secret seguro que será usado para a geração e validação de JSON Web Tokens (JWT), você pode utilizar o OpenSSL. Siga os passos abaixo:

1. Abra o terminal.

2. Execute o comando abaixo para gerar um secret aleatório de 32 bytes codificado em hexadecimal:

   ```sh
   openssl rand -hex 32
   ```

3. O comando acima retornará um valor hexadecimal. Copie esse valor e insira no arquivo `.env` na variável `ACCESS_TOKEN_SECRET`.

### Exemplo de comando e saída:

```sh
$ openssl rand -hex 32
e40a46e64d4ac98e74bc620a68ca9c04ae515182e4ad0f6da1ed97ba5585c2e7
```

No arquivo `.env`, ficará assim:

```env
ACCESS_TOKEN_SECRET=e40a46e64d4ac98e74bc620a68ca9c04ae515182e4ad0f6da1ed97ba5585c2e7
```

Essa chave será usada pelas APIs para a geração e validação de tokens JWT, garantindo a segurança das operações de autenticação.

## Configuração do Nginx

Para o ambiente de produção, o Nginx é configurado usando um template que substitui as variáveis de ambiente pelas portas configuradas. Não é necessário nenhuma ação além de configurar o arquivo `.env`.

## Executando o Sistema

### Ambiente de Desenvolvimento

Para rodar o sistema em ambiente de desenvolvimento, use o comando:

```sh
docker-compose -f docker-compose.dev.yml up --build
```

### Ambiente de Produção

Para rodar o sistema em ambiente de produção, use o comando:

```sh
docker-compose -f docker-compose.yml up --build
```

### Arquivo de Collections do Postman

Para facilitar o teste e a interação com as APIs deste sistema distribuído, um arquivo de collection do Postman está incluído no repositório. Este arquivo contém uma coleção de requisições predefinidas que você pode importar diretamente no Postman para testar os endpoints da API.

#### Localização do Arquivo

O arquivo de collections do Postman está localizado em:

```
./sistemas_distribuidos.postman_collection.json
```

#### Como Importar a Collection no Postman

1. **Abra o Postman**: Inicie o Postman no seu sistema.
2. **Importar Collection**: Clique no botão `Import` no canto superior esquerdo da interface do Postman.
3. **Selecionar Arquivo**: Na janela de importação, selecione a opção `Upload Files` e navegue até o arquivo `sistemas_distribuidos.postman_collection.json` no diretório raiz do projeto. Selecione o arquivo e clique em `Open`.
4. **Importar**: Clique no botão `Import` na janela de importação. A coleção será adicionada ao seu workspace do Postman.


## Observações

- Certifique-se de copiar o arquivo `.env.example` para `.env` e ajustar as variáveis conforme necessário antes de iniciar os contêineres.
- No ambiente de produção, o acesso aos serviços é feito exclusivamente através do Nginx nas portas configuradas no arquivo `.env`.

