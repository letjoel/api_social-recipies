import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from './constants/jwt.constants';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy  } from "./strategies/jwt.strategy";
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports:[
    MongooseModule.forFeature([
      { 
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1440h' },
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard]
})
export class AuthModule {}
