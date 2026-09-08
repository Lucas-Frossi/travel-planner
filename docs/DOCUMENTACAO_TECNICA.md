# 📖 Documentação Técnica — Travel Planner

Este documento apresenta os detalhes técnicos do projeto **Travel Planner**, incluindo arquitetura, tecnologias utilizadas, configuração do ambiente, banco de dados, API REST, validações, estrutura do frontend e integração entre frontend e backend.

---

# 1. Sobre o projeto

O **Travel Planner** é uma aplicação web desenvolvida para auxiliar no planejamento e na organização de viagens.

A aplicação permite:

- cadastrar viagens;
- consultar viagens cadastradas;
- filtrar viagens;
- informar destino;
- informar data de ida;
- informar data de volta;
- informar orçamento;
- classificar o tipo da viagem.

O projeto é composto por uma aplicação frontend em **React**, uma API REST em **Java com Spring Boot** e um banco de dados relacional **MySQL**.

---

# 2. Arquitetura

O projeto utiliza uma arquitetura dividida em três partes principais:

```text
┌─────────────────────┐
│      Frontend       │
│       React         │
└──────────┬──────────┘
           │
           │ HTTP / JSON
           ▼
┌─────────────────────┐
│       Backend       │
│ Spring Boot / REST  │
└──────────┬──────────┘
           │
           │ JdbcTemplate / SQL
           ▼
┌─────────────────────┐
│      Banco de       │
│      dados          │
│       MySQL         │
└─────────────────────┘
```

O frontend é responsável pela interface e interação com o usuário.

O backend disponibiliza os endpoints REST, realiza as validações e executa as operações de persistência.

O MySQL é responsável pelo armazenamento permanente dos dados.

---

# 3. Estrutura do repositório

O projeto utiliza uma estrutura de monorepo:

```text
travel-planner/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── school/
│   │   │   │       └── sptech/
│   │   │   │           └── travelplanner/
│   │   │   │               ├── controllers/
│   │   │   │               ├── enums/
│   │   │   │               ├── models/
│   │   │   │               ├── repositories/
│   │   │   │               └── validations/
│   │   │   │
│   │   │   └── resources/
│   │   │       └── data.sql
│   │   │
│   │   └── test/
│   │
│   ├── docker-compose.yml
│   ├── entemplate.env
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Sidebar/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── MyTrips/
│   │   │   └── CreateTrip/
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   └── DOCUMENTACAO_TECNICA.md
│
├── README.md
└── .gitignore
```

---

# 4. Tecnologias utilizadas

## 4.1 Frontend

| Tecnologia | Utilização |
|---|---|
| React | Construção da interface |
| JavaScript | Lógica da aplicação |
| JSX | Estrutura dos componentes |
| React Router DOM | Navegação entre páginas |
| Axios | Comunicação com a API |
| CSS Modules | Estilização dos componentes |
| Vite | Execução e build do frontend |

## 4.2 Backend

| Tecnologia | Utilização |
|---|---|
| Java | Linguagem de programação |
| Spring Boot | Framework da API |
| Spring Web | Criação dos endpoints REST |
| JdbcTemplate | Acesso ao banco de dados |
| Maven | Gerenciamento e execução do projeto |

## 4.3 Banco e infraestrutura

| Tecnologia | Utilização |
|---|---|
| MySQL 8.0 | Banco de dados relacional |
| Docker | Containerização |
| Docker Compose | Configuração e execução do MySQL |
| Git | Versionamento |
| GitHub | Hospedagem do repositório |

> O projeto não utiliza JPA. A persistência é realizada utilizando `JdbcTemplate`.

---

# 5. Configuração do ambiente

## 5.1 Variáveis de ambiente

O banco de dados utiliza variáveis de ambiente para configuração.

O projeto possui o arquivo como exemplo:

```text
docs/.env.template
```

Modelo:

```env
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=travel_planner
```

As variáveis são:

| Variável | Descrição |
|---|---|
| `MYSQL_ROOT_PASSWORD` | Senha do usuário root do MySQL |
| `MYSQL_DATABASE` | Nome do banco utilizado pela aplicação |

Para execução local, deve ser criado um arquivo `.env` com os valores correspondentes.

Exemplo:

```env
MYSQL_ROOT_PASSWORD=sua_senha
MYSQL_DATABASE=travel_planner
```

O arquivo `.env` não deve ser versionado, pois pode conter informações sensíveis.

---

# 6. Banco de dados

O projeto utiliza **MySQL 8.0**.

O banco utilizado pela aplicação é:

```text
travel_planner
```

A tabela principal é:

```text
trips
```

## 6.1 Criação da tabela

```sql
CREATE DATABASE travel_planner;

USE travel_planner;

CREATE TABLE trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destination VARCHAR(255) NOT NULL,
    departure_date DATE NOT NULL,
    return_date DATE NOT NULL,
    budget DECIMAL(10,2) NOT NULL,
    trip_type VARCHAR(50) NOT NULL
);
```

---

# 7. Modelo de dados

A tabela `trips` possui os seguintes campos:

| Campo | Tipo | Restrição | Descrição |
|---|---|---|---|
| `id` | INT | PK / AUTO_INCREMENT | Identificador da viagem |
| `destination` | VARCHAR(255) | NOT NULL | Destino da viagem |
| `departure_date` | DATE | NOT NULL | Data de ida |
| `return_date` | DATE | NOT NULL | Data de volta |
| `budget` | DECIMAL(10,2) | NOT NULL | Orçamento da viagem |
| `trip_type` | VARCHAR(50) | NOT NULL | Tipo da viagem |

Não existem relacionamentos com outras tabelas na versão atual da aplicação.

---

# 8. Enum de tipo de viagem

O projeto possui o enum `TripType`, utilizado para representar a classificação da viagem.

```java
public enum TripType {
    LAZER,
    NEGOCIOS
}
```

Os valores permitidos são:

- `LAZER` — viagem de lazer;
- `NEGOCIOS` — viagem de negócios.

---

# 9. Dados iniciais

O projeto possui o arquivo:

```text
backend/src/main/resources/data.sql
```

Esse arquivo contém dados iniciais para facilitar os testes da aplicação.

Exemplo:

```sql
INSERT INTO trips (
    destination,
    departure_date,
    return_date,
    budget,
    trip_type
) VALUES (
    'Rio de Janeiro',
    '2026-12-20',
    '2026-12-25',
    2500.00,
    'LAZER'
);

INSERT INTO trips (
    destination,
    departure_date,
    return_date,
    budget,
    trip_type
) VALUES (
    'São Paulo',
    '2026-11-10',
    '2026-11-15',
    1500.00,
    'NEGOCIOS'
);

INSERT INTO trips (
    destination,
    departure_date,
    return_date,
    budget,
    trip_type
) VALUES (
    'Buenos Aires',
    '2027-01-15',
    '2027-01-20',
    3500.00,
    'LAZER'
);
```

---

# 10. Docker

O MySQL é executado utilizando Docker Compose.

Configuração utilizada:

```yaml
services:
  mysql:
    image: mysql:8.0
    container_name: travel-planner-mysql
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

## 10.1 Container

Nome:

```text
travel-planner-mysql
```

## 10.2 Porta

```text
3306
```

## 10.3 Volume

```text
mysql_data
```

O volume permite manter os dados do MySQL mesmo após a reinicialização do container.

---

# 11. Execução do projeto

## 11.1 Pré-requisitos

Para executar o projeto, é necessário possuir:

- Java JDK;
- Maven;
- Node.js;
- npm;
- Docker Desktop;
- Git.

---

## 11.2 Clonar o repositório

```bash
git clone https://github.com/Lucas-Frossi/travel-planner.git
```

Acesse o projeto:

```bash
cd travel-planner
```

---

# 12. Execução do banco de dados

Acesse o backend:

```bash
cd backend
```

Configure o arquivo `.env`:

```env
MYSQL_ROOT_PASSWORD=sua_senha
MYSQL_DATABASE=travel_planner
```

Execute o Docker Compose:

```bash
docker compose up -d
```

Verifique os containers:

```bash
docker ps
```

O container esperado é:

```text
travel-planner-mysql
```

Para parar o container:

```bash
docker compose down
```

---

# 13. Execução do backend

Dentro da pasta `backend`, execute:

```bash
./mvnw spring-boot:run
```

No Windows:

```bash
mvnw.cmd spring-boot:run
```

A API ficará disponível em:

```text
http://localhost:8080
```

---

# 14. Execução do frontend

Em outro terminal, acesse:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O Vite informará no terminal o endereço utilizado para acessar a aplicação.

---

# 15. API REST

A API disponibiliza operações para consulta, cadastro e filtragem de viagens.

Base URL:

```text
http://localhost:8080
```

Endpoints implementados:

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/trips` | Lista todas as viagens |
| POST | `/trips` | Cadastra uma viagem |
| GET | `/trips/filters` | Filtra viagens |

---

# 16. GET /trips

## Descrição

Retorna todas as viagens cadastradas no banco de dados.

## Requisição

```http
GET http://localhost:8080/trips
```

## Resposta de sucesso

Status:

```text
200 OK
```

Exemplo:

```json
[
    {
        "id": 1,
        "destination": "Rio de Janeiro",
        "departureDate": "2026-12-20",
        "returnDate": "2026-12-25",
        "budget": 2500.00,
        "tripType": "LAZER"
    }
]
```

---

# 17. POST /trips

## Descrição

Cadastra uma nova viagem.

## Requisição

```http
POST http://localhost:8080/trips
Content-Type: application/json
```

## Corpo da requisição

```json
{
    "destination": "Paris",
    "departureDate": "2027-01-10",
    "returnDate": "2027-01-20",
    "budget": 7500.00,
    "tripType": "LAZER"
}
```

## Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `destination` | String | Sim | Destino |
| `departureDate` | LocalDate | Sim | Data de ida |
| `returnDate` | LocalDate | Sim | Data de volta |
| `budget` | BigDecimal | Sim | Orçamento |
| `tripType` | TripType | Sim | Tipo da viagem |

## Resposta de sucesso

Status:

```text
201 Created
```

---

# 18. GET /trips/filters

## Descrição

Retorna viagens de acordo com os filtros informados.

Todos os parâmetros são opcionais.

## Endpoint

```http
GET http://localhost:8080/trips/filters
```

## Parâmetros

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `destination` | String | Não |
| `departureDate` | LocalDate | Não |
| `returnDate` | LocalDate | Não |
| `budget` | BigDecimal | Não |
| `tripType` | TripType | Não |

## Exemplo

```http
GET http://localhost:8080/trips/filters?destination=Paris
```

Com mais de um filtro:

```http
GET http://localhost:8080/trips/filters?destination=Paris&tripType=LAZER
```

## Resposta com resultados

Status:

```text
200 OK
```

Exemplo:

```json
[
    {
        "id": 1,
        "destination": "Paris",
        "departureDate": "2027-01-10",
        "returnDate": "2027-01-20",
        "budget": 7500.00,
        "tripType": "LAZER"
    }
]
```

## Resposta sem resultados

Status:

```text
404 Not Found
```

Corpo:

```text
Nenhuma viagem encontrada.
```

---

# 19. Status HTTP

Os endpoints utilizam códigos HTTP para representar o resultado das operações.

| Status | Descrição | Utilização |
|---|---|---|
| `200 OK` | Requisição realizada com sucesso | Consultas |
| `201 Created` | Recurso criado | Cadastro de viagem |
| `400 Bad Request` | Dados inválidos | Requisições que não atendem às validações |
| `404 Not Found` | Recurso não encontrado | Nenhuma viagem encontrada |
| `204 No Content` | Operação sem conteúdo de retorno | Quando aplicável |

---

# 20. Validação

A validação das viagens é realizada no backend.

A classe responsável pelas regras é:

```text
TripValidation
```

As informações recebidas da API são verificadas antes da persistência.

Entre as regras estão:

- destino deve ser informado;
- data de ida deve ser informada;
- data de volta deve ser informada;
- data de volta deve ser posterior à data de ida;
- orçamento deve ser válido;
- tipo da viagem deve ser informado;
- tipo da viagem deve corresponder a um valor permitido.

Requisições inválidas devem ser rejeitadas pela API e não devem ser persistidas no banco.

---

# 21. Estrutura do backend

O backend está organizado nas seguintes camadas:

```text
school.sptech.travelplanner/
│
├── controllers/
│   └── TripController.java
│
├── enums/
│   └── TripType.java
│
├── models/
│   └── Trip.java
│
├── repositories/
│   └── TripRepository.java
│
└── validations/
    └── TripValidation.java
```

## 21.1 Controller

Classe:

```text
TripController
```

Responsável por:

- receber requisições HTTP;
- disponibilizar os endpoints;
- receber parâmetros;
- chamar o repository;
- retornar os status HTTP correspondentes.

---

## 21.2 Model

Classe:

```text
Trip
```

Representa uma viagem no sistema.

Seus principais atributos são:

```text
id
destination
departureDate
returnDate
budget
tripType
```

Os tipos utilizados incluem:

- `LocalDate` para datas;
- `BigDecimal` para valores monetários;
- `TripType` para classificação da viagem.

---

## 21.3 Repository

Classe:

```text
TripRepository
```

Responsável pela comunicação com o banco utilizando `JdbcTemplate`.

Entre as operações estão:

- consulta de todas as viagens;
- cadastro de viagem;
- consulta com filtros.

As consultas são executadas utilizando SQL.

---

## 21.4 Validation

Classe:

```text
TripValidation
```

Centraliza as regras de validação das informações das viagens.

---

# 22. Estrutura do frontend

O frontend é organizado em páginas e componentes.

```text
src/
│
├── components/
│   ├── Header/
│   ├── Footer/
│   └── Sidebar/
│
├── pages/
│   ├── Home/
│   ├── MyTrips/
│   └── CreateTrip/
│
├── App.jsx
└── main.jsx
```

---

# 23. Páginas do frontend

## 23.1 Home

Rota:

```text
/
```

Responsável pela apresentação inicial do Travel Planner.

Possui:

- Header;
- seção principal;
- chamada para cadastro de viagem;
- Footer.

O botão de início direciona o usuário para:

```text
/trips/create
```

---

## 23.2 Minhas viagens

Rota:

```text
/trips
```

Responsável por consultar e exibir as viagens cadastradas.

A página realiza uma requisição:

```http
GET /trips
```

Também disponibiliza os filtros:

- destino;
- data de ida;
- data de volta;
- orçamento;
- tipo de viagem.

Ao aplicar os filtros, o frontend realiza:

```http
GET /trips/filters
```

---

## 23.3 Cadastrar viagem

Rota:

```text
/trips/create
```

Possui um formulário com cinco campos:

1. Destino;
2. Data de ida;
3. Data de volta;
4. Orçamento;
5. Tipo de viagem.

Ao enviar o formulário, o frontend realiza:

```http
POST /trips
```

Após o cadastro realizado com sucesso, o usuário é direcionado para:

```text
/trips
```

---

# 24. Componentes

## Header

Componente responsável pelo cabeçalho da aplicação.

## Footer

Componente responsável pelo rodapé da aplicação.

## Sidebar

Componente responsável pela navegação lateral das páginas internas.

A navegação possui as opções:

- Início;
- Minhas viagens;
- Cadastrar viagem;
- Sair.

---

# 25. Navegação

A navegação entre as páginas é realizada utilizando React Router.

Rotas configuradas:

```jsx
<Route path="/" element={<Home />} />
<Route path="/trips" element={<MyTrips />} />
<Route path="/trips/create" element={<CreateTrip />} />
```

---

# 26. Gerenciamento de estado

O frontend utiliza `useState` e `useEffect` para gerenciamento de estado e carregamento dos dados.

## 26.1 Estado do cadastro

Na página `CreateTrip`, os dados preenchidos no formulário são armazenados no estado:

```javascript
const [trip, setTrip] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    budget: "",
    tripType: "",
});
```

Cada alteração no formulário atualiza o estado correspondente.

---

## 26.2 Estado das viagens

Na página `MyTrips`, as viagens retornadas pela API são armazenadas em:

```javascript
const [trips, setTrips] = useState([]);
```

Os dados recebidos são utilizados diretamente na renderização da lista de viagens.

---

## 26.3 Estado dos filtros

Os filtros são controlados por:

```javascript
const [filters, setFilters] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    budget: "",
    tripType: "",
});
```

---

# 27. Comunicação com a API

O frontend utiliza Axios para realizar as requisições HTTP.

## Consulta

```text
React
  ↓
Axios
  ↓
GET /trips
  ↓
TripController
  ↓
TripRepository
  ↓
JdbcTemplate
  ↓
MySQL
```

## Cadastro

```text
React
  ↓
Axios
  ↓
POST /trips
  ↓
TripController
  ↓
TripValidation
  ↓
TripRepository
  ↓
JdbcTemplate
  ↓
MySQL
```

## Filtros

```text
React
  ↓
Axios
  ↓
GET /trips/filters
  ↓
TripController
  ↓
TripRepository
  ↓
JdbcTemplate
  ↓
MySQL
```

---

# 28. CSS Modules

A estilização do frontend utiliza CSS Modules.

Cada página ou componente possui seu próprio arquivo de estilos.

Exemplos:

```text
Home.module.css
MyTrips.module.css
CreateTrip.module.css
Sidebar.module.css
```

Essa abordagem permite manter os estilos isolados e reduz a possibilidade de conflitos entre classes.

---

# 29. Fluxo de cadastro

O fluxo completo de cadastro de uma viagem ocorre da seguinte maneira:

```text
1. Usuário acessa /trips/create
              ↓
2. Preenche os cinco campos
              ↓
3. Frontend controla os valores com useState
              ↓
4. Usuário envia o formulário
              ↓
5. Axios realiza POST /trips
              ↓
6. Backend recebe os dados
              ↓
7. TripValidation valida as informações
              ↓
8. TripRepository executa INSERT
              ↓
9. MySQL persiste a viagem
              ↓
10. API retorna 201 Created
              ↓
11. Frontend redireciona para /trips
```

---

# 30. Fluxo de consulta

```text
1. Usuário acessa /trips
              ↓
2. useEffect executa a consulta
              ↓
3. Axios realiza GET /trips
              ↓
4. Backend consulta o MySQL
              ↓
5. Repository retorna as viagens
              ↓
6. API retorna os dados
              ↓
7. React atualiza o estado
              ↓
8. Viagens são exibidas na tela
```

---

# 31. Fluxo de filtragem

```text
1. Usuário informa os filtros
              ↓
2. React atualiza o estado dos filtros
              ↓
3. Usuário seleciona "Aplicar filtros"
              ↓
4. Axios realiza GET /trips/filters
              ↓
5. Backend recebe os parâmetros
              ↓
6. Repository executa a consulta SQL
              ↓
7. API retorna os resultados
              ↓
8. React atualiza a lista
```

---

# 32. Integração e persistência

A aplicação atende ao fluxo de integração entre frontend, backend e banco de dados.

Os dados preenchidos pelo usuário não são armazenados apenas no frontend.

O processo ocorre da seguinte maneira:

```text
Usuário
   ↓
React
   ↓
API REST
   ↓
Validação
   ↓
JdbcTemplate
   ↓
MySQL
```

Após serem persistidos, os dados podem ser recuperados novamente por meio dos endpoints de consulta.

Dessa forma, as informações exibidas na página de viagens são provenientes da API e do banco de dados.

---

# 33. Exemplo completo de cadastro

## Requisição

```http
POST http://localhost:8080/trips
Content-Type: application/json
```

```json
{
    "destination": "Rio de Janeiro",
    "departureDate": "2026-12-20",
    "returnDate": "2026-12-25",
    "budget": 2500.00,
    "tripType": "LAZER"
}
```

## Resultado

```text
201 Created
```

A viagem será persistida na tabela `trips`.

---

# 34. Exemplo de consulta

## Requisição

```http
GET http://localhost:8080/trips
```

## Resposta

```json
[
    {
        "id": 1,
        "destination": "Rio de Janeiro",
        "departureDate": "2026-12-20",
        "returnDate": "2026-12-25",
        "budget": 2500.00,
        "tripType": "LAZER"
    },
    {
        "id": 2,
        "destination": "São Paulo",
        "departureDate": "2026-11-10",
        "returnDate": "2026-11-15",
        "budget": 1500.00,
        "tripType": "NEGOCIOS"
    }
]
```

---

# 35. Exemplo de filtragem

## Requisição

```http
GET http://localhost:8080/trips/filters?tripType=LAZER
```

## Resposta

```json
[
    {
        "id": 1,
        "destination": "Rio de Janeiro",
        "departureDate": "2026-12-20",
        "returnDate": "2026-12-25",
        "budget": 2500.00,
        "tripType": "LAZER"
    }
]
```

---

# 36. Limitações da versão atual

A versão atual do Travel Planner está focada no gerenciamento básico de viagens.

Funcionalidades implementadas:

- cadastro de viagens;
- consulta de viagens;
- filtragem de viagens;
- persistência no MySQL;
- validação no backend;
- integração React + API REST.

Funcionalidades que não fazem parte da versão atual:

- cadastro de usuários;
- login;
- autenticação;
- edição de viagens;
- exclusão de viagens;
- pagamentos;
- integração com serviços externos de turismo.

Essas funcionalidades podem ser consideradas em versões futuras.

---

# 37. Segurança e configuração

As credenciais do banco de dados são configuradas por variáveis de ambiente.

O arquivo com as credenciais reais deve permanecer fora do controle de versão.

O projeto disponibiliza um arquivo de modelo para orientar a configuração:

```text
entemplate.env
```

O `.gitignore` deve impedir o versionamento do arquivo:

```text
.env
```

---

# 38. Documentação complementar

O projeto possui o seguinte arquivo de documentação:

```text
docs/DOCUMENTACAO_TECNICA.md
```

O `README.md` apresenta uma visão geral do projeto e as instruções básicas de execução.

Este documento apresenta os detalhes técnicos necessários para compreender a arquitetura e a integração da aplicação.

---

# 39. Resumo técnico

| Item | Implementação |
|---|---|
| Frontend | React |
| Backend | Java + Spring Boot |
| Persistência | JdbcTemplate |
| Banco | MySQL 8.0 |
| Infraestrutura | Docker Compose |
| Comunicação | REST / JSON |
| HTTP Client | Axios |
| Rotas frontend | React Router |
| Estilização | CSS Modules |
| Recurso principal | Viagens |
| Campos do recurso | 5 |
| GET | `/trips` |
| POST | `/trips` |
| Filtros | `/trips/filters` |
| Validação | Backend |
| Script SQL | `data.sql` |

---

# 40. Considerações finais

O Travel Planner possui uma arquitetura integrada entre frontend, backend e banco de dados.

A aplicação permite que o usuário cadastre e consulte viagens por meio de uma interface desenvolvida em React. As requisições são encaminhadas para uma API REST desenvolvida em Java com Spring Boot, responsável pelas validações e operações de persistência.

A utilização do `JdbcTemplate` permite realizar as operações SQL diretamente no MySQL, enquanto o Docker Compose facilita a configuração do banco no ambiente de desenvolvimento.

A versão atual concentra-se nas funcionalidades de cadastro, consulta e filtragem de viagens, servindo como base para futuras evoluções do sistema.
