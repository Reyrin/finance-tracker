import { UnauthorizedException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);

    if (!user)
      throw new UnauthorizedException('Username or password are incorrect');

    const passwordIsMatch = await argon2.verify(user.password, password);

    if (!passwordIsMatch)
      throw new UnauthorizedException('Username or password are incorrect');

    return user;
  }

  async login(user: User) {
    const { id, email } = user;

    const token = this.jwtService.sign({ id, email });

    return { user: { id, email }, token };
  }

  async getUser({ email }: User) {
    const user = await this.userService.findOne(email);

    if (!user)
      throw new UnauthorizedException('Username or password are incorrect');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = user;

    return { user: data };
  }
}
