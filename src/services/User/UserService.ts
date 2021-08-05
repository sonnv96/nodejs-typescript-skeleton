import UserSetting from "../../models/UserSetting";

export class UserService {
    public async createUserSettingDefault(userId) {
        const newUserSetting: any = new UserSetting({ userId: userId });
        const userSetting = await UserSetting.findOne({ userId: userId });
        if (userSetting === null) {
            const result = await newUserSetting.save();
            if (result === null) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }

    // service get user setting by user id
    
    public async getUserSettingByUser(userId) {
        const userSetting = await UserSetting.findOne({ userId: userId });
        if (userSetting === null) {
            return null
        } else {
            return userSetting;
        }
    }
}