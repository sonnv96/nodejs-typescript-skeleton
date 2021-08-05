import { Request, Response } from "express";
import User from "../../models/User";
import UserSetting from "../../models/UserSetting";

export class UserSettingController {

    public async getUserSetting(req: Request, res: Response): Promise<void> {
        const list = await UserSetting.find();
        res.json({ list });
    }

    public async getUserSettingByUserId(req: Request, res: Response): Promise<void> {
        const userSetting = await UserSetting.findOne({userId: req.params.userId});
        if (userSetting === null) {
            res.sendStatus(404);
        } else {
            res.json(userSetting);
        }
    }

    public async updateUserSetting(req: Request, res: Response): Promise<void> {
        const userSetting = await UserSetting.findOneAndUpdate({ userId: req.params.userId }, req.body);
        if (userSetting === null) {
            res.sendStatus(404);
        } else {
            const updateUserSetting = { userId: req.params.userId, ...req.body };
            res.json({ status: res.status, data: updateUserSetting });
        }
    }

    public async removeUserSetting(req: Request, res: Response): Promise<void> {
        const userSetting = await UserSetting.findOne({ userId: req.params.userId });
        if (userSetting === null) {
            res.sendStatus(404);
        } else {
            await userSetting.save()
            res.json({ response: "User Setting deleted Successfully" });
        }
    }
}