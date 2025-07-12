import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';

/**
 * DTO for updating a recipe
 * Makes all CreateRecipeDto fields optional using PartialType
 */
export class UpdateRecipeDto extends PartialType<CreateRecipeDto>(
  CreateRecipeDto,
) {}
