# pomoList
O pomoList é um projeto de API construído com Node.js e Express.js que oferece funcionalidades de gerenciamento de tarefas, permitindo que os usuários criem uma conta, façam login e gerenciem suas tarefas de forma eficiente. O projeto utiliza o banco de dados MongoDB e a biblioteca Prisma para persistência de dados.

### Funcionalidades

- Login
  - Os usuários registrados podem fazer login no sistema.

- Cadastro
  - Os usuários podem se cadastrar para criar uma conta no sistema.

### Gerenciamento de Tarefas

- Somente usuários autenticados podem realizar as seguintes operações:
  - Criar uma nova tarefa.
  - Obter todas as tarefas existentes.
  - Editar uma tarefa existente.
  - Deletar uma tarefa existente.

### Banco de Dados
O projeto utiliza o MongoDB como banco de dados para armazenar informações de usuários e tarefas. Além disso, o Prisma é utilizado como ORM (Object-Relational Mapping) para facilitar a interação com o banco de dados.

### Instalação
Para configurar e executar o projeto localmente, siga estas etapas:

1. Clone o repositório do GitHub:

```bash
git clone git@github.com:Clintonrocha98/pomoList-Back-end.git
```

2. Acesse a pasta do projeto:

```bash
cd pomoList
```

3. Instale as dependências usando o Yarn ou Npm:

```bash
yarn install OR npm install
```

### Rotas da API
A API do **pomoList** oferece as seguintes rotas:

### Cadastro de Usuário
- Rota: POST /createUser
- Controlador: CreateUserController
-  Descrição: Permite aos usuários criar uma nova conta no sistema.

### Login
- Rota: POST /login
- Controlador: SessionController
- Descrição: Permite aos usuários registrados fazer login no sistema.

### Criar tarefa
- Rota: POST /createTask
- Controlador: CreateTaskController
- Middleware: ensuredAuthenticated
- Descrição: Permite aos usuários autenticados criar uma nova tarefa.

### Obter Todas as tarefas
- Rota: GET /tasks
- Controlador: GetAllTasksController
- Middleware: ensuredAuthenticated
- Descrição: Permite aos usuários autenticados obter todas as tarefas existentes.

### Editar Tarefa
- Rota: PUT /updateTask
- Controlador: UpdateTaskController
- Middleware: ensuredAuthenticated
- Descrição: Permite aos usuários autenticados editar uma tarefa existente.

### Deletar Tarefa
- Rota: DELETE /deleteTask
- Controlador: DeleteTaskController
- Middleware: ensuredAuthenticated
- Descrição: Permite aos usuários autenticados deletar uma tarefa existente.
