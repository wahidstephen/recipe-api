/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

interface ErrorResponse {
  message: string;
  required?: string;
}

interface RecipeResponse {
  message: string;
  recipe?: Array<{
    id: number;
    title: string;
    making_time: string;
    serves: string;
    ingredients: string;
    cost: number;
    created_at: string;
    updated_at: string;
  }>;
}

interface RecipesListResponse {
  recipes: Array<{
    id: number;
    title: string;
    making_time: string;
    serves: string;
    ingredients: string;
    cost: number;
    created_at: string;
    updated_at: string;
  }>;
}

interface TestResponse {
  message: string;
}

describe('Recipe API E2E Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableCors();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('API server', () => {
    it('should return 404 for root URL', () => {
      return request(app.getHttpServer()).get('/').expect(404);
    });
  });

  describe('POST /recipes', () => {
    it('should fail without required parameters', () => {
      const recipe = {};
      return request(app.getHttpServer())
        .post('/recipes')
        .send(recipe)
        .expect(200)
        .expect((res) => {
          const body = res.body as ErrorResponse;
          expect(body.message).toBe('Recipe creation failed!');
          expect(body.required).toContain('title');
          expect(body.required).toContain('making_time');
          expect(body.required).toContain('serves');
          expect(body.required).toContain('ingredients');
        });
    });

    it('should create a recipe', () => {
      const recipe = {
        title: 'Tomato Soup',
        making_time: '15 min',
        serves: '5 people',
        ingredients: 'onion, tomato, seasoning, water',
        cost: 450,
      };
      return request(app.getHttpServer())
        .post('/recipes')
        .send(recipe)
        .expect(200)
        .expect((res) => {
          const body = res.body as RecipeResponse;
          expect(body.message).toBe('Recipe successfully created!');
          expect(body.recipe).toBeDefined();
          expect(Array.isArray(body.recipe)).toBe(true);
          expect(body.recipe?.length).toBe(1);
        });
    });
  });

  describe('GET /recipes', () => {
    it('should get all recipes', () => {
      return request(app.getHttpServer())
        .get('/recipes')
        .expect(200)
        .expect((res) => {
          const body = res.body as RecipesListResponse;
          expect(body.recipes).toBeDefined();
          expect(Array.isArray(body.recipes)).toBe(true);
          expect(body.recipes.length).toBeGreaterThan(0);
        });
    });
  });

  describe('GET /recipes/:id', () => {
    it('should get a recipe by ID', () => {
      const targetId = 2;
      return request(app.getHttpServer())
        .get(`/recipes/${targetId}`)
        .expect(200)
        .expect((res) => {
          const body = res.body as RecipeResponse;
          expect(body.message).toBe('Recipe details by id');
          expect(body.recipe).toBeDefined();
          expect(Array.isArray(body.recipe)).toBe(true);
          expect(body.recipe?.length).toBe(1);
        });
    });

    it('should return 404 for non-existent recipe', () => {
      return request(app.getHttpServer()).get('/recipes/999').expect(404);
    });
  });

  describe('PATCH /recipes/:id', () => {
    it('should update a recipe', () => {
      const recipe = {
        title: 'Updated Recipe',
        cost: 600,
      };
      return request(app.getHttpServer())
        .patch('/recipes/2')
        .send(recipe)
        .expect(200)
        .expect((res) => {
          const body = res.body as RecipeResponse;
          expect(body.message).toBe('Recipe successfully updated!');
          expect(body.recipe).toBeDefined();
          expect(body.recipe?.[0]?.title).toBe('Updated Recipe');
          expect(body.recipe?.[0]?.cost).toBe(600);
        });
    });

    it('should return 404 for non-existent recipe', () => {
      return request(app.getHttpServer())
        .patch('/recipes/999')
        .send({ title: 'Test' })
        .expect(404);
    });
  });

  describe('DELETE /recipes/:id', () => {
    it('should delete a recipe', () => {
      return request(app.getHttpServer())
        .delete('/recipes/12')
        .expect(200)
        .expect((res) => {
          const body = res.body as TestResponse;
          expect(body.message).toBe('Recipe successfully removed!');
        });
    });

    it('should return 404 for non-existent recipe', () => {
      return request(app.getHttpServer()).delete('/recipes/999').expect(404);
    });
  });

  describe('Admin test', () => {
    it('should return test message', () => {
      return request(app.getHttpServer())
        .get('/recipes/admin/test')
        .expect(200)
        .expect((res) => {
          const body = res.body as TestResponse;
          expect(body.message).toBe('Recipes API is working!');
        });
    });
  });
});
