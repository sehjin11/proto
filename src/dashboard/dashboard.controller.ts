import { Controller, Get, Param, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('/dashboard/weeklyTakingMedicine')
  weeklyTakingMedicine(
    @Query('endDate') endDate: Date,
    @Query('projectCode') projectCode: string,
  ) {
    const data = this.dashboardService.getWeeklyTakingMedicine(
      endDate,
      projectCode,
    );

    // const data = {
    //   status: 200,
    //   data: [
    //     { x: '01.10 (월)', y: 0.5 },
    //     { x: '01.11 (화)', y: 0.8333333333333334 },
    //     { x: '01.12 (수)', y: 0.6666666666666666 },
    //     { x: '01.13 (목)', y: 1.3333333333333333 },
    //     { x: '01.14 (금)', y: 1.1666666666666667 },
    //     { x: '01.15 (토)', y: 0.8333333333333334 },
    //     { x: '01.16 (일)', y: 1.1666666666666667 },
    //   ],
    // };
    return data;
  }

  @Get('/dashboard/weeklyWalkingCount')
  weeklyWalkingCount(
    @Query('endDate') endDate: Date,
    @Query('projectCode') projectCode: string,
  ) {
    const weeklyWalkingCount = this.dashboardService.getWeeklyWalkingCount(
      endDate,
      projectCode,
    );
    const data = {
      status: 200,
      data: [
        { x: '01.10 (월)', y: '2209.67' },
        { x: '01.11 (화)', y: '2655.33' },
        { x: '01.12 (수)', y: '1720.50' },
        { x: '01.13 (목)', y: '1804.00' },
        { x: '01.14 (금)', y: '3060.83' },
        { x: '01.15 (토)', y: '1459.17' },
        { x: '01.16 (일)', y: '209.00' },
      ],
    };
    return weeklyWalkingCount;
  }

  @Get('/report')
  report(@Query('_id') projectCode: string) {
    const data = this.dashboardService.getReport(projectCode);
    console.log(projectCode);
    return data;
  }

  @Get('/project')
  project(@Query('_id') projectCode: string) {
    const data = this.dashboardService.getProject(projectCode);
    console.log(projectCode);
    return data;
  }
}
