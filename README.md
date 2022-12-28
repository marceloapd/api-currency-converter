# Conversor de moedas

![GitHub repo size](https://img.shields.io/github/repo-size/marceloapd/api-currency-converter?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/marceloapd/api-currency-converter?style=for-the-badge)

<img src="https://user-images.githubusercontent.com/71731452/209488064-5292c5f3-d7e9-4116-8996-af2c192e255c.gif" style="width:500px" alt="Jaya">

Desenvolvimento de uma API em Node.js que seja capaz de realizar a conversão entre duas moedas utilizando taxas de conversões atualizadas de um serviço externo (https://apilayer.com/marketplace/exchangerates_data-api).

## 🧑‍💼 Regra de negocio

#### Conversão de moeda
O sistema deve ser capaz de realizar no mínimo  a conversão entre 4 moedas(BRL, USD, EUR, JPY);

Uma transação com sucesso deve retornar: id da transação, id do usuario, moeda origem, valor origem, moeda destino, valor destino, taxa de conversão utilizada e data/hora UTC;
#### Persistência do banco de dados

As transações de conversão devem ser persistidas no banco de dados (embedded) contendo: id do usuario, moeda de origem, valor de origem, moeda destino, taxa de conversão utilizada e data/hora UTC;

#### Listagem de transações

Deverá existir um endpoint para listagem de todas as transações realizadas por usuário;

#### Sistema de logs

O sistema deve ser capaz de ter logs em tempo real para facilitar a análise do time técnico. Para esse intuito utilizar o ElasticSearch acompanhado do Kibana (https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-node.html)

#### Metricas

O sistema deve ser capaz de Monitorar recursos relacionados a API como por exemplo: CPU, Requests, Exceptions e Memória. Para esse intuito utilizar Prometheus integrado com o Grafana.

#### Cache

A rota de listagem de transações devera armazenar os resultados em cache que deve ser invalidado a cada nova transação. Para esse intuito utilizar Redis (https://redis.io/)

#### CI/CD

Utilizar o CI/CD do github action com o ESLint para analise codigo e Jest para testes.

## 👷 Arquitetura
<img src="https://user-images.githubusercontent.com/71731452/209521509-a1e1a790-3b75-45b4-860f-ee26f87cbea5.png" style="width:500px" alt="diagram">

A inicialização da api parte do arquivo `server.js`

`environments.js` possui as variáveis ​​de ambiente de configuração necessárias para executar o projeto, os valores padrão contidos neste arquivo são inválidos.

## 🚀 Instalando
> Você só precisa executar os contêineres com o docker compose

    docker compose up --build

## 🏃 Executando o aplicativo
> Por padrão a aplicação será disponibilizada na porta 5000

    npm start

## 🧪 Executando os testes
> Todos os testes unitarios/integração possuem coverage

    npm test

## 📨 Utilizando a API
> Se preferir é possivel utilizar o postman

Collection link: https://www.getpostman.com/collections/7fcf093536f18a03685d
### 📠 Visualização dos logs do ELK
> Nesse end-point é possivel acompanhar os logs de erro em tempo real.

http://localhost:5601/app/discover/

## 📜 Documentação da API
### Obter lista de transações

#### Request

`GET /currency/list-transactions/`

    curl -i -H 'Accept: application/json' http://localhost:5000/currency/list-transactions/

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 219

    [
        {"transaction_id": "63a8fb9a5da52e3e2e869e29","user_id": 500,"origin_currency": "BRL","origin_value": 10,"destination_currency": "USD","destination_value": 1.9354,"conversion_rate": 0.19354,"date": "2022-12-26T00:00:00.000Z"},{...}, {...}, {...}, {...}, {...}]

### Obtenha uma transação específica

#### Request

`GET /currency/list-transactions?user_id=500`

    curl -i -H 'Accept: application/json' http://localhost:5000/currency/list-transactions?user_id=500


#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 219

    [{"transaction_id": "63a8fb9a5da52e3e2e869e29","user_id": 500,"origin_currency": "BRL","origin_value": 10,"destination_currency": "USD","destination_value": 1.9354,"conversion_rate": 0.19354,"date": "2022-12-26T00:00:00.000Z"}]

### Obtendo uma transação inexistente

#### Request

`GET /currency/list-transactions?user_id=9999`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/9999

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: text/html; charset=utf-8
    Content-Length: 33

    no transactions for user_id: 9999

### Fazendo uma nova transação

#### Request

`GET http://localhost:5000/currency/converter?from=BRL&to=USD&amount=10&user_id=500`

    curl -i -H 'Accept: application/json' "http://localhost:5000/currency/converter?from=BRL&to=USD&amount=10&user_id=500"

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 219

    {"transaction_id":"63a8ff6f5da52e3e2e869e3f","user_id":500,"origin_currency":"BRL","origin_value":10,"destination_currency":"USD","destination_value":1.93539,"conversion_rate":0.193539,"date":"2022-12-26T00:00:00.000Z"}