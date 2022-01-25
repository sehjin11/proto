import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Admin } from './admin.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository,
  ) {
    super({
      secretOrKey: 'secret123123',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { adminname } = payload;
    const admin: Admin = await this.adminRepository.findOne({ adminname });

    if (!admin) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
    return admin;
  }
}
