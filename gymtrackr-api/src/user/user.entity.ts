import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Workout } from '../workout/workout.entity'; // adjust the path if needed

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ type: 'float', nullable: true })
  weightKg: number;


  @OneToMany(() => Workout, workout => workout.user)
  workouts: Workout[];
}

