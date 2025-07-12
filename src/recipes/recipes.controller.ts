import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
  HttpStatus,
  HttpCode,
  UseFilters,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import {
  CreateRecipeDto,
  UpdateRecipeDto,
  RecipesResponseDto,
  RecipeResponseDto,
  MessageResponseDto,
} from './models';
import { RECIPE_SUCCESS_MESSAGES } from './constants/recipe.constants';
import { RecipeValidationPipe } from './pipes/recipe-validation.pipe';
import { RecipeValidationExceptionFilter } from './filters/recipe-validation-exception.filter';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  /**
   * Create a new recipe
   * @param createRecipeDto Recipe data
   * @returns Created recipe response
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseFilters(RecipeValidationExceptionFilter)
  @UsePipes(RecipeValidationPipe)
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<RecipeResponseDto> {
    const recipe = await this.recipesService.createRecipe(createRecipeDto);
    return {
      message: RECIPE_SUCCESS_MESSAGES.CREATED,
      recipe: [recipe],
    };
  }

  /**
   * Get all recipes
   * @returns All recipes response
   */
  @Get()
  async getAllRecipes(): Promise<RecipesResponseDto> {
    const recipes = await this.recipesService.getAllRecipes();
    return { recipes };
  }

  /**
   * Get a recipe by ID
   * @param id Recipe ID
   * @returns Recipe response
   */
  @Get(':id')
  async getRecipeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RecipeResponseDto> {
    const recipe = await this.recipesService.getRecipeById(id);
    return {
      message: RECIPE_SUCCESS_MESSAGES.DETAILS,
      recipe: [recipe],
    };
  }

  /**
   * Update a recipe by ID
   * @param id Recipe ID
   * @param updateRecipeDto Updated recipe data
   * @returns Updated recipe response
   */
  @Patch(':id')
  @UsePipes(
    new ValidationPipe({ transform: true, skipMissingProperties: true }),
  )
  async updateRecipe(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Promise<RecipeResponseDto> {
    const recipe = await this.recipesService.updateRecipe(id, updateRecipeDto);
    return {
      message: RECIPE_SUCCESS_MESSAGES.UPDATED,
      recipe: [recipe],
    };
  }

  /**
   * Delete a recipe by ID
   * @param id Recipe ID
   * @returns Delete success message
   */
  @Delete(':id')
  async deleteRecipe(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MessageResponseDto> {
    await this.recipesService.deleteRecipe(id);
    return {
      message: RECIPE_SUCCESS_MESSAGES.DELETED,
    };
  }

  /**
   * Admin test endpoint for smoke testing
   * @returns Test response
   */
  @Get('admin/test')
  testRecipes(): { message: string } {
    return { message: RECIPE_SUCCESS_MESSAGES.API_WORKING };
  }
}
