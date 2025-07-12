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
      url:
        process.env.MYSQL_URL ||
        'mysql://root:password@localhost:3306/recipe_db',
      entities: [Recipe],
      synchronize: process.env.NODE_ENV !== 'production',
      ssl:
        process.env.RAILWAY_ENVIRONMENT === 'production'
          ? { rejectUnauthorized: false }
          : false,
    }),
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
