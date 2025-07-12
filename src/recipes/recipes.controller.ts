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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import {
  CreateRecipeDto,
  UpdateRecipeDto,
  RecipesResponseDto,
  RecipeResponseDto,
  ErrorResponseDto,
  MessageResponseDto,
} from './models';
import {
  RECIPE_ERROR_MESSAGES,
  RECIPE_SUCCESS_MESSAGES,
} from './constants/recipe.constants';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  /**
   * Create a new recipe
   * @param createRecipeDto Recipe data
   * @returns Created recipe response
   */
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<RecipeResponseDto> {
    try {
      const recipe = await this.recipesService.createRecipe(createRecipeDto);
      return {
        message: RECIPE_SUCCESS_MESSAGES.CREATED,
        recipe: [recipe],
      };
    } catch (error) {
      // Only catch unexpected errors, let validation errors bubble up
      if (error instanceof Error && error.message.includes('validation')) {
        throw error;
      }
      throw new HttpException(
        {
          message: RECIPE_ERROR_MESSAGES.CREATION_FAILED,
          required: RECIPE_ERROR_MESSAGES.VALIDATION_REQUIRED,
        } as ErrorResponseDto,
        HttpStatus.BAD_REQUEST,
      );
    }
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
