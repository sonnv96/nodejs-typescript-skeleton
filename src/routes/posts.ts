import { Router, Request, Response } from 'express';
import Post from '../models/Post'
import { PostsController } from "../controllers/Post/PostController";
import { authenticateToken } from '../middlewares/authenticateToken';

class PostsRouter {
    public router: Router;
    public postsController: PostsController = new PostsController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    public routes() {
        /**
        * @swagger
        * /api/post:
        *    get:
        *      tags:
        *        - Posts
        *      summary: List All Posts
        *      description: This can only be done by the logged in posts.
        *      operationId: listAllPosts
        *      produces:
        *        - application/json
        *      responses:
        *        default:
        *          description: get all posts
        *          schema:
        *            type: array
        */
        this.router.get("/", authenticateToken, this.postsController.getPosts);
        this.router.get("/:postId", this.postsController.getPostsById);
        this.router.delete("/:postId", this.postsController.deletePosts);
        this.router.post("/", this.postsController.createPosts);
        this.router.put("/:postId", this.postsController.updatePosts);
    }
}

export default PostsRouter;
