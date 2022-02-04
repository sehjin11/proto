import { UsersRepository } from './../repositories/projects.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsRepository } from 'src/repositories/projects.repository';
import { getManager, getRepository } from 'typeorm';
import { Users } from 'src/entities/projects.entity';
@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(ProjectsRepository)
    private projectsRepository: ProjectsRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  getDayOfWeek(date) {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[new Date(date).getDay()];
    return dayOfWeek;
  }

  async getUsersNum(projectCode: string) {
    const activated = true;
    const usersNum = await this.usersRepository.count({
      projectCode,
      activated,
    });
    return usersNum;
  }

  async getProjectInfo(projectCode: string) {
    const data = await this.projectsRepository.findOne({ projectCode });
    return data;
  }

  async getReport(projectCode: string) {
    const project = await this.getProjectInfo(projectCode);
    const userNum = await this.getUsersNum(projectCode);

    const res = {
      name: project.projectPurpose,
      pmm: project.projectSite,
      member: userNum,
    };
    console.log(res);
    return res;
  }

  async getProject(projectCode: string) {
    const data = await this.getProjectInfo(projectCode);

    const userNum = await this.getUsersNum(projectCode);
    const res = {
      name: data.projectPurpose,
      term: {
        start: data.startDate,
        end: data.endDate,
      },
      code: data.projectCode,
      volunteer: userNum,
      purpose: data.projectPurpose,
    };
    return res;
  }

  async getWeeklyWalkingCount(endDate: Date, projectCode: string) {
    const entityManager = getManager();
    console.log('projectCode: ', projectCode);
    console.log('endDate : ', endDate);

    const d = endDate.toString().split('.');
    console.log(d[0], d[1], d[2]);

    const usersNum = await this.getUsersNum(projectCode);
    const data = [];

    for (let i = 1; i <= 7; i++) {
      const date = new Date(
        parseInt(d[0]),
        parseInt(d[1]) - 1,
        parseInt(d[2]) - i,
      );
      const theDate = date.toISOString().substring(0, 10);
      const dayOfWeek = this.getDayOfWeek(date);
      const someQuery =
        await entityManager.query(`select sum(s."stepCount") from (select u."watchSN" from users fa cross join unnest(fa."watchSN") u("watchSN") where fa."projectCode" = '${projectCode}' and fa."activated"=true) as u
      join step_info s on s."watchSN" = u."watchSN" where s."stepDate" >= date '${theDate}' and s."stepDate" < date '${theDate}'+ integer '1'`); //해당 날 워치별 총합

      const sum = someQuery[0]['sum'];

      let stepAvg = Math.floor(parseInt(sum) / usersNum);
      if (!stepAvg) {
        stepAvg = 0;
      }
      const result = {
        x: theDate.substring(5) + ' (' + dayOfWeek + ')',
        y: stepAvg,
      };
      data.unshift(result);
    }
    console.log(data);

    const rs = {
      status: 200,
      data: data,
    };

    return rs;
  }

  async getWeeklyTakingMedicine(endDate: Date, projectCode: string) {
    const entityManager = getManager();

    const d = endDate.toString().split('.');
    console.log(d[0], d[1], d[2]);

    const usersNum = await this.getUsersNum(projectCode);
    const data = [];

    for (let i = 1; i <= 7; i++) {
      const date = new Date(
        parseInt(d[0]),
        parseInt(d[1]) - 1,
        parseInt(d[2]) - i,
      );
      const theDate = date.toISOString().substring(0, 10);
      const dayOfWeek = this.getDayOfWeek(date);
      const someQuery =
        await entityManager.query(`select count(med."No") from (select u."watchSN" from users fa cross join unnest(fa."watchSN") u("watchSN") where fa."projectCode" = '${projectCode}' and fa."activated"=true) as u
        join take_meds med on med."watchSN" = u."watchSN" where med."reportTime" >= date '${theDate}' and med."reportTime" < date '${theDate}'+ integer '1' and med."takenMeds" = true`); //해당 날 워치별 총합

      console.log(someQuery);

      const count = someQuery[0]['count'];

      let stepAvg = parseInt(count) / usersNum;
      if (!stepAvg) {
        stepAvg = 0;
      }
      const result = {
        x: theDate.substring(5) + ' (' + dayOfWeek + ')',
        y: stepAvg,
      };
      data.unshift(result);
    }
    console.log(data);

    const rs = {
      status: 200,
      data: data,
    };

    return rs;
  }
}
