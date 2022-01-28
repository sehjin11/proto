import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userid: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
