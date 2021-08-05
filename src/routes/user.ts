import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { UserController } from '../controllers/User/UserController';

class UserRouter {
    public router: Router;
    public userController: UserController = new UserController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    public routes() {
        /**
         * @swagger
         * '/api/user':
         *    get:
         *      tags:
         *        - user
         *      summary: list all user
         *      description: user
         *      operationId: users
         *      produces:
         *      - application/json
         *      parameters:
         *      - in: body
         *        name: body
         *        description: user 
         *        required: true
         *      responses:
         *        '200':
         *          description: Success.
         *        '400':
         *          description: Bad request!
         *        '404':
         *          description: Not found
         */
        this.router.get("/", authenticateToken, this.userController.getUsers);
        
        this.router.get("/:userId", this.userController.getUserById);
        /**
        * @swagger
        * '/api/user':
        *    delete:
        *      tags:
        *        - user
        *      summary: delete user
        *      description: delete user
        *      operationId: deleteuser
        *      produces:
        *      - application/json
        *      parameters:
        *      - in: body
        *        name: body
        *        description: delete user
        *        required: true
        *      responses:
        *        '200':
        *          description: Success.
        *        '400':
        *          description: Bad request!
        *        '404':
        *          description: Not found
        */
        this.router.delete("/:postId", this.userController.deleteUser);
        /**
        * @swagger
        * '/api/user':
        *    put:
        *      tags:
        *        - user
        *      summary: update user
        *      description: update user
        *      operationId: userupdate
        *      produces:
        *      - application/json
        *      parameters:
        *      - in: body
        *        name: body
        *        description: update user
        *        required: true
        *      responses:
        *        '200':
        *          description: Success.
        *        '400':
        *          description: Bad request!
        *        '404':
        *          description: Not found
        */
        this.router.put("/:postId", this.userController.updateUser);
    }
}

export default UserRouter;
