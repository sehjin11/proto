import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { v4 as uuid4 } from 'uuid';

@Entity()
@Unique(['projectCode'])
export class Projects extends BaseEntity {
  @PrimaryColumn()
  projectId: string;

  @BeforeInsert()
  generateUuid() {
    const date = new Date();
    this.projectId = dateFormat(date) + uuid4().replace(/-/g, '').substr(0, 5);
  }
  @PrimaryColumn()
  projectCode: string;

  @Column()
  projectName: string;

  @Column({ nullable: true })
  startDate: string;

  @Column({ nullable: true })
  endDate: string;

  @Column()
  projectPurpose: string;

  @Column()
  projectSite: string;

  @Column()
  manager: string;

  @Column()
  activated: boolean;
}

@Entity()
export class Users extends BaseEntity {
  @PrimaryColumn()
  userCode: string;

  @BeforeInsert()
  generateUserCode() {
    const date = new Date();
    this.userCode = dateFormat(date) + uuid4().replace(/-/g, '').substr(0, 5);
  }

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  projectCode: string;

  @Column('text', { array: true })
  watchSN: string[];

  @Column('text', { nullable: true, array: true })
  beacon: string[];

  @Column({ nullable: true })
  attendDate: string;

  @Column({ nullable: true })
  updateState: boolean;

  @Column({ nullable: true })
  activated: boolean;
}

@Entity()
export class TakeMeds extends BaseEntity {
  @PrimaryGeneratedColumn()
  No: number;

  @Column({ nullable: false })
  watchSN: string;

  @Column({ nullable: true })
  beacon: string;

  @Column({ nullable: true })
  projectCode: string;

  @Column({ nullable: true })
  inputType: string;

  @Column({ nullable: true })
  medType: string;

  @Column()
  reportTime: Date;

  @Column()
  takenMeds: boolean;

  @Column({ nullable: true })
  timeStamp: Date;
}

@Entity()
export class StatusInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  No: number;

  @Column()
  statusDate: Date;

  @Column()
  watchSN: string;

  @Column()
  wifiStatus: boolean;

  @Column()
  videoStatus: boolean;

  @Column()
  stepStatus: boolean;

  @Column()
  projectCode: string;
}

@Entity()
export class StepInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  No: number;

  @Column()
  watchSN: string;

  @Column()
  stepCount: number;

  @Column()
  stepDate: Date;
}

function dateFormat(date: Date) {
  let month: any = date.getMonth() + 1;
  let day: any = date.getDate();

  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;

  return date.getFullYear().toString().substring(2) + month + day;
}
