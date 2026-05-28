export interface Task {
  id?: number;
  date: string;
  work: string;
  name: string;
  volume: number;
  unit: string;
}

export interface TaskFormValues {
  date: string;
  work: string;
  name: string;
  volume: number;
  unit: string;
}
