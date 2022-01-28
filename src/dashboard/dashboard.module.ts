import {
  StatusInfoRepository,
  StepInfoRepository,
  TakeMedsRepository,
  UsersRepository,
} from './../repositories/projects.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ProjectsRepository } from 'src/repositories/projects.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectsRepository,
      UsersRepository,
      TakeMedsRepository,
      StepInfoRepository,
      StatusInfoRepository,
    ]),
  ],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
