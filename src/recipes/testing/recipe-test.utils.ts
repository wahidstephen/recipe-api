import { Recipe, CreateRecipeDto, UpdateRecipeDto } from '../models';

/**
 * Test utilities for recipe testing
 */
export class RecipeTestUtils {
  /**
   * Creates a mock recipe for testing
   */
  static createMockRecipe(overrides: Partial<Recipe> = {}): Recipe {
    return {
      id: 1,
      title: 'Test Recipe',
      making_time: '30 min',
      serves: '4 people',
      ingredients: 'test ingredients',
      cost: 500,
      created_at: new Date('2023-01-01'),
      updated_at: new Date('2023-01-01'),
      ...overrides,
    };
  }

  /**
   * Creates a mock CreateRecipeDto for testing
   */
  static createMockCreateRecipeDto(
    overrides: Partial<CreateRecipeDto> = {},
  ): CreateRecipeDto {
    return {
      title: 'Test Recipe',
      making_time: '30 min',
      serves: '4 people',
      ingredients: 'test ingredients',
      cost: 500,
      ...overrides,
    };
  }

  /**
   * Creates a mock UpdateRecipeDto for testing
   */
  static createMockUpdateRecipeDto(
    overrides: Partial<UpdateRecipeDto> = {},
  ): UpdateRecipeDto {
    return {
      title: 'Updated Recipe',
      cost: 1500,
      ...overrides,
    };
  }

  /**
   * Creates a mock repository for testing
   */
  static createMockRepository() {
    return {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };
  }

  /**
   * Creates a mock service for testing
   */
  static createMockService(
    mockRecipe: Recipe = RecipeTestUtils.createMockRecipe(),
  ) {
    return {
      createRecipe: jest.fn().mockResolvedValue(mockRecipe),
      getAllRecipes: jest.fn().mockResolvedValue([mockRecipe]),
      getRecipeById: jest.fn().mockResolvedValue(mockRecipe),
      updateRecipe: jest.fn().mockResolvedValue(mockRecipe),
      deleteRecipe: jest.fn().mockResolvedValue(mockRecipe),
    };
  }
}
