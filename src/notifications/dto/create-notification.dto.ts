import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { Date, ObjectId } from "mongoose";


export class CreateNotificationDto {
	
	@ApiProperty( {example: '63cb0277ee58877e63e36fcc'})
	emitter: ObjectId;

	@ApiProperty( {example: '2023-01-20'})
	date: Date;

    @ApiProperty( {example: 'New like'})
	title: string;
	
	@ApiProperty( {example: 'Sergi liked your recipe'})
	text_field: string;

	@ApiProperty( {example: 'likes'})
	type: string;
}
