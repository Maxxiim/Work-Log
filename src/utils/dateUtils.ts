export function formatDateToDisplay(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("ru-RU");
}

export function compareTaskDates(a: string, b: string): number {
  return a.localeCompare(b);
}
