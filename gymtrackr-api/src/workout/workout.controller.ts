import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('workouts') 
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  // ✅ Create workout linked to current user
  @Post()
  create(@Request() req, @Body() dto: CreateWorkoutDto) {
    return this.workoutService.create(dto, req.user);
  }

  // ✅ Get all workouts for logged-in user
  @Get()
  findAll(@Request() req) {
    return this.workoutService.findByUser(req.user.userId);
  }

  // ✅ Get one workout by ID, owned by user
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.workoutService.findOneForUser(+id, req.user.userId);
  }

  // ✅ Update one workout by ID (if owned by user)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: Partial<CreateWorkoutDto>,
  ) {
    return this.workoutService.updateForUser(+id, dto, req.user.userId);
  }

  // ✅ Delete one workout by ID (if owned by user)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.workoutService.removeForUser(+id, req.user.userId);
  }
}


