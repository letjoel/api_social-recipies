import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe.pipe';
import { CreateCommentDto } from './dto/add-comment.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @ApiBearerAuth()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/create')
  async create(@Res() res: Response, @Body() createRecipeDto: CreateRecipeDto) {
    const recipe = await this.recipeService.create(createRecipeDto);
    return res.status(HttpStatus.OK).json({
      message: 'Recipe successfully created',
      recipe
    });

  }

  @Get('/list')
  async findAll() {
    return await this.recipeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.recipeService.findOne(id);
  }
  
  @ApiBearerAuth()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('modify/:id')
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateRecipeDto: UpdateRecipeDto, @Res() res: Response) {
    const updatedRecipe = await this.recipeService.update(id, updateRecipeDto);
    return res.status(HttpStatus.OK).json({
      message: 'Recipe successfully updated',
      updatedRecipe
    });
  }

   @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:id')
  async remove(@Param('id', ParseObjectIdPipe) id: string, @Res() res: Response) {
    const deletededRecipe = await this.recipeService.remove(id);
    return res.status(HttpStatus.OK).json({
      message: 'Recipe successfully deleted',
      deletededRecipe
    });    
  }

  @Get('/filter/by')
  async findByFilter(
    @Query('name') name: string,
    @Query('author') author: string,
    @Query('avg_rating') _avg_rating: number,
    @Query('is_public') is_public: boolean,
    @Query('meal_type') meal_type: string,
    @Query('country') country: string,
    @Query('cooking_time') _cooking_time: number,
    @Query('difficulty') difficulty: string,
    @Query('views') _views: number,
    @Query('food_type') food_type: string,
    @Query('ingredients') ingredients: string

  ){

    let avg_rating = undefined;
    let views = undefined;
    let cooking_time = undefined;

    if (_avg_rating) {
      avg_rating = Number(_avg_rating);
    }
    if (_views) {
      views = Number(_views); 
    }
    if (_cooking_time) {
      cooking_time = Number(_cooking_time); 
    }    

    let queries = {name, author, avg_rating, is_public, meal_type, country, cooking_time, difficulty, views, food_type, ingredients};

    return await this.recipeService.findByFilter(queries);   

  }

  @Get('filter/name/:tag')
  async findByName (@Param('tag') tag: string) {
    return await this.recipeService.findByName(tag);
  }
  @Get('filter/author/:tag')
  async findByAuthor (@Param('tag') tag: string) {
    return await this.recipeService.findByAuthor(tag);
  }
  @Get('filter/av_rating/:tag')
  async findByAv_rating (@Param('tag') tag: string) {
    return await this.recipeService.findByAv_rating(tag);
  }
  @Get('filter/is_public/:tag')
  async findByIs_public (@Param('tag') tag: string) {
    return await this.recipeService.findByIs_public(tag);
  }
  @Get('filter/meal_type/:tag')
  async findByMeal_type (@Param('tag') tag: string) {
    return await this.recipeService.findByMeal_type(tag);
  }
  @Get('filter/country/:tag')
  async findByCountry (@Param('tag') tag: string) {
    return await this.recipeService.findByCountry(tag);
  }
  @Get('filter/cooking_time/:tag')
  async findByCooking_time (@Param('tag') tag: string) {
    return await this.recipeService.findByCooking_time(tag);
  }
  @Get('filter/difficulty/:tag')
  async findByDifficulty (@Param('tag') tag: string) {
    return await this.recipeService.findByDifficulty(tag);
  }
  @Get('filter/views/:tag')
  async findByViews (@Param('tag') tag: string) {
    return await this.recipeService.findByViews(tag);
  }
  @Get('filter/food_type/:tag')
  async findByFood_type (@Param('tag') tag: string) {
    return await this.recipeService.findByFood_type(tag);
  }                  

  @Get('/top10/views')
  async findMostViewed() {
    return await this.recipeService.findMostViewed();
  }

  @ApiBearerAuth()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id/comment') 
  async addComment(
    @Param('id', ParseObjectIdPipe) id: string, 
    @Body() comment: CreateCommentDto, 
  ) {
    return this.recipeService.addComment(id, comment); 
  }

}
