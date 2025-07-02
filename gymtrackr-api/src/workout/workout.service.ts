import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './workout.entity';
import { Repository } from 'typeorm';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { User } from '../user/user.entity';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepo: Repository<Workout>,
  ) {}

  
  // ✅ Create a workout and link it to the user
async create(data: CreateWorkoutDto, user: { userId: number }) {
  const fullUser = await this.workoutRepo.manager.findOne(User, {
    where: { id: user.userId },
  });

  if (!fullUser) {
    throw new Error('User not found');
  }

  const weight = fullUser.weightKg || 70;
  const duration = data.duration;

  const MET_MAP = {
    cardio: 7,
    strength: 6,
    hiit: 8,
    yoga: 3,
    walking: 3.5,
  };

  const met = MET_MAP[data.type.toLowerCase()] || 5;
  const calories = (met * weight * duration) / 60;

  const workout = this.workoutRepo.create({
    ...data,
    user: fullUser,
    caloriesBurned: Math.round(calories),
  });

  return this.workoutRepo.save(workout);
}


  
  // ✅ Get all workouts for a specific user
  findByUser(userId: number) {
    return this.workoutRepo.find({
      where: { user: { id: userId } },
      relations: ['user'], 
    });
  }

  // ✅ Get one workout owned by user
  findOneForUser(id: number, userId: number) {
    return this.workoutRepo.findOne({
      where: { id, user: { id: userId } },
    });
  }

  // ✅ Update a workout if it belongs to the user
  async updateForUser(id: number, data: Partial<CreateWorkoutDto>, userId: number) {
    const workout = await this.findOneForUser(id, userId);
    if (!workout) return null;

    Object.assign(workout, data);
    return this.workoutRepo.save(workout);
  }

  // ✅ Delete a workout if it belongs to the user
  async removeForUser(id: number, userId: number) {
    const workout = await this.findOneForUser(id, userId);
    if (!workout) return null;

    return this.workoutRepo.remove(workout);
  }
}


