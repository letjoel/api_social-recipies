import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNumber, ValidateNested, IsDefined, IsHexadecimal } from "class-validator";
import { Type } from 'class-transformer';
import mongoose from 'mongoose';


class IngredientNested {
	@IsDefined()	
    @IsHexadecimal()
    _id: {
		type: mongoose.Types.ObjectId;
	}

	@IsDefined()	
	@IsNumber()
	qty: number;
}

class CommentNested {	
    @IsString()
    title: string;
	
    @IsString()
    comment: string;	

	@IsHexadecimal()
	author:  {
		type: mongoose.Types.ObjectId;
	}
}

export class CreateRecipeDto {

	@ApiProperty( {example: 'Chocolate pie'})
	@IsDefined()
	@IsString()
	name: string;

	@ApiProperty( {example: 'Delicious chocolate pie with high sugar dose. First: cut onions in tiny slices. Second: Mix chocolate and onion. Third: let your pet taste it. Fourth: enjoy it.'})
	@IsString()
	@IsDefined()
	description: string;

	@ApiProperty( {example: 'John'})
	@IsDefined()
	@IsString()
	author: string;

	@ApiProperty( {example: 8})
	@IsNumber()
	avg_rating: number;

	@ApiProperty( {example: '/images/chocolate-pie.png'})
	@IsString()
	img: string;

	@ApiProperty( {example: 'true'})
	@IsDefined()	
	@IsBoolean()
	is_public: boolean;

	@ApiProperty( {example: '[{ _id: "2943823572034", qty: 200 }]'})
	@ValidateNested()
	@Type(() => IngredientNested) 	
	ingredients: IngredientNested[];

	@ApiProperty( {example: 'Lunch'})
	@IsString()
	meal_type: string;

	@ApiProperty( {example: 'France'})
	@IsString()
	country: string;

	@ApiProperty( {example: 30})
	@IsNumber()
	cooking_time: number;

	@ApiProperty( {example: 'Easy'})
	@IsString()
	difficulty: string;

	@ApiProperty( {example: 9421})
	@IsNumber()
	views: number;

	@ApiProperty( {example: 'Mediterranean'})
	@IsString()
	food_type: string;

	@ApiProperty( {example: '[{ title:"Nice recipe", comment:"I love this kind of recipies, please more!", id_user: "2943823572034" }]'})
	@ValidateNested() 
	@Type(() => CommentNested) 		
	comments: CommentNested[];

}

