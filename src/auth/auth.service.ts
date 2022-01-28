import { AuthCredentialDto } from './dto/auth-credential.dto';
import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';
import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<object> {
    return this.adminRepository.createAdmin(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { userid: adminname, password } = authCredentialDto;
    const user = await this.adminRepository.findOne({ adminname });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { adminname };
      const accessToken = await this.jwtService.sign(payload);

      return `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age="3600"`;

      //return { accessToken };
      //   const Auth = {
      //     status: 'ok',
      //     response: {
      //       _token: { accessToken },
      //       userId: user.adminId,
      //       username: user.adminname,
      //       updateDate: '',
      //     },
      //   };
      //   return Auth;
    } else {
      throw new UnauthorizedException('login faile');
    }
  }
}
