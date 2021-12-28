import { addDays } from "date-fns";

export function getPlatFormDate(date: Date) {
  return addDays(date, 1);
}
