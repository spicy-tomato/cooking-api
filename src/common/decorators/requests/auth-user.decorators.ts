import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { JwtValidateResponseDto } from 'src/authentication/dto';

type Loc = 'body' | 'params' | 'query';

export const AuthUser = createParamDecorator(
  (args: { loc: Loc; key: string }, req) => {
    const request = req.args[0];
    const idAccount = request[args.loc][args.key];
    const jwtUser = request.user as JwtValidateResponseDto;

    if (`${jwtUser.userId}` !== `${idAccount}`) {
      throw new UnauthorizedException();
    }
    return idAccount;
  },
);
