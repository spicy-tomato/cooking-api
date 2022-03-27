import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TypeHelper } from '../helpers';

@Injectable()
export class ToNumberPipe implements PipeTransform {
  transform(value: any): number {
    const parseNumber = parseInt(value);
    if (TypeHelper.isNumber(parseNumber)) {
      return parseNumber;
    }
    throw new BadRequestException();
  }
}
