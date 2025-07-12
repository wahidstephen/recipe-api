import { PartialType } from '@nestjs/swagger';
import { CreateRecipeDto } from './create-recipe.dto';

/**
 * DTO for updating a recipe
 * Makes all CreateRecipeDto fields optional using PartialType
 */
export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {}
