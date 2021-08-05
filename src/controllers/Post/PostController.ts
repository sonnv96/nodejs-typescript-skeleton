import { Request, Response } from "express";
import Post from "../../models/Post";
import Posts from "../../models/Post";

export class PostsController {

    public async getPosts(req: Request, res: Response): Promise<void> {
        const listPosts = await Posts.find();
        res.json({ listPosts });
    }

    public async getPostsById(req: Request, res: Response): Promise<void> {
        const posts = await Posts.findOne({_id: req.params.postId});
        if (posts === null) {
            res.sendStatus(404);
        } else {
            res.json(posts);
        }
    }

    public async createPosts(req: Request, res: Response): Promise<void> {
        const newPosts: any = new Posts(req.body);
        const posts = await Posts.findOne({ _id: req.body.postId });
        if (posts === null) {
            const result = await newPosts.save();
            if (result === null) {
                res.sendStatus(500);
            } else {
                res.status(201).json({ status: 201, data: result });
            }

        } else {
            res.sendStatus(422);
        }
    }

    public async updatePosts(req: Request, res: Response): Promise<void> {
        const posts = await Posts.findOneAndUpdate({ _id: req.params.postId }, req.body);
        if (posts === null) {
            res.sendStatus(404);
        } else {
            const updatedPosts = { _id: req.params.postId, ...req.body };
            res.json({ status: res.status, data: updatedPosts });
        }
    }

    public async deletePosts(req: Request, res: Response): Promise<void> {
        const posts = await Posts.findOneAndDelete({ _id: req.params.postId });
        if (posts === null) {
            res.sendStatus(404);
        } else {
            res.json({ response: "Product deleted Successfully" });
        }
    }
}