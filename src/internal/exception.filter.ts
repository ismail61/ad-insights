import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
export interface APIError {
  message: string;
  code: number;
  errors?: any[];
}
export class APIException extends HttpException {
  public httpStatus: number;
  public code: string;
  public errors: any[];

  constructor(message: string, httpStatus?: number, errors?: any[]) {
    // Calling parent constructor of base Exception class.
    super(message, httpStatus);
    this.name = APIException.name;
    this.httpStatus = httpStatus || HttpStatus.INTERNAL_SERVER_ERROR;
    this.errors = errors;
  }
}

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse<Response>();
    let errorObj: APIError;

    if (exception instanceof APIException) {
      // application specific errors
      errorObj = {
        message: exception.message,
        code: (exception as { httpStatus: number }).httpStatus,
        ...(exception.errors && { errors: exception.errors }),
      };
    } else if (exception instanceof Error) {
      errorObj = {
        message:
          (exception as any).response?.message?.[0] || 'Internal Server Error',
        code: (exception as any).response?.statusCode || 500,
        ...((exception as any).response?.message?.length > 1 && {
          errors: (exception as any).response.message,
        }),
      };
    }

    res
      .status(errorObj.code || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ errorObj });
  }
}
