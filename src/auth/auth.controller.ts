import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import Response from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<object> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/login')
  signIn(
    @Body() authCredentialDto: AuthCredentialDto,
    @Res() response,
  ): Promise<object> {
    const cookie = this.authService.signIn(authCredentialDto);
    response.setHeader('Set-Cookie', cookie);
    return response.send();
  }

  @Get('/is-login')
  isLogin(@Res() res) {
    res.succes({
      userId: '123',
      username: '123',
      updateDate: '21.10.10',
    });
  }
}
