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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import {
  CreateRecipeDto,
  UpdateRecipeDto,
  RecipesResponseDto,
  RecipeResponseDto,
  MessageResponseDto,
  ErrorResponseDto,
} from './models';
import { RECIPE_SUCCESS_MESSAGES } from './constants/recipe.constants';
import { RecipeValidationPipe } from './pipes/recipe-validation.pipe';
import { RecipeValidationExceptionFilter } from './filters/recipe-validation-exception.filter';

@ApiTags('recipes')
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
  @ApiOperation({ summary: 'Create a new recipe' })
  @ApiBody({ type: CreateRecipeDto })
  @ApiResponse({
    status: 200,
    description: 'Recipe created successfully',
    type: RecipeResponseDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Recipe creation failed due to validation errors',
    type: ErrorResponseDto,
  })
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
  @ApiOperation({ summary: 'Get all recipes' })
  @ApiResponse({
    status: 200,
    description: 'List of all recipes',
    type: RecipesResponseDto,
  })
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
  @ApiOperation({ summary: 'Get a recipe by ID' })
  @ApiParam({
    name: 'id',
    description: 'Recipe ID',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Recipe found',
    type: RecipeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Recipe not found',
  })
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
  @ApiOperation({ summary: 'Update a recipe by ID' })
  @ApiParam({
    name: 'id',
    description: 'Recipe ID',
    type: Number,
    example: 1,
  })
  @ApiBody({ type: UpdateRecipeDto })
  @ApiResponse({
    status: 200,
    description: 'Recipe updated successfully',
    type: RecipeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Recipe not found',
  })
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
  @ApiOperation({ summary: 'Delete a recipe by ID' })
  @ApiParam({
    name: 'id',
    description: 'Recipe ID',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Recipe deleted successfully',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Recipe not found',
  })
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
  @ApiOperation({ summary: 'Admin test endpoint for smoke testing' })
  @ApiResponse({
    status: 200,
    description: 'API is working',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'The API is working!',
        },
      },
    },
  })
  testRecipes(): { message: string } {
    return { message: RECIPE_SUCCESS_MESSAGES.API_WORKING };
  }
}
