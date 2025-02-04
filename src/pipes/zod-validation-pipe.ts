import {
  PipeTransform,
  BadRequestException
} from '@nestjs/common'
import { ZodError, ZodObject } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown){
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError){
        throw new BadRequestException({errors: error.format(), message: 'Validation failed', statusCode: 400})
      }

      throw new BadRequestException('Validation failed')
    }
    return value
  }
}