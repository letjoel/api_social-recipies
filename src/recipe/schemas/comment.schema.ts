import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';


export type CommentDocument = Comment & Document;


@Schema()
export class RecipeComment {
	@Prop()
	title: string;

	@Prop()
	comment: string;

	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
	author: any;

}

export const CommentSchema = SchemaFactory.createForClass(RecipeComment);
