import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { UserController } from '../controllers/User/UserController';
import { UserSettingController } from '../controllers/User/UserSettingController';

class UserSettingRouter {
    public router: Router;
    public userSettingController: UserSettingController = new UserSettingController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    public routes() {
        /**
         * @swagger
         * '/api/user-setting':
         *    get:
         *      tags:
         *        - User Setting
         *      summary: list all user setting
         *      description: user-setting
         *      produces:
         *      - application/json
         *      parameters:
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
        this.router.get("/", authenticateToken, this.userSettingController.getUserSetting);

        /**
         * @swagger
         * '/api/user-setting/{userId}':
         *    get:
         *      tags:
         *        - User Setting
         *      summary: user setting by user id
         *      description: user-setting
         *      produces:
         *      - application/json
         *      parameters:
         *      - in: path
         *        name: userId
         *        schema:
         *          type: string
         *        required: true
         *      responses:
         *        '200':
         *          description: Success.
         *        '400':
         *          description: Bad request!
         *        '404':
         *          description: Not found
         */
        this.router.get("/:userId",authenticateToken, this.userSettingController.getUserSettingByUserId);

        /**
       * @swagger
       * '/api/user-setting/{userId}':
       *    put:
       *      tags:
       *        - User Setting
       *      summary: update user setting
       *      description: update user
       *      produces:
       *      - application/json
       *      parameters:
       *      - in: path
       *        name: userId
       *        schema:
       *          type: string
       *        required: true
       *      - in: body
       *        name: body
       *        description: update user
       *        required: true
       *        schema: 
       *           $ref: "#/definitions/UserSettingModel"
       *      responses:
       *        '200':
       *          description: Success.
       *        '400':
       *          description: Bad request!
       *        '404':
       *          description: Not found
       */
        this.router.put("/:userId", this.userSettingController.updateUserSetting);


        /**
        * @swagger
        * '/api/user-setting/{userId}':
        *    delete:
        *      tags:
        *        - User Setting
        *      summary: delete user
        *      description: delete user
        *      operationId: delete user
        *      produces:
        *      - application/json
        *      parameters:
        *      - in: path
        *        name: userId
        *        schema:
        *          type: string
        *        required: true
        *      responses:
        *        '200':
        *          description: Success.
        *        '400':
        *          description: Bad request!
        *        '404':
        *          description: Not found
        */
        this.router.delete("/:userId", this.userSettingController.removeUserSetting);

    }
}

export default UserSettingRouter;
