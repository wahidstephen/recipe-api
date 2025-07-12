import { Recipe } from './recipe.entity';

/**
 * Base response DTO for operations that return a single recipe
 */
export class RecipeResponseDto {
  message: string;
  recipe: Recipe[];
}

/**
 * Response DTO for operations that return multiple recipes
 */
export class RecipesResponseDto {
  recipes: Recipe[];
}

/**
 * Response DTO for operations that only return a message
 */
export class MessageResponseDto {
  message: string;
}

/**
 * Error response DTO
 */
export class ErrorResponseDto {
  message: string;
  required?: string;
}
