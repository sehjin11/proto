import {
  Projects,
  StatusInfo,
  StepInfo,
  TakeMeds,
  Users,
} from 'src/entities/projects.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Projects)
export class ProjectsRepository extends Repository<Projects> {}

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {}

@EntityRepository(TakeMeds)
export class TakeMedsRepository extends Repository<TakeMeds> {}

@EntityRepository(StatusInfo)
export class StatusInfoRepository extends Repository<TakeMeds> {}

@EntityRepository(StepInfo)
export class StepInfoRepository extends Repository<TakeMeds> {}
