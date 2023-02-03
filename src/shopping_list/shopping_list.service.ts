import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UpsertShoppingListDto } from './dto/upsert-shopping_list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping_list.dto';
import { ShoppingList } from './schema/shopping_list.schema';
import { JwtService } from '@nestjs/jwt';
import { InsertIngredientsShoppingListDto } from './dto/insert-ingredient-shopping_list.dto';

@Injectable()
export class ShoppingListService {

  constructor( 
    @InjectModel(ShoppingList.name) private readonly shoppingListModel: Model<ShoppingList>,
    private jwtAuthService:JwtService
  ) {}

  async upsertShoppingList(upsertShoppingListDto: UpsertShoppingListDto) {

    const shoppingListExisting = await this.shoppingListModel.findOne({_id:upsertShoppingListDto._id})
      .populate({ path: 'ingredients._id' })
      .setOptions({ sanitizeFilter: true })
      .exec();

    

      if (shoppingListExisting) {
      console.log("Logged user already has a shopping list in DB:" + shoppingListExisting);

      let {ingredients} = shoppingListExisting;
      let insertIngredientsDto: InsertIngredientsShoppingListDto = {ingredients}

      upsertShoppingListDto.ingredients.forEach((obj)=>{
        
        const foundIngredient = insertIngredientsDto.ingredients.some(el => el.ingredient === obj.ingredient);

        if (foundIngredient) {
          //Ingredient found: update the ingredient into insertIngredientsDto 
          for (let i = 0; i < insertIngredientsDto.ingredients.length; i++) {

            if (insertIngredientsDto.ingredients[i].ingredient == obj.ingredient) {
              insertIngredientsDto.ingredients[i].quantity = insertIngredientsDto.ingredients[i].quantity + obj.quantity;
            }
          } 
        }else {
          //No Ingredient found: push insertIngredientsDto with new ingredient data
          insertIngredientsDto.ingredients.push(obj);
          console.log("Add new ingredient: " + obj.ingredient);
        }
      })

      //Update shopping list
      await this.shoppingListModel.findByIdAndUpdate(shoppingListExisting._id,insertIngredientsDto);
      console.log("Shopping list updated");
      return insertIngredientsDto;

    }else{
      //Create shopping list
      const newShoppingList = new this.shoppingListModel(upsertShoppingListDto);
      console.log("New shopping list created: " + newShoppingList);
      return await newShoppingList.save();
    }

  }

  async findAll(): Promise<ShoppingList[]> {
    const shoppingListData = await this.shoppingListModel.find();
    if (!shoppingListData || shoppingListData.length == 0) {
        console.log("Error: no data");
    }
    return shoppingListData;
  }


  async findOne(id: string) {

    if (mongoose.Types.ObjectId.isValid(id)) {
          const shoppingListData = await this.shoppingListModel.findById(id)
          .populate({ path: 'ingredients.ingredient' })
          .exec();
    if (!shoppingListData) {
        console.log("Error: no data");
    }
    return shoppingListData;
    }else {
      console.log("Error: the id is not in a valid format");
    }

  }

  async update(id: number, updateShoppingListDto: UpdateShoppingListDto | InsertIngredientsShoppingListDto) {
    const updatedShoppingList = await this.shoppingListModel.findByIdAndUpdate(id,updateShoppingListDto);
    return updatedShoppingList;
  }

  async remove(id: number) {
    const removedShoppingList = await this.shoppingListModel.deleteOne({id : id});
    return removedShoppingList;
  }
}

