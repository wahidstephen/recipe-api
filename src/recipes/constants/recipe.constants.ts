/**
 * Recipe-related constants
 */
export const RECIPE_ERROR_MESSAGES = {
  NOT_FOUND: 'No recipe found',
  CREATION_FAILED: 'Recipe creation failed!',
  VALIDATION_REQUIRED: 'title, making_time, serves, ingredients, cost',
} as const;

export const RECIPE_SUCCESS_MESSAGES = {
  CREATED: 'Recipe successfully created!',
  UPDATED: 'Recipe successfully updated!',
  DELETED: 'Recipe successfully removed!',
  DETAILS: 'Recipe details by id',
  API_WORKING: 'Recipes API is working!',
} as const;
