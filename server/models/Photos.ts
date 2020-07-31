import { Schema, model, Document } from 'mongoose';

interface IPhoto extends Document
{
    title: string;
    description: string;
    imagePath: string;
}

const schema: Schema = new Schema({
    title: String,
    description: String,
    imagePath: String,
});

export default model<IPhoto>('Photos', schema);