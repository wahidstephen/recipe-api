import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { RECIPE_ERROR_MESSAGES } from '../../recipes/constants/recipe.constants';

/**
 * Custom validation pipe for recipe creation
 * Provides intelligent error messages showing only missing or invalid fields
 */
export class RecipeValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      exceptionFactory: (errors) => {
        // Extract missing fields from validation errors
        const missingFields = errors
          .filter(
            (error) =>
              error.constraints?.isNotEmpty || error.constraints?.isDefined,
          )
          .map((error) => error.property);

        // If no specific missing fields found, extract all fields with errors
        const fieldsWithErrors =
          missingFields.length > 0
            ? missingFields
            : errors.map((error) => error.property);

        return new BadRequestException({
          message: RECIPE_ERROR_MESSAGES.CREATION_FAILED,
          required: fieldsWithErrors.join(', '),
        });
      },
    });
  }
}
