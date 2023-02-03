import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @IsNotEmpty()
    user_name: string;
}
