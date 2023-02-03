import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsObject } from 'class-validator';
import mongoose, { Document } from 'mongoose';

export type IngredientDocument = Ingredient & Document;

@Schema()
export class Ingredient {
    @Prop({required: true})
	name: string;

	@Prop({required: true})
	measure_unit: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);