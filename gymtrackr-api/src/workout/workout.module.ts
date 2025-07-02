import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './workout.entity';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { JwtStrategy } from '../auth/jwt.strategy'; 

@Module({
  imports: [TypeOrmModule.forFeature([Workout])],
  controllers: [WorkoutController],
  providers: [WorkoutService, JwtStrategy], 
})
export class WorkoutModule {}


