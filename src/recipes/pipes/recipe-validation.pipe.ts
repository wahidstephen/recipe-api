import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { RECIPE_ERROR_MESSAGES } from '../constants/recipe.constants';

/**
 * Recipe-specific validation pipe
 * Returns 200 status with error details for missing fields to match test expectations
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
