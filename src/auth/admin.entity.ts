import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['adminname'])
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  adminId: number;

  @Column()
  adminname: string;

  @Column()
  password: string;
}
