import { AuthCredentialDto } from './dto/auth-credential.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  async createAdmin(authCredentialDto: AuthCredentialDto): Promise<object> {
    const { name: adminname, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(password, salt);

    const admin = this.create({ adminname, password: hashedPW });
    try {
      await this.save(admin);
      return { message: '등록되었습니다.' };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing username.');
      } else {
        throw new InternalServerErrorException();
        console.log('user 생성 에러 : ', error);
      }
    }
  }
}
