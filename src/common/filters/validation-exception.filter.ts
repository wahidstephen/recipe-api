import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Injectable,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponseDto } from '../../recipes/models';

/**
 * Custom exception filter for validation errors
 * Converts BadRequestException (400) to successful response (200) with error details
 */
@Injectable()
@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse() as ErrorResponseDto;

    response.status(HttpStatus.OK).json(exceptionResponse);
  }
}
