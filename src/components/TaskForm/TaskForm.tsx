import { Controller, useForm } from "react-hook-form";
import { Select } from "antd";

import { WORK_OPTIONS } from "../../data/constants";
import type { Task, TaskFormValues } from "../../types/task";

import styles from "./TaskForm.module.scss";

interface TaskFormProps {
  tasks?: Task[];
  onSubmit: (values: TaskFormValues) => void;
  onClose: () => void;
}

export function TaskForm({ onSubmit, onClose }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    mode: "onChange",
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      work: "",
      name: "",
      volume: 0,
      unit: "",
    },
  });

  const handleFormSubmit = (values: TaskFormValues) => {
    onSubmit(values);
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <h2 className={styles.title}>Добавить запись</h2>
      <div className={styles.divider} />

      <label className={styles.label}>
        Дата
        <input
          type="date"
          className={errors.date ? styles.inputError : styles.input}
          {...register("date", { required: "Дата обязательна" })}
        />
        {errors.date && (
          <span className={styles.error}>{errors.date.message}</span>
        )}
      </label>

      <label className={styles.label}>
        Вид работ
        <Controller
          name="work"
          control={control}
          rules={{ required: "Вид работ обязателен" }}
          render={({ field }) => (
            <Select
              value={field.value ? [field.value] : []}
              onChange={(value) => {
                const nextValue = Array.isArray(value)
                  ? value[value.length - 1] ?? ""
                  : value ?? "";
                field.onChange(nextValue);
              }}
              onBlur={field.onBlur}
              ref={field.ref}
              mode="tags"
              tokenSeparators={[","]}
              options={WORK_OPTIONS}
              placeholder="Выберите или введите вид работ"
              status={errors.work ? "error" : ""}
              style={{ width: "100%" }}
            />
          )}
        />
        {errors.work && (
          <span className={styles.error}>{errors.work.message}</span>
        )}
      </label>

      <label className={styles.label}>
        Имя сотрудника
        <input
          type="text"
          placeholder="Например: Иванов И.И."
          className={errors.name ? styles.inputError : styles.input}
          {...register("name", { required: "Имя сотрудника обязательно" })}
        />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </label>

      <label className={styles.label}>
        Объем
        <input
          type="number"
          step="0.01"
          min="0.01"
          placeholder="Например: 24"
          className={errors.volume ? styles.inputError : styles.input}
          {...register("volume", {
            required: "Объем обязателен",
            valueAsNumber: true,
            min: { value: 0.01, message: "Объем должен быть больше 0" },
          })}
        />
        {errors.volume && (
          <span className={styles.error}>{errors.volume.message}</span>
        )}
      </label>

      <label className={styles.label}>
        Единица измерения
        <input
          type="text"
          placeholder="Например: м², кг, шт..."
          className={errors.unit ? styles.inputError : styles.input}
          {...register("unit", { required: "Единица измерения обязательна" })}
        />
        {errors.unit && (
          <span className={styles.error}>{errors.unit.message}</span>
        )}
      </label>

      <button type="submit" className={styles.submitButton}>
        Добавить
      </button>
    </form>
  );
}
