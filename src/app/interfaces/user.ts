export interface Trainee {
  id: number;
  name: string;
  batch: string;
  year: number;
}

export interface Trainer {
  id: number;
  name: string;
}

export interface Admin {
  id: number;
  name: string;
}

export interface User{
  trainees: Trainee[];
  trainers: Trainer[];
  admins: Admin[];
}
