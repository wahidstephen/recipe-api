/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { RecipeTestUtils } from './testing/recipe-test.utils';
import {
  RECIPE_SUCCESS_MESSAGES,
  RECIPE_ERROR_MESSAGES,
} from './constants/recipe.constants';

describe('RecipesController', () => {
  let controller: RecipesController;
  let service: RecipesService;

  const mockRecipe = RecipeTestUtils.createMockRecipe();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipesController],
      providers: [
        {
          provide: RecipesService,
          useValue: RecipeTestUtils.createMockService(mockRecipe),
        },
      ],
    }).compile();

    controller = module.get<RecipesController>(RecipesController);
    service = module.get<RecipesService>(RecipesService);
  });

  describe('createRecipe', () => {
    it('should create a recipe and return success response', async () => {
      const createRecipeDto = RecipeTestUtils.createMockCreateRecipeDto();

      const result = await controller.createRecipe(createRecipeDto);

      expect(service.createRecipe).toHaveBeenCalledWith(createRecipeDto);
      expect(result).toEqual({
        message: RECIPE_SUCCESS_MESSAGES.CREATED,
        recipe: [mockRecipe],
      });
    });
  });

  describe('getAllRecipes', () => {
    it('should return all recipes', async () => {
      const result = await controller.getAllRecipes();

      expect(service.getAllRecipes).toHaveBeenCalled();
      expect(result).toEqual({ recipes: [mockRecipe] });
    });
  });

  describe('getRecipeById', () => {
    it('should return a recipe by ID', async () => {
      const inputId = 1;

      const result = await controller.getRecipeById(inputId);

      expect(service.getRecipeById).toHaveBeenCalledWith(inputId);
      expect(result).toEqual({
        message: RECIPE_SUCCESS_MESSAGES.DETAILS,
        recipe: [mockRecipe],
      });
    });

    it('should throw NotFoundException when recipe does not exist', async () => {
      const inputId = 999;
      jest
        .spyOn(service, 'getRecipeById')
        .mockRejectedValue(
          new NotFoundException(RECIPE_ERROR_MESSAGES.NOT_FOUND),
        );

      await expect(controller.getRecipeById(inputId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateRecipe', () => {
    it('should update a recipe and return success response', async () => {
      const inputId = 1;
      const updateRecipeDto = RecipeTestUtils.createMockUpdateRecipeDto();
      const updatedRecipe = { ...mockRecipe, ...updateRecipeDto };
      jest.spyOn(service, 'updateRecipe').mockResolvedValue(updatedRecipe);

      const result = await controller.updateRecipe(inputId, updateRecipeDto);

      expect(service.updateRecipe).toHaveBeenCalledWith(
        inputId,
        updateRecipeDto,
      );
      expect(result).toEqual({
        message: RECIPE_SUCCESS_MESSAGES.UPDATED,
        recipe: [updatedRecipe],
      });
    });

    it('should throw NotFoundException when recipe does not exist', async () => {
      const inputId = 999;
      const updateRecipeDto = RecipeTestUtils.createMockUpdateRecipeDto();
      jest
        .spyOn(service, 'updateRecipe')
        .mockRejectedValue(
          new NotFoundException(RECIPE_ERROR_MESSAGES.NOT_FOUND),
        );

      await expect(
        controller.updateRecipe(inputId, updateRecipeDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteRecipe', () => {
    it('should delete a recipe and return success response', async () => {
      const inputId = 1;

      const result = await controller.deleteRecipe(inputId);

      expect(service.deleteRecipe).toHaveBeenCalledWith(inputId);
      expect(result).toEqual({
        message: RECIPE_SUCCESS_MESSAGES.DELETED,
      });
    });

    it('should throw NotFoundException when recipe does not exist', async () => {
      const inputId = 999;
      jest
        .spyOn(service, 'deleteRecipe')
        .mockRejectedValue(
          new NotFoundException(RECIPE_ERROR_MESSAGES.NOT_FOUND),
        );

      await expect(controller.deleteRecipe(inputId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('testRecipes', () => {
    it('should return test response', () => {
      const result = controller.testRecipes();

      expect(result).toEqual({
        message: RECIPE_SUCCESS_MESSAGES.API_WORKING,
      });
    });
  });
});
