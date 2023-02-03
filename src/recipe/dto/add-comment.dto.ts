import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({example: 'Good enough'})
  title: string;

  @ApiProperty({example: 'I like this recipe, really tasty, but could be improved adding cinamon'})
  comment: string;

	@ApiProperty({example: 'John Doe'})
  author: string;
}