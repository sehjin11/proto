import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { typeORMconfig } from './configs/typeorm.config';

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forRoot(typeORMconfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}