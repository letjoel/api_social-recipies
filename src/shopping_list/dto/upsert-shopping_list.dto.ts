import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsHexadecimal, IsNumber, ValidateNested } from "class-validator";
import mongoose, { ObjectId } from "mongoose";

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

export class UpsertShoppingListDto {

	@ApiProperty( {example: '63cb0277ee58877e63e36fcc'})
	_id: mongoose.Types.ObjectId;

    // @ApiProperty( {example:''})
	// ingredients: [{
	// 	ingredient: {type: mongoose.Types.ObjectId, ref:'Ingredient'},
	// 	quantity: number
	// }] 

	@ApiProperty( {example: '[{}]'})
	@ValidateNested()
	@Type(() => IngredientNested) 	
	ingredients: IngredientNested[];

}
