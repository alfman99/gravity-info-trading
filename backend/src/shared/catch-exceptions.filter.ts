import { Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let handledException = exception;
    if (exception.status === 401) {
      handledException = new UnauthorizedException();
    }
    super.catch(handledException, host);
  }
}
