import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

/**
 * Base recipe DTO with common validation rules
 */
export abstract class BaseRecipeDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly making_time: string;

  @IsString()
  @IsNotEmpty()
  readonly serves: string;

  @IsString()
  @IsNotEmpty()
  readonly ingredients: string;

  @IsNumber()
  @IsPositive()
  readonly cost: number;
}
