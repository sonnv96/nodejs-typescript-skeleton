import { Document, Model, model, Schema } from "mongoose";
/**
* @swagger
* definitions:
*  UserSettingModel:
*    type: object
*    properties:
*      mainTheme:
*        type: string
*        format: string
*      footerTheme:
*        type: string
*        format: string
*      footerDisplay:
*        type: boolean
*        format: boolean
*      footerPosition:
*        type: string
*        format: string
*      footerStyle:
*        type: string
*        format: string
*      navbarTheme:
*        type: string
*        format: string
*      navbarDisplay:
*        type: boolean
*        format: boolean
*      navbarPosition:
*        type: string
*        format: string
*      navbarFolded:
*        type: boolean
*        format: boolean
*      toolbarTheme:
*        type: string
*        format: string
*      toolbarDisplay:
*        type: boolean
*        format: boolean
*      toolbarPosition:
*        type: string
*        format: string
*      toolbarStyle:
*        type: string
*        format: string
*      style:
*        type: string
*        format: string
*      mode:
*        type: string
*        format: string
*      scroll:
*        type: string
*        format: string
*    xml:
*      name: UserModel
*/

/**
 * Interface to model the Post Schema for TypeScript.
 * @param title:string
 * @param description:string
 */
export interface IUserSetting extends Document {
    mainTheme: string;
    footerTheme: string;
    footerDisplay: boolean;
    footerPosition: string;
    footerStyle: string;
    navbarTheme: string;
    navbarDisplay: boolean;
    navbarPosition: string;
    navbarFolded: boolean;
    toolbarTheme: string;
    toolbarDisplay: boolean;
    toolbarPosition: string;
    toolbarStyle: string;
    style: string;
    mode: string;
    scroll: string;
    userId: string;

 }

const userSettingSchema: Schema = new Schema({
    mainTheme: {
        type: String,
        required: true,
        default: "defaultDark"
    },
    footerTheme: {
        type: String,
        required: true,
        default: "defaultDark"
    },
    footerDisplay: {
        type: Boolean,
        required: true,
        default: true
    },
    footerPosition: {
        type: String,
        required: true,
        default: "bellow"
    },
    footerStyle: {
        type: String,
        required: true,
        default: "fixed"
    },
    navbarTheme: {
        type: String,
        required: true,
        default: "defaultDark"
    },
    navbarDisplay: {
        type: Boolean,
        required: true,
        default: true
    },
    navbarPosition: {
        type: String,
        required: true,
        default: "left"
    },
    navbarFolded: {
        type: Boolean,
        required: true,
        default: true
    },
    toolbarTheme: {
        type: String,
        required: true,
        default: "defaultDark"
    },
    toolbarDisplay: {
        type: Boolean,
        required: true,
        default: true
    },
    toolbarPosition: {
        type: String,
        required: true,
        default: "below"
    },
    toolbarStyle: {
        type: String,
        required: true,
        default: "fixed"
    },
    style: {
        type: String,
        required: true,
        default: "style"
    },
    mode: {
        type: String,
        required: true,
        default: "fullwidth"
    },
    scroll: {
        type: String,
        required: true,
        default: "content"
    },
    userId: {
        type: String,
        required: true,
        minLength: 3,
    },
    
});

export default model<IUserSetting>('UserSetting', userSettingSchema);