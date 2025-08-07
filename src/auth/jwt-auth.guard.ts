// esto sirve para proteger rutas que solo se usan si estas logueado
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {} // uso el guardia con el metodo jwt
