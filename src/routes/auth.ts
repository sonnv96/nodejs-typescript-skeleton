import { Router } from 'express';
import AuthController from '../controllers/Auth/AuthController';

class AuthRouter {
    public router: Router;
    public authController: AuthController = new AuthController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    public routes() {
        /**
        * @swagger
        * '/api/auth/login':
        *    post:
        *      tags:
        *        - auth
        *      summary: Login
        *      description: login
        *      operationId: login
        *      produces:
        *      - application/json
        *      parameters:
        *      - in: body
        *        name: bodyLogin
        *        description: login 
        *        required: true
        *        schema:
        *           type: object
        *           properties:
        *               username:
        *                   type: string
        *                   example: "admin"
        *               password:
        *                   type: string
        *                   example: "123456"
        *      responses:
        *        '200':
        *          description: Success.
        *        '400':
        *          description: Bad request!
        *        '404':
        *          description: Not found
        */
        this.router.post('/login', this.authController.authenticate)
        /**
        * @swagger
        * '/api/auth/getUserByToken':
        *    post:
        *      tags:
        *        - auth
        *      summary: getUserByToken
        *      description: getUserByToken
        *      operationId: getUserByToken
        *      produces:
        *      - application/json
        *      parameters:
        *      - in: body
        *        name: getUserByToken
        *        description: getUserByToken 
        *        required: true
        *        schema:
        *           type: object
        *           properties:
        *               access_token:
        *                   type: string
        *                   example: ""
        *      responses:
        *        '200':
        *          description: Success.
        *        '400':
        *          description: Bad request!
        *        '404':
        *          description: Not found
        */
        this.router.post('/getUserByToken', this.authController.getUserbyToken)
        /**
        * @swagger
        * '/api/auth/refresh-token':
        *    post:
        *      tags:
        *        - auth
        *      summary: refresh token
        *      description: refresh token
        *      operationId: refreshToken
        *      produces:
        *      - application/json
        *      parameters:
        *      - in: body
        *        name: body
        *        description: refresh token
        *        required: true
        *        schema:
        *           type: object
        *           properties:
        *               refreshToken:
        *                   type: string
        *                   example: ""
        *                   
        *      responses:
        *        '200':
        *          description: Success.
        *        '400':
        *          description: Bad request!
        *        '404':
        *          description: Not found
        */
        this.router.post('/refresh-token', this.authController.refreshToken)

        /**
        * @swagger
        * '/api/auth/change-password':
        *    post:
        *      tags:
        *        - auth
        *      summary: Change Password
        *      description: change password for user.
        *      operationId: changePassword
        *      produces:
        *      - application/json
        *      parameters:
        *      - in: body
        *        name: body
        *        description: change password for user
        *        required: true
        *        schema: 
        *           type: object
        *           properties:
        *               username:
        *                   type: string
        *                   format: string
        *               oldPassword:
        *                   type: string
        *                   format: string
        *               newPassword:
        *                   type: string
        *                   format: string
        *           
        *      responses:
        *        '200':
        *          description: Success.
        *        '400':
        *          description: Bad request!
        *        '404':
        *          description: Not found
        */
        this.router.post('/change-password', this.authController.changePassword)


        /**
        * @swagger
        * '/api/auth/register':
        *    post:
        *      tags:
        *        - auth
        *      summary: Register
        *      description: Register new user
        *      operationId: register
        *      produces:
        *      - application/json
        *      parameters:
        *      - in: body
        *        name: body
        *        description: register new user
        *        required: true
        *        schema: 
        *           $ref: "#/definitions/UserModel"
        *        
        *      responses:
        *        '200':
        *          description: Success.
        *        '400':
        *          description: Bad request!
        *        '404':
        *          description: Not found
        */
       this.router.post('/register', this.authController.register)
    }
}

export default AuthRouter;
