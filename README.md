# ✈️ Travel Planner

Sistema web desenvolvido para facilitar o planejamento e a organização de viagens.

O Travel Planner permite cadastrar viagens, consultar as viagens cadastradas e realizar filtros de acordo com as informações da viagem.

---

## 📋 Sobre o projeto

O Travel Planner foi desenvolvido com o objetivo de criar uma aplicação integrada entre **frontend e backend**, permitindo o gerenciamento de informações de viagens por meio de uma API REST.

A aplicação é composta por:

- **Frontend:** React
- **Backend:** Java + Spring Boot
- **Banco de dados:** MySQL
- **Persistência:** JdbcTemplate
- **Banco em ambiente de desenvolvimento:** Docker

---

## 🚀 Funcionalidades

### 🧳 Viagens

- Cadastrar uma nova viagem
- Listar viagens cadastradas
- Filtrar viagens
- Informar destino
- Informar data de ida
- Informar data de volta
- Informar orçamento
- Classificar o tipo da viagem

### 🔎 Filtros

É possível consultar as viagens utilizando os seguintes filtros:

- Destino
- Data de ida
- Data de volta
- Orçamento
- Tipo de viagem

---

## 🛠️ Tecnologias utilizadas

### Frontend

- React
- JavaScript
- JSX
- React Router
- Axios
- CSS Modules
- Vite

### Backend

- Java
- Spring Boot
- JdbcTemplate
- Maven

### Banco de dados

- MySQL 8.0
- Docker
- Docker Compose

### Versionamento

- Git
- GitHub

---

## 📁 Estrutura do projeto

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
│   │   │   ├── Footer/
│   │   │   ├── Header/
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
└── README.md
