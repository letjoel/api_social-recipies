import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongoose";


export class CreateFavoriteDto {

    @ApiProperty( {example: 'ews6f54we654efw651few6'})
    _id: ObjectId;
}
