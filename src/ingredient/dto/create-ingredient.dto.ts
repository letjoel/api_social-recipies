import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNumber, ValidateNested, IsDefined, IsHexadecimal } from "class-validator";
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

export class CreateIngredientDto {

    @ApiProperty( {example: 'Flour'})
    @IsDefined()
	@IsString()
    name: string;

    @ApiProperty( {example: 'Grams'})
    @IsDefined()
	@IsString()
    measure_unit: string;
}

