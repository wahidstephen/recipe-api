import 'reflect-metadata';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Transform, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  MYSQL_URL: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  PORT?: number = 3000;

  @IsOptional()
  @IsString()
  RAILWAY_ENVIRONMENT?: string = 'development';
}

export function validateEnvironment(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => Object.values(error.constraints || {}))
      .flat();

    throw new Error(
      `❌ Environment validation failed:\n\n${errorMessages.map((msg) => `  • ${msg}`).join('\n')}\n\nPlease ensure all required environment variables are set.`,
    );
  }

  return validatedConfig;
}
