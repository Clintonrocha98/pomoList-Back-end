import { Router } from "express";
import { createUserFactory } from "../modules/User/UserFactory";
import { TaskFactory } from "../modules/Task/TaskFactory";
import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import { Login } from "../modules/Login/LoginFactory";

const routes = Router();

routes.post("/createuser", (req, res) => createUserFactory().create(req, res));

routes.post("/login", (req, res) => Login().handle(req, res));

routes.post("/createtask", ensuredAuthenticated(), (req, res) =>
  TaskFactory().create(req, res)
);
routes.get("/tasks/:userId", ensuredAuthenticated(), (req, res) =>
  TaskFactory().getAllTasks(req, res)
);
routes.put("/updatetask", ensuredAuthenticated(), (req, res) =>
  TaskFactory().update(req, res)
);
routes.delete("/deletetask", ensuredAuthenticated(), (req, res) =>
  TaskFactory().delete(req, res)
);

export { routes };
