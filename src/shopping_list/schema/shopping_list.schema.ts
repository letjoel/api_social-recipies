import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";

@Schema()
export class ShoppingList {

	@Prop({type: mongoose.Types.ObjectId, ref: 'User'})
	_id: ObjectId;

	@Prop({type: mongoose.Types.ObjectId, ref:'Ingredient'})
	ingredients: any[] 
}


export const ShoppingListSchema = SchemaFactory.createForClass(ShoppingList);
