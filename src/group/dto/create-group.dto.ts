import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNumber, ValidateNested, IsDefined, IsHexadecimal } from "class-validator";
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import internal from "stream";




export class CreateGroupDto {
    @ApiProperty( {example: 'Choco'})
	@IsDefined()
	@IsString()
	group_name: string;

    @ApiProperty( {example: 'Admin_ID number'})
	@IsDefined()
	admin_id: string;
}
