import { useState } from "react";
import { Button } from "antd";

import { useTasks } from "../../hooks/useTasks";
import { Portal } from "../Portal/Portal";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskTable } from "../TaskTable/TaskTable";

import styles from "./TasksPage.module.scss";

export function TasksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks, addTask, removeTask } = useTasks();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Журнал работ</h1>
        <Button
          type="primary"
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}
        >
          Добавить запись
        </Button>
      </header>

      <TaskTable tasks={tasks} onDelete={removeTask} />

      <Portal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm
          tasks={tasks}
          onSubmit={addTask}
          onClose={() => setIsModalOpen(false)}
        />
      </Portal>
    </main>
  );
}
