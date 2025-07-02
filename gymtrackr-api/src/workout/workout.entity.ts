import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity'; // Make sure this path is correct

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  reps: number;

  @Column()
  sets: number;

  @Column()
  weight: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ nullable: true })
  notes: string;

  @Column()
  duration: number; 

  @Column({ type: 'float', nullable: true })
  caloriesBurned: number;

  @Column()
  type: string;

  @ManyToOne(() => User, user => user.workouts, { eager: false })
user: User;
}

