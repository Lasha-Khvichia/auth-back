import { IsEmail, IsString, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$/, {
    message:
      'Password must minimum contain: 1 number, 1 symbol, 1 uppercase letter, 1 lowercase letter and also 6 characters',
  })
  password: string;

  @IsString()
  @Matches(/^(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$/, {
    message:
      'Password must minimum contain: 1 number, 1 symbol, 1 uppercase letter, 1 lowercase letter and also 6 characters',
  })
  confirmPassword: string;
}

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  @Matches(/^(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$/, {
    message:
      'Password must minimum contain: 1 number, 1 symbol, 1 uppercase letter, 1 lowercase letter and also 6 characters',
  })
  password: string;
}
