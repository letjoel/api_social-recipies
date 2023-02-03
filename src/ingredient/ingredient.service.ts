import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { GetIngredientFilterDto } from './dto/filter-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient, IngredientDocument } from "./schemas/ingredient.schema";
const mongoose = require('mongoose');
@Injectable()

export class IngredientService {
  
    constructor( 
    @InjectModel(Ingredient.name) private readonly ingredientModel: Model<Ingredient>, 
  ) {} 
  
  async create(createIngredientDto: CreateIngredientDto) {
    const newIngredient = new this.ingredientModel(createIngredientDto);
    return await newIngredient.save();
  }

  async findAll(): Promise<Ingredient[]> {
    const ingredientsData = await this.ingredientModel.find();
    if (!ingredientsData || ingredientsData.length == 0) {
        console.log("Error: no data");
    } 
    return ingredientsData;
  }

  async findOne(id: string): Promise<Ingredient> {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const ingredientData = await this.ingredientModel.findById(id);
if (!ingredientData) {
    console.log("Error: no data");
}
return ingredientData;
}else {
  console.log("Error: the id is not in a valid format");
}
}   

async update(id: string, updateIngredientDto: UpdateIngredientDto) {
  const updatedIngredient = await this.ingredientModel.findByIdAndUpdate(id,updateIngredientDto);
  return updatedIngredient;
}

async remove(id: string) {
  const removedIngredient = await this.ingredientModel.findByIdAndDelete(id);
  return removedIngredient;
}

async findByFilter(queries: GetIngredientFilterDto) {

  let ingredients = await this.findAll();

  let {name, measure_unit} = queries;

  if (name) {
    ingredients = ingredients.filter( ingredient => ingredient.name === name);
  }

  if (measure_unit) {
    ingredients = ingredients.filter( ingredient => ingredient.measure_unit === measure_unit);
  }

  return ingredients;
}
async findByName(tag: string): Promise<Ingredient[]>{
  const ingredientsData = await this.ingredientModel.find({name: tag});
  if (!ingredientsData || ingredientsData.length == 0) {
    console.log("Error: no data");
  }
  return ingredientsData;
}
async findByMeasure_unit(tag: string): Promise<Ingredient[]>{
  const ingredientsData = await this.ingredientModel.find({measure_unit: tag});
  if (!ingredientsData || ingredientsData.length == 0) {
    console.log("Error: no data");
  }
  return ingredientsData;
} 
}
