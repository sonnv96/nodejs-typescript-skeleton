import { Request, Response } from "express";
import User from "../../models/User";

export class UserController {

    public async getUsers(req: Request, res: Response): Promise<void> {
        const list = await User.find();
        res.json({ list });
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        const user = await User.findOne({userId: req.params.userId});
        if (user === null) {
            res.sendStatus(404);
        } else {
            res.json(user);
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const user = await User.findOneAndUpdate({ userId: req.params.userId }, req.body);
        if (user === null) {
            res.sendStatus(404);
        } else {
            const updateUser = { _id: req.params.userId, ...req.body };
            res.json({ status: res.status, data: updateUser });
        }
    }

    public async removeUser(req: Request, res: Response): Promise<void> {
        const user = await User.findOne({ userId: req.params.userId });
        if (user === null) {
            res.sendStatus(404);
        } else {
            user.deleted = 'Y'
            await user.save()
            res.json({ response: "User deleted Successfully" });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const user = await User.findOneAndDelete({ userId: req.params.userId });
        if (user === null) {
            res.sendStatus(404);
        } else {
            res.json({ response: "User deleted Successfully" });
        }
    }
}