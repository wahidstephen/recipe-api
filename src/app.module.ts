import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { RecipesModule } from './recipes/recipes.module';
import { Recipe } from './recipes/models/recipe.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'recipe_db',
      entities: [Recipe],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
