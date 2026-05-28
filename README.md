# Журнал строительных работ

### Frontend
- React
- TypeScript
- Vite
- Ant Design
- react-hook-form

React + TypeScript дают удобную и типобезопасную разработку интерфейса.  
Ant Design ускоряет сборку UI-компонентов (таблица, форма, модальные окна).  
react-hook-form упрощает валидацию и работу с формами.

### Backend
- Node.js
- Express

Лёгкий и понятный REST API для CRUD-операций.

### База данных и ORM
- SQLite
- Prisma ORM

SQLite удобно запускать локально без отдельного сервера БД.  
Prisma даёт типизированный клиент, миграции и удобные инструменты (`migrate`, `studio`).

---

## Функционал

- Просмотр списка записей журнала
- Сортировка/фильтрация по дате
- Добавление записи с валидацией
- Удаление записи
- Выбор вида работ из предзаполненного списка (ручной ввод)
- Сохранение данных в БД через API

---

## Запуск проекта

### 1. Установка зависимостей

#### Frontend
```bash
cd testing
npm install

``` 
---

#### Backend
```bash
cd testing
cd server
npm install

``` 
---

### Подготовка базы данных
```bash
cd server
npx prisma migrate dev
npx prisma generate
```

### Запуск backend
```
cd server
node server.js

Backend будет доступен по адресу: http://localhost:3000
```

### Запуск frontend (в отдельном терминале)
```
cd testing
npm run dev

Frontend будет доступен по адресу: http://localhost:5173

```
---

### Проверка работы
- Открыть frontend в браузере.
- Добавить новую запись через форму.
- Проверить, что запись появляется в таблице без  перезагрузки.
- Удалить запись.
- Убедиться, что данные сохраняются в БД.

### Дополнительно (опционально)
Открыть Prisma Studio для просмотра БД:
```
cd server
npx prisma studio

```