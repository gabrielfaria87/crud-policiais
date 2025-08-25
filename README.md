# CRUD de Policiais

## Objetivo do Projeto

Este projeto tem como objetivo criar um sistema completo de cadastro, listagem e filtragem de policiais militares, utilizando um backend Node.js com MySQL e um frontend Angular moderno. O sistema permite cadastrar policiais, listar todos os registros, filtrar por CPF ou RG, e exportar os dados para um arquivo JSON.

## Tecnologias Utilizadas

- **Backend:** Node.js, Express, MySQL
- **Frontend:** Angular (Standalone Components)
- **Banco de Dados:** MySQL
- **Comunicação:** API RESTful

## Estrutura do Projeto

```
crud-policiais/
├── backend/
│   ├── bd.js                # Conexão com MySQL
│   ├── server.js            # Inicialização do servidor Express
│   ├── controller/
│   │   └── policiaisController.js # Lógica de CRUD e exportação JSON
│   ├── routes/
│   │   └── policiaisRoutes.js    # Rotas da API
│   ├── policiais.json       # Exportação dos dados em JSON
│   └── .env                 # Variáveis de ambiente do banco
├── frontend/
│   ├── src/app/
│   │   ├── components/
│   │   │   ├── cadastrar-policial/ # Formulário de cadastro
│   │   │   └── listar-policiais/   # Listagem e filtro
│   │   ├── services/        # Consumo da API
│   │   ├── models/          # Interface Policial
│   │   ├── app.component.*  # Layout principal
│   │   ├── app.routes.ts    # Rotas do Angular
│   │   └── main.ts          # Bootstrap do Angular
│   └── ...
├── package.json             # Dependências do projeto
└── README.md                # Este arquivo
```

## Instruções de Instalação e Execução

### 1. Instalação do Backend

1. Acesse a pasta `backend`:
   ```sh
   cd backend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure o arquivo `.env` com os dados do seu MySQL:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=123456
   DB_NAME=crudPoliciais
   PORT=3000
   ```
4. Crie o banco de dados e a tabela:
   ```sql
   CREATE DATABASE crudPoliciais;
   USE crudPoliciais;
   CREATE TABLE policiais (
     id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
     rg_civil VARCHAR(20) NOT NULL,
     rg_militar VARCHAR(20) NOT NULL,
     cpf VARCHAR(14) NOT NULL,
     data_nascimento DATE NOT NULL,
     matricula VARCHAR(50) NOT NULL
   );
   ```
5. Inicie o servidor:
   ```sh
   node server.js
   ```

### 2. Instalação do Frontend

1. Acesse a pasta `frontend`:
   ```sh
   cd frontend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o servidor Angular:
   ```sh
   ng serve
   ```
4. Acesse o sistema pelo navegador em `http://localhost:4200`

## Funcionalidades

- Cadastro de policial com validação de campos
- Listagem de todos os policiais
- Filtro por CPF ou RG
- Exportação automática para JSON
- Navegação entre páginas de cadastro e listagem

## Prints das Telas

### Tela de Listagem

![Listar Policiais](./prints/listar-policiais.png)

### Tela de Cadastro

![Cadastrar Policial](./prints/cadastrar-policial.png)

## Observações

- Certifique-se que o backend está rodando antes de iniciar o frontend.
- O arquivo `policiais.json` é atualizado automaticamente após cada cadastro.
- Use dados únicos para RG, CPF e matrícula ao cadastrar.

---

Projeto desenvolvido para fins didáticos e de avaliação.
