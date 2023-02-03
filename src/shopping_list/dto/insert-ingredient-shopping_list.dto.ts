import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsHexadecimal, IsNumber, ValidateNested } from "class-validator";
import mongoose from "mongoose";

class IngredientNested {
	@IsDefined()	
    @IsHexadecimal()
    ingredient: {
		type: mongoose.Types.ObjectId;
	}

	@IsDefined()	
	@IsNumber()
	quantity: number;
}

export class InsertIngredientsShoppingListDto {

	@ApiProperty( {example: '[{}]'})
	@ValidateNested()
	@Type(() => IngredientNested) 	
	ingredients: IngredientNested[];

}
