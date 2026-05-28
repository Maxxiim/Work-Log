import { useState } from "react";
import { Table, Popconfirm, Button, Empty, Pagination } from "antd";
import type { TableColumnsType, TablePaginationConfig } from "antd";

import type { Task } from "../../types/task";
import { compareTaskDates, formatDateToDisplay } from "../../utils/dateUtils";
import {
  emptyTaskFilters,
  filterTasks,
  type TaskFiltersState,
} from "../../utils/filterTasks";
import { TaskCardList } from "../TaskCardList/TaskCardList";
import { TaskFilters } from "../TaskFilters/TaskFilters";

import styles from "./TaskTable.module.scss";

const PAGE_SIZE = 5;

interface TaskTableProps {
  tasks: Task[];
  onDelete: (id: Task["id"]) => void;
}

export function TaskTable({ tasks, onDelete }: TaskTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<TaskFiltersState>(emptyTaskFilters);

  const filteredTasks = filterTasks(tasks, filters);
  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const pageTasks = filteredTasks.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const handleFiltersChange = (nextFilters: TaskFiltersState) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  };

  const columns: TableColumnsType<Task> = [
    {
      title: "Дата выполнения",
      dataIndex: "date",
      showSorterTooltip: false,
      render: (date: string) => formatDateToDisplay(date),
      sorter: (a, b) => compareTaskDates(a.date, b.date),
    },
    { title: "Вид работ", dataIndex: "work" },
    {
      title: "Объем",
      key: "volumeWithUnit",
      render: (_, record) => `${record.volume} ${record.unit}`,
    },
    { title: "ФИО исполнителя", dataIndex: "name" },
    {
      title: "Действие",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Удалить запись?"
          description="Вы уверены, что хотите удалить эту запись?"
          onConfirm={() => onDelete(record.id)}
          okText="Да"
          cancelText="Нет"
        >
          <Button danger>Удалить</Button>
        </Popconfirm>
      ),
    },
  ];

  const pagination: TablePaginationConfig | false =
    filteredTasks.length > 0
      ? {
          placement: ["bottomCenter"],
          current: page,
          pageSize: PAGE_SIZE,
          total: filteredTasks.length,
          showSizeChanger: false,
          hideOnSinglePage: false,
          onChange: setCurrentPage,
        }
      : false;

  return (
    <div className={styles.wrapper}>
      <TaskFilters tasks={tasks} filters={filters} onChange={handleFiltersChange} />

      <div className={styles.desktopTable}>
        <Table<Task>
          className={styles.table}
          columns={columns}
          dataSource={filteredTasks}
          rowKey="id"
          pagination={pagination}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Не найдено"
              />
            ),
          }}
        />
      </div>

      <div className={styles.mobileList}>
        <TaskCardList tasks={pageTasks} onDelete={onDelete} />
        {filteredTasks.length > 0 && (
          <Pagination
            className={styles.pagination}
            current={page}
            pageSize={PAGE_SIZE}
            total={filteredTasks.length}
            showSizeChanger={false}
            hideOnSinglePage={false}
            onChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
