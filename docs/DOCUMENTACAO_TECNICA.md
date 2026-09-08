# 📖 Documentação Técnica — Travel Planner

Este documento complementa o `README.md` com detalhes técnicos do projeto: arquitetura, tecnologias utilizadas, modelo de dados, configuração dos ambientes e referência da API REST responsável pelo gerenciamento de viagens.

---

## 1. Arquitetura do projeto

O repositório é organizado como um monorepo com dois módulos principais:

```text
travel-planner/
├── backend/          # API REST — Spring Boot
├── frontend/         # Aplicação React
└── README.md         # Documentação geral do projeto
```

### Backend

A aplicação Spring Boot é organizada em camadas:

```text
backend/
└── src/
    └── main/
        ├── java/
        │   └── school/sptech/travelplanner/
        │       ├── controllers/
        │       ├── enums/
        │       ├── models/
        │       ├── repositories/
        │       └── validations/
        │
        └── resources/
            └── data.sql
```

* **`controllers/`** — responsáveis por receber as requisições HTTP e disponibilizar os endpoints da API.
* **`models/`** — contém as classes que representam os dados da aplicação.
* **`repositories/`** — responsáveis pelo acesso e manipulação dos dados utilizando JDBC.
* **`validations/`** — contém as regras de validação dos dados recebidos pela API.
* **`enums/`** — contém os tipos enumerados utilizados pelo sistema.
* **`data.sql`** — utilizado para inserção dos dados iniciais do banco.

### Frontend

O frontend é desenvolvido em React e organizado por páginas e componentes:

```text
frontend/
└── src/
    ├── components/
    │   ├── Footer/
    │   ├── Header/
    │   └── Sidebar/
    │
    ├── pages/
    │   ├── Home/
    │   ├── MyTrips/
    │   └── CreateTrip/
    │
    ├── services/
    │   └── api.js
    │
    ├── App.jsx
    └── main.jsx
```

* **`components/`** — componentes reutilizáveis da interface.
* **`pages/`** — páginas principais da aplicação.
* **`services/`** — configuração e comunicação com a API.
* **`App.jsx`** — responsável pelo gerenciamento das rotas da aplicação.

---

## 2. Tecnologias

| Camada           | Tecnologias              |
| ---------------- | ------------------------ |
| Back-end         | Java, Spring Boot, Maven |
| Persistência     | JDBC / JdbcTemplate      |
| Banco de dados   | H2                       |
| Front-end        | React, JavaScript, Vite  |
| Requisições HTTP | Axios                    |
| Roteamento       | React Router DOM         |
| Estilização      | HTML, CSS e CSS Modules  |
| Versionamento    | Git / GitHub             |

---

## 3. Executando localmente

### Back-end

Entre na pasta do backend:

```bash
cd backend/travel-planner
```

Execute a aplicação Spring Boot utilizando o Maven:

```bash
./mvnw spring-boot:run
```

No Windows, pode ser utilizado:

```bash
mvnw.cmd spring-boot:run
```

A API será disponibilizada, por padrão, em:

```text
http://localhost:8080
```

### Front-end

Entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm run dev
```

A aplicação será disponibilizada pelo Vite na porta configurada pelo projeto.

---

## 4. Modelo de dados

### `trips`

A tabela `trips` armazena as informações relacionadas às viagens cadastradas.

| Campo            | Tipo          | Regras                          |
| ---------------- | ------------- | ------------------------------- |
| `id`             | INT           | Chave primária, auto-incremento |
| `destination`    | VARCHAR(255)  | Obrigatório                     |
| `departure_date` | DATE          | Obrigatório                     |
| `return_date`    | DATE          | Obrigatório                     |
| `budget`         | DECIMAL(10,2) | Obrigatório                     |
| `trip_type`      | VARCHAR(50)   | Obrigatório                     |

### Exemplo de registro

```json
{
    "id": 1,
    "destination": "Rio de Janeiro",
    "departureDate": "2026-12-20",
    "returnDate": "2026-12-25",
    "budget": 2500.00,
    "tripType": "LAZER"
}
```

---

## 5. Enum `TripType`

O tipo da viagem é representado pelo enum `TripType`.

Valores disponíveis:

| Valor      | Descrição          |
| ---------- | ------------------ |
| `LAZER`    | Viagem de lazer    |
| `NEGOCIOS` | Viagem de negócios |

Exemplo:

```java
public enum TripType {
    LAZER,
    NEGOCIOS
}
```

---

## 6. Sobre os métodos HTTP utilizados

A API segue o padrão REST, utilizando métodos HTTP de acordo com a operação realizada.

| Método     | Uso na API           | Corpo da requisição |
| ---------- | -------------------- | ------------------- |
| **GET**    | Consultar viagens    | Não                 |
| **POST**   | Cadastrar uma viagem | Sim                 |
| **PUT**    | Atualizar uma viagem | Sim                 |
| **DELETE** | Remover uma viagem   | Não                 |

A implementação atual possui como foco principal o cadastro, consulta e filtragem das viagens.

---

## 7. Endpoints da API

**Base URL:**

```text
http://localhost:8080/trips
```

### ✈️ Viagens — `/trips`

| Método | Rota             | Descrição                           | Corpo da requisição |
| ------ | ---------------- | ----------------------------------- | ------------------- |
| `GET`  | `/trips`         | Lista todas as viagens              | —                   |
| `POST` | `/trips`         | Cadastra uma nova viagem            | `Trip`              |
| `GET`  | `/trips/filters` | Consulta viagens utilizando filtros | —                   |

---

### `GET /trips`

Retorna todas as viagens cadastradas.

**Exemplo de resposta:**

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

### `POST /trips`

Cadastra uma nova viagem.

**Exemplo de requisição:**

```json
{
    "destination": "Rio de Janeiro",
    "departureDate": "2026-12-20",
    "returnDate": "2026-12-25",
    "budget": 2500.00,
    "tripType": "LAZER"
}
```

**Exemplo de resposta:**

```json
{
    "id": 1,
    "destination": "Rio de Janeiro",
    "departureDate": "2026-12-20",
    "returnDate": "2026-12-25",
    "budget": 2500.00,
    "tripType": "LAZER"
}
```

---

### `GET /trips/filters`

Permite consultar viagens utilizando diferentes critérios.

Parâmetros disponíveis:

| Parâmetro       | Tipo       | Descrição                  |
| --------------- | ---------- | -------------------------- |
| `destination`   | String     | Filtra pelo destino        |
| `departureDate` | LocalDate  | Filtra pela data de ida    |
| `returnDate`    | LocalDate  | Filtra pela data de volta  |
| `budget`        | BigDecimal | Filtra pelo orçamento      |
| `tripType`      | TripType   | Filtra pelo tipo da viagem |

**Exemplo:**

```text
GET /trips/filters?destination=Rio de Janeiro&tripType=LAZER
```

Outro exemplo:

```text
GET /trips/filters?departureDate=2026-12-20&budget=2500
```

Os parâmetros são opcionais, permitindo realizar a busca utilizando apenas os critérios necessários.

---

## 8. Validação das viagens

A classe `TripValidation` concentra as regras de validação relacionadas aos dados das viagens.

Entre os dados avaliados estão:

* Destino;
* Data de ida;
* Data de volta;
* Orçamento;
* Tipo da viagem.

As validações são executadas antes da persistência dos dados, evitando que informações inválidas sejam armazenadas.

---

## 9. Front-end — rotas e páginas

| Rota            | Componente   | Descrição                             |
| --------------- | ------------ | ------------------------------------- |
| `/`             | `Home`       | Página inicial                        |
| `/trips`        | `MyTrips`    | Lista e filtra as viagens cadastradas |
| `/trips/create` | `CreateTrip` | Cadastro de uma nova viagem           |

### `Home`

Página inicial da aplicação, contendo a apresentação do Travel Planner e acesso à funcionalidade de cadastro de viagens.

### `MyTrips`

Página responsável pela visualização das viagens cadastradas.

A página possui:

* Listagem das viagens;
* Filtro por destino;
* Filtro por data de ida;
* Filtro por data de volta;
* Filtro por orçamento;
* Filtro por tipo de viagem;
* Limpeza dos filtros.

### `CreateTrip`

Página responsável pelo cadastro de uma nova viagem.

O formulário permite informar:

* Destino;
* Data de ida;
* Data de volta;
* Orçamento;
* Tipo de viagem.

Após o cadastro realizado com sucesso, o usuário é direcionado para a página de viagens cadastradas.

---

## 10. Comunicação entre Front-end e Back-end

O frontend utiliza o **Axios** para realizar as requisições HTTP para a API REST.

### Consulta de viagens

```javascript
axios
    .get("http://localhost:8080/trips")
    .then((response) => {
        setTrips(response.data);
    })
    .catch((error) => {
        console.error("Erro ao buscar viagens:", error);
    });
```

### Cadastro de viagem

```javascript
axios
    .post("http://localhost:8080/trips", trip)
    .then(() => {
        navigate("/trips");
    })
    .catch((error) => {
        console.error("Erro ao cadastrar viagem:", error);
    });
```

### Aplicação de filtros

```javascript
axios
    .get("http://localhost:8080/trips/filters", {
        params: filters,
    })
    .then((response) => {
        setTrips(response.data);
    })
    .catch((error) => {
        console.error("Erro ao filtrar viagens:", error);
    });
```

---

## 11. Códigos de status HTTP

A API utiliza códigos HTTP para indicar o resultado das operações.

| Status                      | Quando ocorre                                       |
| --------------------------- | --------------------------------------------------- |
| `200 OK`                    | Consulta realizada com sucesso                      |
| `201 Created`               | Cadastro realizado com sucesso                      |
| `400 Bad Request`           | Dados enviados são inválidos                        |
| `404 Not Found`             | Nenhuma viagem encontrada ou recurso não localizado |
| `500 Internal Server Error` | Erro inesperado no servidor                         |

---

## 12. Dados iniciais

O arquivo `data.sql` é utilizado para inserir registros iniciais de viagens no banco de dados.

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
```

Esses registros permitem testar a listagem e os filtros da aplicação durante o desenvolvimento.

---

## 13. Estrutura de integração

O fluxo principal da aplicação ocorre da seguinte forma:

```text
Usuário
   │
   ▼
React
   │
   │ Axios / HTTP
   ▼
TripController
   │
   ▼
TripValidation
   │
   ▼
TripRepository
   │
   ▼
Banco de dados H2
```

No cadastro de uma viagem, o frontend envia os dados através de uma requisição `POST`. O controller recebe os dados, realiza as validações necessárias e encaminha a operação para o repository.

Na consulta, o frontend realiza uma requisição `GET`, e o backend busca os registros armazenados e retorna os dados para serem exibidos na interface.

---

## 14. Limitações conhecidas / pontos de atenção

* A autenticação de usuários não faz parte da versão atual da aplicação.
* O gerenciamento de viagens atualmente não depende de `userId`.
* A API ainda está em desenvolvimento e novas operações poderão ser adicionadas.
* O sistema utiliza H2 para o ambiente atual de desenvolvimento.
* O tratamento de erros pode ser aprimorado futuramente com respostas padronizadas.
* Funcionalidades de edição, exclusão e visualização detalhada de viagens podem ser implementadas nas próximas versões.

---

## 15. Considerações finais

O Travel Planner possui uma arquitetura separando a camada de apresentação da camada de serviços da aplicação.

O frontend em React é responsável pela interação com o usuário e pela apresentação das viagens, enquanto o backend em Spring Boot disponibiliza a API REST e concentra as regras de validação e persistência.

Essa estrutura permite que novas funcionalidades sejam adicionadas ao sistema de maneira organizada, mantendo a separação de responsabilidades entre frontend, backend e banco de dados.
