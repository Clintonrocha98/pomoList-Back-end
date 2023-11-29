# pomoList
O pomoList é um projeto de API construído com Node.js e Express.js que oferece funcionalidades de gerenciamento de tarefas, permitindo que os usuários criem uma conta, façam login e gerenciem suas tarefas de forma eficiente. O projeto utiliza o banco de dados MongoDB e a biblioteca Prisma para persistência de dados.

### Funcionalidades

- Login: os usuários registrados podem fazer login no sistema.

- Cadastro: os usuários podem se cadastrar para criar uma conta no sistema.

- Somente usuários autenticados podem realizar as seguintes operações:
  - Criar uma nova tarefa.
  - Obter todas as tarefas existentes.
  - Editar uma tarefa existente.
  - Deletar uma tarefa existente.


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

3. Instale as dependências usando:

```bash
npm install
```

### Rotas
- ``/createuser``
- ``/login``
- ``/createtask``
- ``/tasks/:userId``
- ``/updatetask``
- ``/deletetask``
