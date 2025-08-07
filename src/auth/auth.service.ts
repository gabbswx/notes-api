import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // chequea si el user existe y si la contraseña es la correcta
  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) return user;
    return null;
  }
  
  // genera el token con el id y username
  login(user: { id: number; name: string }) {
    const payload = { username: user.name, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  // crea un nuevo user
  async register(username: string, password: string) {
    return this.userService.createUser(username, password);
  }
}
