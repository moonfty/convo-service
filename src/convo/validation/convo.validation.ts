import { ValidatorOptions, ValidationError } from 'class-validator';

export class ValidationPipeOptions {
  transform: true;
  disableErrorMessages?: true;
  whitelist: true;
  forbidNonWhitelisted: true;
  forbidUnknownValues: true;
}
