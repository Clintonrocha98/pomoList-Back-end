# pomoList - API

O PomoList é um projeto de API construído com Node.js e Express.js, seguindo os princípios SOLID, que proporciona funcionalidades de gerenciamento de tarefas. Os usuários podem criar uma conta, fazer login e gerenciar suas tarefas. A persistência de dados é garantida através do banco de dados MongoDB e da biblioteca Prisma.

### Funcionalidades

- Login: os usuários registrados podem fazer login no sistema.

- Cadastro: os usuários podem se cadastrar para criar uma conta no sistema.

- Somente usuários autenticados podem realizar as seguintes operações:
  - Criar uma nova tarefa.
  - Obter todas as tarefas existentes.
  - Editar uma tarefa existente.
  - Deletar uma tarefa existente.

### Rotas

Endpoint: `POST /createuser`

```json
{
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "password": "senha123"
}
```

Endpoint: `POST /login`

```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

Endpoint: `POST /createtask`
Authorization: `Bearer [Token de Autenticação]`

```json
{
  "title": "Nome da Tarefa",
  "description": "Descrição da Tarefa",
  "isFinished": false,
  "userId": "1sa5d1as5d1asd6"
}
```

Endpoint: `GET /tasks/userId`
Authorization: `Bearer [Token de Autenticação]`

Endpoint: `PUT /updatetask`
Authorization: `Bearer [Token de Autenticação]`

```json
{
  "id": "userID",
  "title": "Nome da Tarefa",
  "description": "Descrição da Tarefa",
  "isFinished": false,
  "userId": "1sa5d1as5d1asd6"
}
```

Endpoint: `DELETE /deletetask`
Authorization: `Bearer [Token de Autenticação]`

```json
{
  "id": "userID",
  "taskId": "1sa5d1as5d1asd6"
}
```

### Instalação

Para configurar e executar o projeto localmente, siga estas etapas:

Clone o repositório do GitHub:

```bash
git clone git@github.com:Clintonrocha98/pomoList-Back-end.git
```

Acesse a pasta do projeto:

```bash
cd pomoList
```

Instale as dependências usando:

```bash
npm install
```
