import { ApiProperty } from '@nestjs/swagger';
import { Recipe } from './recipe.entity';

/**
 * Base response DTO for operations that return a single recipe
 */
export class RecipeResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Recipe details by id',
  })
  message: string;

  @ApiProperty({
    description: 'Recipe data',
    type: [Recipe],
    example: [
      {
        id: 1,
        title: 'Chicken Curry',
        making_time: '45 min',
        serves: '4 people',
        ingredients: 'onion, chicken, seasoning',
        cost: 1000,
        created_at: '2016-01-11T13:30:13.000Z',
        updated_at: '2016-01-11T13:30:13.000Z',
      },
    ],
  })
  recipe: Recipe[];
}

/**
 * Response DTO for operations that return multiple recipes
 */
export class RecipesResponseDto {
  @ApiProperty({
    description: 'List of recipes',
    type: [Recipe],
    example: [
      {
        id: 1,
        title: 'Chicken Curry',
        making_time: '45 min',
        serves: '4 people',
        ingredients: 'onion, chicken, seasoning',
        cost: 1000,
        created_at: '2016-01-11T13:30:13.000Z',
        updated_at: '2016-01-11T13:30:13.000Z',
      },
      {
        id: 2,
        title: 'Rice Omelette',
        making_time: '30 min',
        serves: '2 people',
        ingredients: 'onion, egg, seasoning, soy sauce',
        cost: 700,
        created_at: '2016-01-11T13:30:13.000Z',
        updated_at: '2016-01-11T13:30:13.000Z',
      },
    ],
  })
  recipes: Recipe[];
}

/**
 * Response DTO for operations that only return a message
 */
export class MessageResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Recipe successfully removed!',
  })
  message: string;
}

/**
 * Error response DTO
 */
export class ErrorResponseDto {
  @ApiProperty({
    description: 'Error message',
    example: 'Recipe creation failed!',
  })
  message: string;

  @ApiProperty({
    description: 'Required fields that are missing',
    example: 'title, making_time, serves',
    required: false,
  })
  required?: string;
}
