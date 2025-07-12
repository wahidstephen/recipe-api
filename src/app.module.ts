import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { RecipesModule } from './recipes/recipes.module';
import { Recipe } from './recipes/models/recipe.entity';
import { validateEnvironment } from './config/environment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvironment,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.get<string>('MYSQL_URL'),
        entities: [Recipe],
        synchronize: true,
        ssl:
          configService.get<string>('RAILWAY_ENVIRONMENT') === 'production'
            ? { rejectUnauthorized: false }
            : false,
      }),
    }),
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
