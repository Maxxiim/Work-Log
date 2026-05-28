import type { Task } from "../types/task";

export interface TaskFiltersState {
  work: string | null;
  unit: string | null;
  name: string;
}

export const emptyTaskFilters: TaskFiltersState = {
  work: null,
  unit: null,
  name: "",
};

export function filterTasks(tasks: Task[], filters: TaskFiltersState): Task[] {
  const searchName = filters.name.trim().toLowerCase();

  return tasks.filter((task) => {
    if (filters.work !== null && task.work !== filters.work) {
      return false;
    }

    if (filters.unit !== null && task.unit !== filters.unit) {
      return false;
    }

    if (searchName && !task.name.toLowerCase().includes(searchName)) {
      return false;
    }

    return true;
  });
}
