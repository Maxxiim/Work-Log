import { Button, Input, Select } from "antd";

import type { TaskFiltersState } from "../../utils/filterTasks";
import { emptyTaskFilters } from "../../utils/filterTasks";
import type { Task } from "../../types/task";

import styles from "./TaskFilters.module.scss";
import { getOptionsFromTasks } from "../../data/constants";

interface TaskFiltersProps {
  filters: TaskFiltersState;
  onChange: (filters: TaskFiltersState) => void;
}

interface TaskFiltersProps {
  tasks: Task[];
  filters: TaskFiltersState;
  onChange: (filters: TaskFiltersState) => void;
}

export function TaskFilters({ filters, onChange, tasks }: TaskFiltersProps) {

  const { workOptions, unitOptions } = getOptionsFromTasks(tasks);
  
  const hasActiveFilters =
    filters.work !== null ||
    filters.unit !== null ||
    filters.name.trim().length > 0;

  return (
    <div className={styles.filters}>
      <Select
        className={styles.field}
        placeholder="Вид работ"
        allowClear
        value={filters.work}
        options={[...workOptions]}
        onChange={(work) => onChange({ ...filters, work: work ?? null })}
      />
      <Select
        className={styles.field}
        placeholder="Единица измерения"
        allowClear
        value={filters.unit}
        options={[...unitOptions]}
        onChange={(unit) => onChange({ ...filters, unit: unit ?? null })}
      />
      <Input
        className={styles.field}
        placeholder="ФИО исполнителя"
        allowClear
        value={filters.name}
        onChange={(event) => onChange({ ...filters, name: event.target.value })}
      />
      {hasActiveFilters && (
        <Button
          className={styles.resetButton}
          onClick={() => onChange(emptyTaskFilters)}
        >
          Сбросить
        </Button>
      )}
    </div>
  );
}
