import { Button, Popconfirm } from "antd";

import type { Task } from "../../types/task";
import { formatDateToDisplay } from "../../utils/dateUtils";

import styles from "./TaskCardList.module.scss";

interface TaskCardListProps {
  tasks: Task[];
  onDelete: (id: Task["id"]) => void;
}

export function TaskCardList({ tasks, onDelete }: TaskCardListProps) {
  if (tasks.length === 0) {
    return <p className={styles.empty}>Не найдено</p>;
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li key={task.id} className={styles.card}>
          <div className={styles.row}>
            <span className={styles.label}>Дата</span>
            <span className={styles.value}>
              {formatDateToDisplay(task.date)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Вид работ</span>
            <span className={styles.value}>{task.work}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Объем</span>
            <span className={styles.value}>
              {task.volume} {task.unit}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Исполнитель</span>
            <span className={styles.value}>{task.name}</span>
          </div>
          <Popconfirm
            title="Удалить запись?"
            description="Вы уверены, что хотите удалить эту запись?"
            onConfirm={() => onDelete(task.id)}
            okText="Да"
            cancelText="Нет"
          >
            <Button danger block className={styles.deleteButton}>
              Удалить
            </Button>
          </Popconfirm>
        </li>
      ))}
    </ul>
  );
}
