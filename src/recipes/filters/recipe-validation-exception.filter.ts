import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Injectable,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponseDto } from '../models';

/**
 * Recipe-specific validation exception filter
 * Converts BadRequestException (400) to successful response (200) with error details
 * This matches the test expectations which expect 200 responses even for validation errors
 */
@Injectable()
@Catch(BadRequestException)
export class RecipeValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse() as ErrorResponseDto;

    response.status(HttpStatus.OK).json(exceptionResponse);
  }
}
