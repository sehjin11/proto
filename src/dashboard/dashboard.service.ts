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

  //날짜 요일 구하기(그래프)
  getDayOfWeek(date) {
    const week = ['토', '일', '월', '화', '수', '목', '금'];
    const dayOfWeek = week[new Date(date).getDay()];
    return dayOfWeek;
  }

  //현재 프로젝트 참여 인원(activated)
  async getUsersNum(projectCode: string) {
    const activated = true;
    const usersNum = await this.usersRepository.count({
      projectCode,
      activated,
    });
    return usersNum;
  }

  //프로젝트 정보 가져오기
  async getProjectInfo(projectCode: string) {
    const data = await this.projectsRepository.findOne({ projectCode });
    return data;
  }

  //dashboard의 프로젝트 정보
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

  //프로젝트 정보 탭
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

  //dashboard 주간 평균 걸음수
  async getWeeklyWalkingCount(endDate: Date, projectCode: string) {
    const entityManager = getManager();
    console.log('projectCode: ', projectCode);
    console.log('endDate : ', endDate);

    const d = endDate.toString().split('.');
    console.log(d[0], d[1], d[2]);

    const usersNum = await this.getUsersNum(projectCode);
    const data = [];

    //for문 이용한 주간 data 구하기
    for (let i = 0; i < 7; i++) {
      //해당 날짜, 요일 생성
      const date = new Date(
        parseInt(d[0]),
        parseInt(d[1]) - 1,
        parseInt(d[2]) + 1 - i,
      );
      const theDate = date.toISOString().substring(0, 10);
      const dayOfWeek = this.getDayOfWeek(date);
      console.log(theDate);

      //해당날짜 걸음수 합계(해당 프로젝트 & activated된 참여자의 워치정보와 stepInfo의 워치정보 조인-users, watches, stepInfo)
      const someQuery =
        await entityManager.query(`select sum(s."stepCount") from (select W."watchSN" from public."watches" W Join "users" U on W."userCode" = U."userCode" where U."projectCode" = '${projectCode}' and U."activated"=true) as u
      join step_info s on s."watchSN" = u."watchSN" where s."stepDate" >= date '${theDate}' and s."stepDate" < date '${theDate}'+ integer '1'`);

      const sum = someQuery[0]['sum'];

      //걸음수 평균 구하기
      let stepAvg = Math.floor(parseInt(sum) / usersNum);
      if (!stepAvg) {
        stepAvg = 0; //stepInfo 없는 경우 0으로
      }

      //data 포맷 및 삽입
      const result = {
        x: theDate.substring(5) + ' (' + dayOfWeek + ')',
        y: stepAvg,
      };
      data.unshift(result);
    }
    console.log(data);

    //response
    const rs = {
      status: 200,
      data: data,
    };

    return rs;
  }

  //dashboard 주간 평균 복약횟수
  async getWeeklyTakingMedicine(endDate: Date, projectCode: string) {
    const entityManager = getManager();

    const d = endDate.toString().split('.');
    console.log(d[0], d[1], d[2]);

    const usersNum = await this.getUsersNum(projectCode); //프로젝트 참여 인원수(activated) 구하기
    const data = [];

    //for문 이용한 주간 data 구하기
    for (let i = 0; i < 7; i++) {
      //해당 날짜, 요일 구하기
      const date = new Date(
        parseInt(d[0]),
        parseInt(d[1]) - 1,
        parseInt(d[2]) + 1 - i,
      );
      const theDate = date.toISOString().substring(0, 10);
      const dayOfWeek = this.getDayOfWeek(date);

      //해당 프로젝트, 활성화된 참여자의 워치정보와 복약정보 테이블의 워치정보 조인, 해당날짜에 복약이 true인 값 count(users, watches, takeMeds)
      const someQuery =
        await entityManager.query(`select count(med."No") from (select W."watchSN" from public."watches" W Join "users" U on W."userCode" = U."userCode" where U."projectCode" = '${projectCode}' and U."activated"=true) as u
        join take_meds med on med."watchSN" = u."watchSN" where med."reportTime" >= date '${theDate}' and med."reportTime" < date '${theDate}'+ integer '1' and med."takenMeds" = true`); //해당 날 워치별 총합

      console.log(someQuery);

      const count = someQuery[0]['count'];

      //평균 복약횟수 구하기
      let stepAvg = parseInt(count) / usersNum;
      if (!stepAvg) {
        stepAvg = 0; //복약값이 하나도 없는 경우 0으로(Nan)
      }
      //data 포맷
      const result = {
        x: theDate.substring(5) + ' (' + dayOfWeek + ')',
        y: stepAvg,
      };

      //data 삽입
      data.unshift(result);
    }
    console.log(data);

    //response
    const rs = {
      status: 200,
      data: data,
    };

    return rs;
  }
}
