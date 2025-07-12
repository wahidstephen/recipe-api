import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Base recipe DTO with common validation rules
 */
export abstract class BaseRecipeDto {
  @ApiProperty({
    description: 'Recipe title',
    example: 'Chicken Curry',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    description: 'Time required to make the recipe',
    example: '45 min',
  })
  @IsString()
  @IsNotEmpty()
  readonly making_time: string;

  @ApiProperty({
    description: 'Number of people the recipe serves',
    example: '4 people',
  })
  @IsString()
  @IsNotEmpty()
  readonly serves: string;

  @ApiProperty({
    description: 'List of ingredients',
    example: 'onion, chicken, seasoning',
  })
  @IsString()
  @IsNotEmpty()
  readonly ingredients: string;

  @ApiProperty({
    description: 'Cost of the recipe',
    example: 1000,
  })
  @IsNumber()
  @IsPositive()
  readonly cost: number;
}
