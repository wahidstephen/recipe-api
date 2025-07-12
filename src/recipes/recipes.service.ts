import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe, CreateRecipeDto, UpdateRecipeDto } from './models';
import { RECIPE_ERROR_MESSAGES } from './constants/recipe.constants';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  /**
   * Create a new recipe
   * @param createRecipeDto Recipe data
   * @returns Created recipe
   */
  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const recipe = this.recipeRepository.create(createRecipeDto);
    return await this.recipeRepository.save(recipe);
  }

  /**
   * Get all recipes
   * @returns Array of all recipes
   */
  async getAllRecipes(): Promise<Recipe[]> {
    return await this.recipeRepository.find();
  }

  /**
   * Get a recipe by ID
   * @param id Recipe ID
   * @returns Recipe if found
   * @throws NotFoundException if recipe not found
   */
  async getRecipeById(id: number): Promise<Recipe> {
    const recipe = await this.findRecipeById(id);
    return recipe;
  }

  /**
   * Update a recipe by ID
   * @param id Recipe ID
   * @param updateRecipeDto Updated recipe data
   * @returns Updated recipe
   * @throws NotFoundException if recipe not found
   */
  async updateRecipe(
    id: number,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    const recipe = await this.findRecipeById(id);
    Object.assign(recipe, updateRecipeDto);
    return await this.recipeRepository.save(recipe);
  }

  /**
   * Delete a recipe by ID
   * @param id Recipe ID
   * @returns Deleted recipe
   * @throws NotFoundException if recipe not found
   */
  async deleteRecipe(id: number): Promise<Recipe> {
    const recipe = await this.findRecipeById(id);
    await this.recipeRepository.remove(recipe);
    return recipe;
  }

  /**
   * Private helper method to find recipe by ID and throw consistent error
   * @param id Recipe ID
   * @returns Recipe if found
   * @throws NotFoundException if recipe not found
   */
  private async findRecipeById(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: { id },
    });
    if (!recipe) {
      throw new NotFoundException(RECIPE_ERROR_MESSAGES.NOT_FOUND);
    }
    return recipe;
  }
}
