import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from './models';
import { RecipeTestUtils } from './testing/recipe-test.utils';
import { RECIPE_ERROR_MESSAGES } from './constants/recipe.constants';

describe('RecipesService', () => {
  let service: RecipesService;
  const mockRecipe = RecipeTestUtils.createMockRecipe();
  const mockRepository = RecipeTestUtils.createMockRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesService,
        {
          provide: getRepositoryToken(Recipe),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRecipe', () => {
    it('should create a new recipe', async () => {
      const createRecipeDto = RecipeTestUtils.createMockCreateRecipeDto();

      mockRepository.create.mockReturnValue(mockRecipe);
      mockRepository.save.mockResolvedValue(mockRecipe);

      const actualResult = await service.createRecipe(createRecipeDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createRecipeDto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockRecipe);
      expect(actualResult).toBe(mockRecipe);
    });
  });

  describe('getAllRecipes', () => {
    it('should return all recipes', async () => {
      const expectedRecipes = [mockRecipe];
      mockRepository.find.mockResolvedValue(expectedRecipes);

      const actualResult = await service.getAllRecipes();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(actualResult).toBe(expectedRecipes);
    });
  });

  describe('getRecipeById', () => {
    it('should return a recipe by ID', async () => {
      const inputId = 1;
      mockRepository.findOne.mockResolvedValue(mockRecipe);

      const actualResult = await service.getRecipeById(inputId);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: inputId },
      });
      expect(actualResult).toBe(mockRecipe);
    });

    it('should throw NotFoundException when recipe does not exist', async () => {
      const inputId = 999;
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.getRecipeById(inputId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getRecipeById(inputId)).rejects.toThrow(
        RECIPE_ERROR_MESSAGES.NOT_FOUND,
      );
    });
  });

  describe('updateRecipe', () => {
    it('should update an existing recipe', async () => {
      const inputId = 1;
      const updateRecipeDto = RecipeTestUtils.createMockUpdateRecipeDto();
      const updatedRecipe = { ...mockRecipe, ...updateRecipeDto };

      mockRepository.findOne.mockResolvedValue(mockRecipe);
      mockRepository.save.mockResolvedValue(updatedRecipe);

      const actualResult = await service.updateRecipe(inputId, updateRecipeDto);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: inputId },
      });
      expect(mockRepository.save).toHaveBeenCalled();
      expect(actualResult).toBe(updatedRecipe);
    });

    it('should throw NotFoundException when recipe does not exist', async () => {
      const inputId = 999;
      const updateRecipeDto = RecipeTestUtils.createMockUpdateRecipeDto();
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.updateRecipe(inputId, updateRecipeDto),
      ).rejects.toThrow(NotFoundException);
      await expect(
        service.updateRecipe(inputId, updateRecipeDto),
      ).rejects.toThrow(RECIPE_ERROR_MESSAGES.NOT_FOUND);
    });
  });

  describe('deleteRecipe', () => {
    it('should delete an existing recipe', async () => {
      const inputId = 1;
      mockRepository.findOne.mockResolvedValue(mockRecipe);
      mockRepository.remove.mockResolvedValue(mockRecipe);

      const actualResult = await service.deleteRecipe(inputId);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: inputId },
      });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockRecipe);
      expect(actualResult).toBe(mockRecipe);
    });

    it('should throw NotFoundException when recipe does not exist', async () => {
      const inputId = 999;
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteRecipe(inputId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.deleteRecipe(inputId)).rejects.toThrow(
        RECIPE_ERROR_MESSAGES.NOT_FOUND,
      );
    });
  });
});
