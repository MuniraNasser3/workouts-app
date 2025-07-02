export class CreateWorkoutDto {
  name: string;
  reps: number;
  sets: number;
  weight: number;
  date: string;
  duration: number;
  type: string; 
  notes?: string;
}

