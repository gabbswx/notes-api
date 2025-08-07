import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // agarra el token desde el header
      ignoreExpiration: false, // no deja usar tokens expirados
      secretOrKey: 'secret', // la clave con la q se firmo el token
    });
  }

  validate(payload: any) {
    console.log('JWT payload:', payload); // debug
    return { userId: payload.sub, username: payload.username }; // devuelve los datos del user
    // si devuelve null/undefined, causará 401
  }
}
