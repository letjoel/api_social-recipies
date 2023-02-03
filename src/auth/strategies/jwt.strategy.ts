import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { jwtConstants } from "../constants/jwt.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

//   async validate(payload: any) {
//     return { userId: payload.id, user_name: payload.user_name };

    async validate(payload: any): Promise<any> {
    if (!payload) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return payload;
  }
  }