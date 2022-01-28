import { UsersRepository } from './../repositories/projects.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsRepository } from 'src/repositories/projects.repository';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(ProjectsRepository)
    private projectsRepository: ProjectsRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async getProjectInfo(projectId: string) {
    const data = await this.projectsRepository.findOne({ projectId });
    return data;
  }

  async getReport(projectId: string) {
    const project = await this.getProjectInfo(projectId);
    const userNum = await this.usersRepository.count({ projectId });
    const rs = {
      name: project.projectPurpose,
      pmm: project.projectSite,
      member: userNum,
    };
    console.log(rs);
    return rs;
  }

  async getProject(projectId: string) {
    const data = await this.getProjectInfo(projectId);
    const userNum = await this.usersRepository.count({ projectId });
    const rs = {
      name: data.projectPurpose,
      term: {
        start: data.startDate,
        end: data.endDate,
      },
      code: data.projectCode,
      volunteer: userNum,
      purpose: data.projectPurpose,
    };
    return rs;
  }
}
