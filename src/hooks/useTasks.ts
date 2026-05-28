import { useEffect, useState } from "react";

import type { Task, TaskFormValues } from "../types/task";
import { normalizeUnit } from "../utils/normalizeUnit";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getTasks() {
      try {
        const response = await fetch(`http://localhost:3000/works`, { signal });

        if (!response.ok) {
          console.log(response.status);
        }
        const respFromServer = await response.json();

        setTasks(respFromServer);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    getTasks();

    return () => controller.abort();
  }, []);

  const addTask = async (values: TaskFormValues) => {
    try {
      const dataToSend = {
        ...values,
        unit: normalizeUnit(values.unit),
        date: new Date(values.date).toISOString(),
      };
      const response = await fetch(`http://localhost:3000/works`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        console.log(response.status, response.statusText);
      }

      const createdTask = await response.json();
      setTasks((prev) => [...prev, createdTask]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTask = async (id: Task["id"]) => {
    try {
      const response = await fetch(`http://localhost:3000/works/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.log(response.status);
      }

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return { tasks, addTask, removeTask };
}
