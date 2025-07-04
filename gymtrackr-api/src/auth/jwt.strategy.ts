import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //If false, expired tokens will be rejected automatically.
      secretOrKey: configService.get<string>('JWT_SECRET') || 'fallback-secret',

    });
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}





