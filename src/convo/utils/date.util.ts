export function timestampAddMonth(timestampt: number, month: number): number {
  const newDate: Date = new Date(timestampt);
  return new Date(newDate.setMonth(newDate.getMonth() + month)).getTime();
}

export function datesAreOnSameDay(first: Date, second: Date): boolean {
  if (first.getDate() === second.getDate()) {
    return true;
  } else {
    return false;
  }
}

export function datesAreOnTomorrow(first: Date, second: Date): boolean {
  if (first.getDate() === second.getDate() + 1) {
    return true;
  } else {
    return false;
  }
}
