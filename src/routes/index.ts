import { Router } from "express";
import PostsRouter from "./posts";
import * as swaggerUi from 'swagger-ui-express'
import specs from '../swagger'
import AuthRouter from "./auth";
import UserRouter from "./user";
import UserSettingRouter from "./userSetting";

const routes = Router();

routes.use("/api/post", new PostsRouter().router);
routes.use("/api/auth", new AuthRouter().router);
routes.use("/api/user", new UserRouter().router);
routes.use("/api/user-setting", new UserSettingRouter().router);
routes.use('/', swaggerUi.serve, swaggerUi.setup(specs))



export default routes;