import { createParamDecorator } from '@nestjs/common';
import { JwtValidateResponseDto } from 'src/authentication/dto';

export const JwtUser = createParamDecorator(
  (_, req) => req.args[0].user as JwtValidateResponseDto,
);
