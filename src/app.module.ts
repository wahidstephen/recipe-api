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
      url: process.env.DATABASE_URL || process.env.MYSQL_URL,
      host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.MYSQLPORT || process.env.DB_PORT || '3306'),
      username: process.env.MYSQLUSER || process.env.DB_USERNAME || 'root',
      password:
        process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || 'password',
      database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'recipe_db',
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
