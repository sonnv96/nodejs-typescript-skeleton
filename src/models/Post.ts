import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the Post Schema for TypeScript.
 * @param title:string
 * @param description:string
 */
export interface IPosts extends Document {
    title: string;
    description: string;
}

const postsSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default model<IPosts>('Posts', postsSchema);