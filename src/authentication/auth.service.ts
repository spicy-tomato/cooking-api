import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StringHelper } from 'src/common/helpers';
import { AccountService } from 'src/models/account/account.service';
import { JwtPayload } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.accountService.findOne(username);
    if (user && StringHelper.getMd5(password) === user.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(account: any) {
    console.log('payload', account);
    const payload: JwtPayload = { username: account.username, sub: account.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
