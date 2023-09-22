import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { SessionController } from "./controllers/SessionController";
import { CreateTaskControoler } from "./controllers/CreateTaskController";
import { GetAllTasksController } from "./controllers/GetAllTasksController";
import { UpdateTaskControler } from "./controllers/UpdateTaskController";
import { DeleteTaskController } from "./controllers/DeleteTaskController";
import { ensuredAuthenticated } from "./middleware/ensuredAuthenticated";

const routes = Router();

routes.post("/createUser", new CreateUserController().handle);
routes.post("/login", new SessionController().handle);

routes.post(
  "/createTask",
  ensuredAuthenticated(),
  new CreateTaskControoler().handle
);

routes.get(
  "/tasks",
  ensuredAuthenticated(),
  new GetAllTasksController().handle
);

routes.put(
  "/updateTask",
  ensuredAuthenticated(),
  new UpdateTaskControler().handle
);

routes.delete(
  "/deleteTask",
  ensuredAuthenticated(),
  new DeleteTaskController().handle
);

export { routes };
