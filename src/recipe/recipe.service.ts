import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipiesFilterDto } from './dto/filter-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe, RecipeDocument } from "./schemas/recipe.schema";
import mongoose from 'mongoose';
@Injectable()
export class RecipeService {

    constructor( 
    @InjectModel(Recipe.name) private readonly recipeModel: Model<RecipeDocument>, 
  ) {}

  async create(createRecipeDto: CreateRecipeDto) {
    const newRecipe = new this.recipeModel(createRecipeDto);
    return await newRecipe.save();
  }

  async findAll(): Promise<Recipe[]> {
    const recipiesData = await this.recipeModel.find()
      .populate({ path: 'ingredients._id' })
      .setOptions({ sanitizeFilter: true })
      .exec();
    if (!recipiesData || recipiesData.length == 0) {
        console.log("Error: no data");
    }
    return recipiesData;
  }

  async findOne(id: string): Promise<Recipe> {
    if (mongoose.Types.ObjectId.isValid(id)) {
          const recipeData = await this.recipeModel.findById(id)
          .populate({ path: 'ingredients._id' })
          .exec();
    if (!recipeData) {
        console.log("Error: no data");
    }
    return recipeData;
    }else {
      console.log("Error: the id is not in a valid format");
    }


  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const updatedRecipe = await this.recipeModel.findByIdAndUpdate(id,updateRecipeDto);
    return updatedRecipe;
  }

  async remove(id: string) {
    const removedRecipe = await this.recipeModel.findByIdAndDelete(id);
    return removedRecipe;
  }

  async findByFilter(queries: GetRecipiesFilterDto) {

    let recipies = await this.findAll();

    let {name, author, avg_rating, is_public, meal_type, country, cooking_time, difficulty, views, food_type, ingredients} = queries;

    if (name) {
      recipies = recipies.filter( recipe => recipe.name === name);
    }

    if (author) {
      recipies = recipies.filter( recipe => recipe.author === author);
    }

    if (avg_rating) {
      recipies = recipies.filter( recipe => recipe.avg_rating == avg_rating);
    }    

    if (is_public != undefined) {
      let is_publicBoolean = (is_public.toLowerCase() === "true");
      recipies = recipies.filter( recipe => recipe.is_public == is_publicBoolean);
    }   
    
    if (meal_type) {
      recipies = recipies.filter( recipe => recipe.meal_type === meal_type);
    }     

    if (country) {
      recipies = recipies.filter( recipe => recipe.country === country);
    }  
    if (cooking_time) {
      recipies = recipies.filter( recipe => recipe.cooking_time == cooking_time);
    }    
    if (difficulty) {
      recipies = recipies.filter( recipe => recipe.difficulty === difficulty);
    }   
    if (views) {
      recipies = recipies.filter( recipe => recipe.views == views);
    }   
    if (food_type) {
      recipies = recipies.filter( recipe => recipe.food_type === food_type);
    }   

    // if (ingredients) {
    //   let ingredientsArray = ingredients.split(',');
    //   recipies = recipies.filter(({ ingredients }) =>
    //   ingredients.some(({ _id }) => ingredientsArray.includes(_id.toString()))
    //   );
    // }

    return recipies;

  }

  async findByName(tag: string): Promise<Recipe[]>{
    const recipiesData = await this.recipeModel.find({name: tag});
    if (!recipiesData || recipiesData.length == 0) {
      console.log("Error: no data");
    }
    return recipiesData;
  }
  async findByAuthor(tag: string): Promise<Recipe[]>{
    const recipiesData = await this.recipeModel.find({author: tag});
    if (!recipiesData || recipiesData.length == 0) {
      console.log("Error: no data");
    }
    return recipiesData;
  }  
  async findByAv_rating(tag: string): Promise<Recipe[]>{
    const recipiesData = await this.recipeModel.find({avg_rating: tag});
    if (!recipiesData || recipiesData.length == 0) {
      console.log("Error: no data");
    }
    return recipiesData;
  }  
  async findByIs_public(tag: string): Promise<Recipe[]>{
    const recipiesData = await this.recipeModel.find({is_public: tag});
    if (!recipiesData || recipiesData.length == 0) {
      console.log("Error: no data");
    }
    return recipiesData;
  }  
  async findByMeal_type(tag: string): Promise<Recipe[]>{
    const recipiesData = await this.recipeModel.find({meal_type: tag});
    if (!recipiesData || recipiesData.length == 0) {
      console.log("Error: no data");
    }
    return recipiesData;
  }  
  async findByCountry(tag: string): Promise<Recipe[]>{
    const recipiesData = await this.recipeModel.find({country: tag});
    if (!recipiesData || recipiesData.length == 0) {
      console.log("Error: no data");
    }
    return recipiesData;
  }  
  async findByCooking_time(tag: string): Promise<Recipe[]>{
    const recipiesData = await this.recipeModel.find({cooking_time: tag});
    if (!recipiesData || recipiesData.length == 0) {
      console.log("Error: no data");
    }
    return recipiesData;
  }  
  async findByDifficulty(tag: string): Promise<Recipe[]>{
    const recipiesData = await this.recipeModel.find({difficulty: tag});
    if (!recipiesData || recipiesData.length == 0) {
      console.log("Error: no data");
    }
    return recipiesData;
  }  
  async findByViews(tag: string): Promise<Recipe[]>{
    const recipiesData = await this.recipeModel.find({views: tag});
    if (!recipiesData || recipiesData.length == 0) {
      console.log("Error: no data");
    }
    return recipiesData;
  }  
  async findByFood_type(tag: string): Promise<Recipe[]>{
    const recipiesData = await this.recipeModel.find({food_type: tag});
    if (!recipiesData || recipiesData.length == 0) {
      console.log("Error: no data");
    }
    return recipiesData;
  }  
  async findMostViewed(): Promise<Recipe[]>{
    const recipiesData = await this.recipeModel.find().sort({"views":-1}).limit(10);
    if (!recipiesData || recipiesData.length == 0) {
        console.log("Error: no data");
    }
    return recipiesData;
  }

  async addComment(id: string, comment: any) { 
    let recipe: RecipeDocument = await this.recipeModel.findById(id); 
    recipe.comments.push(comment); 
    recipe.save(); 
    return recipe;
  }

  
}
