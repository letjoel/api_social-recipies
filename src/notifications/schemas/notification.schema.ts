import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, ObjectId } from "mongoose";
import { Document } from "mongoose";

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {

	@Prop({type: Object})
	emitter: ObjectId;

	@Prop({type: Date})
	date: Date;

	@Prop()
	title: string;

	@Prop()
	text_field: string;

	@Prop()
	type: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);