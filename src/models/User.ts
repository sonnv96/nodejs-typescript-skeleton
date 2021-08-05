import { Document, Model, model, Schema } from "mongoose";
import validator from 'validator';
import { CryptoHash } from "../middlewares/cryptoHash";


/**
* @swagger
* definitions:
*  UserModel:
*    type: object
*    properties:
*      username:
*        type: string
*      displayName:
*        type: string
*      photoUrl:
*        type: string
*      password:
*        type: string
*        format: string
*      email:
*        type: string
*        format: string
*    xml:
*      name: UserModel
*/

/**
 * Interface to model the User Schema for TypeScript.
 * @param username:string
 * @param email:string
 * @param displayName:string
 * @param photoUrl:string
 * @param password:string
 * @param tokens:any
 */
export interface IUser extends Document {
    username: string;
    email: string;
    displayName: string;
    photoUrl: string;
    password: string;
    refreshToken: string;
    userId: string;
    deleted: string;
    comparePassword(candidatePassword: string, currentPassword: string): boolean;

}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true,
    },
    photoUrl: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email address')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    },
    refreshToken: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
        minLength: 3,
        unique: true
    },
    deleted: {
        type: String,
        required: true,
        default: "N"
    },
});

userSchema.pre<IUser>("save", async function save(next) {
    const user = this;
    if (user.isModified('password')) {
        const cryptoHash: CryptoHash = new CryptoHash()
        const hash = await cryptoHash.hash(this.password);
        user.password = hash.toString();
	}
    next()
});

userSchema.methods.comparePassword = async (candidatePassword: string, currentPassword: string) =>  {
    const cryptoHash: CryptoHash = new CryptoHash()
    return await cryptoHash.verify(candidatePassword, currentPassword)
};
export default model<IUser>('Users', userSchema);