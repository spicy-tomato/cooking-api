import { createParamDecorator } from '@nestjs/common';
import { JwtValidateResponseDto } from 'src/authentication/dto';

export const AuthUser = createParamDecorator(
  (_, req) => req.args[0].user as JwtValidateResponseDto,
);
