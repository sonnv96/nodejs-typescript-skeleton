import { Request, Response } from "express";
import User, { IUser } from "../../models/User";
import jwt from 'jsonwebtoken'
import sysConstant from '../../config/system-constant'
import { generateUserId } from '../../middlewares/generateUserID';
import { UserService } from "../../services/User/UserService";

export default class AuthController {
    private userService: UserService = new UserService()


    authenticate = async (req: Request, res: Response): Promise<void> => {
        const { username, password } = req.body;
        try {
            let userResp: any = {}
            let user = await User.findOne({ username: username });
            if (!user) {
                return res.status(200).send({
                    success: false,
                    error: {
                        message: 'User not found',
                        fieldName: 'username'
                    }
                });
            }

            const matchPasswords = await user.comparePassword(password, user.password)
            if (!matchPasswords) {
                return res.status(200).send({
                    success: false,
                    error: {
                        message: 'Password is not correct',
                        fieldName: 'password'
                    }
                });
            }

            const token = await jwt.sign({ username }, sysConstant.jwtSecret, {
                expiresIn: sysConstant.expiresIn
            });

            const refreshToken = await jwt.sign({ username }, sysConstant.refreshTokenJwtSecret, {
                expiresIn: sysConstant.refreshTokenExpiresIn
            });

            user.refreshToken = refreshToken
            await user.save();
            // user = JSON.parse(JSON.stringify(user))
            let userSetting = await this.userService.getUserSettingByUser(user.userId)
            Object.assign(userResp, { access_token: token })
            Object.assign(userResp, { settings: JSON.parse(JSON.stringify(userSetting)) })
            Object.assign(userResp, { data: JSON.parse(JSON.stringify(user)) })
            Object.assign(userResp, { role: 'admin' })
            Object.assign(userResp, { shortcuts: ["contacts"] })


            res.status(200).send({
                success: true,
                message: 'Token generated Successfully',
                user: userResp
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString()
            });
        }
    }
    getUserbyToken = async (req: Request, res: Response): Promise<void> => {
        const { access_token } = req.body;
        try {
            let userResp: any = {}
            const decoded = jwt.decode(access_token, { complete: true });

            let user = await User.findOne({ username: decoded.payload.username });
            if (!user) {
                return res.status(200).send({
                    success: false,
                    error: {
                        message: 'User not found or token is not correct',
                        fieldName: 'username'
                    }
                });
            }
            let userSetting = await this.userService.getUserSettingByUser(user.userId)
            Object.assign(userResp, { access_token: access_token })
            Object.assign(userResp, { settings: JSON.parse(JSON.stringify(userSetting)) })
            Object.assign(userResp, { data: JSON.parse(JSON.stringify(user)) })
            Object.assign(userResp, { role: 'admin' })
            Object.assign(userResp, { shortcuts: ["contacts"] })


            res.status(200).send({
                success: true,
                message: 'Token generated Successfully',
                user:  userResp
            });

        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString()
            });
        }
    }

    refreshToken = async (req: Request, res: Response): Promise<void> => {
        const { refreshToken } = req.body;
        if (refreshToken) {
            try {
                const user = await User.findOne({ refreshToken: refreshToken });
                if (!user) {
                    return res.status(200).send({
                        success: false,
                        message: 'Token is not correct'
                    });
                }

                jwt.verify(refreshToken, sysConstant.refreshTokenJwtSecret as string,
                    (err: any, user: any) => {
                        console.log(err)

                        if (err) return res.sendStatus(403)
                        const token = jwt.sign({ user }, sysConstant.jwtSecret, {
                            expiresIn: sysConstant.expiresIn
                        });
                        res.status(200).send({
                            success: true,
                            data: token
                        });
                    })
            } catch (err) {
                res.status(500).send({
                    success: false,
                    message: err.toString()
                });
            }
        } else {
            res.status(400).json({
                message: 'Invalid request',
            });
        }

    }

    register = async (req: Request, res: Response): Promise<void> => {
        const { username, email, password, photoUrl, displayName } = req.body;
        try {
            const user = new User({
                username,
                email,
                photoUrl,
                displayName,
                password,
                userId: generateUserId()
            });

            const newUser = await user.save();

            if (newUser.userId) {

                await this.userService.createUserSettingDefault(newUser.userId)
            }

            res.status(200).send({
                success: false,
                message: 'User Successfully created',
                data: newUser
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString()
            });
        }
    }


    changePassword = async (req: Request, res: Response): Promise<void> => {
        const { oldPassword, newPassword, username } = req.body;

        try {
            if (!(oldPassword && newPassword)) {
                res.status(200).send({ error: 'oldPassword and newPassword are mandatory!' })
            }
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found'
                });
            }

            const matchPasswords = await user.comparePassword(oldPassword, user.password)
            if (!matchPasswords) {
                return res.status(200).send({
                    success: false,
                    message: 'Not authorized'
                });
            }

            user.password = newPassword


            await user.save();

            res.status(200).send({
                success: false,
                message: 'Password has changed',
                data: user
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString()
            });
        }
    }


}

