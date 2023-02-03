import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientSchema, Ingredient } from './schemas/ingredient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ingredient.name, schema: IngredientSchema }]),
  ],
  controllers: [IngredientController],
  providers: [IngredientService]
})
export class IngredientModule {}
