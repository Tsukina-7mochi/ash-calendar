import { ComplexAttributeConverter } from "lit";

const padWith0 = (num: number, length: number) => `${num}`.padStart(length, '0');
const dateTextRegExp = /^(\d+)-(\d+)-(\d+)$/;

export class CalendarDate {
  static readonly monthNames = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
  static readonly dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  static litConverter: ComplexAttributeConverter = {
    fromAttribute(value, type) {
      if(type !== CalendarDate || typeof value !== 'string') {
        return null;
      }
      return CalendarDate.parse(value);
    },
    toAttribute(value, type) {
      if(type !== CalendarDate) {
        return null;
      }
      return (value as CalendarDate).toString();
    }
  }

  static parse(text: string): CalendarDate | null {
    const match = text.match(dateTextRegExp);
    if(match === null) {
      return null;
    }

    const year = match[1];
    const month = match[2];
    const date = match[3];

    if(typeof year !== 'string' || typeof month !== 'string' || typeof date !== 'string') {
      return null;
    }

    return new CalendarDate(
      parseInt(year),
      parseInt(month),
      parseInt(date)
    );
  }

  static today(): CalendarDate {
    const date = new Date();

    return new CalendarDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
  }

  readonly year: number;
  readonly month: number;
  readonly date: number;
  readonly dayOfWeek: number;

  get rawDate(): Date {
    return new Date(this.year, this.month - 1, this.date);
  }

  get monthName(): string {
    return CalendarDate.monthNames[this.month - 1];
  };

  get dayOfWeekName(): string {
    return CalendarDate.dayOfWeekNames[this.dayOfWeek];
  }

  get dateString(): string {
    return `${padWith0(this.year, 4)}-${padWith0(this.month, 2)}-${padWith0(this.date, 2)}`;
  }

  get dateStringShort(): string {
    return `${padWith0(this.year, 4)}${padWith0(this.month, 2)}${padWith0(this.date, 2)}`;
  }

  constructor(year: number, month: number, date: number) {
    this.year = year;
    this.month = month;
    this.date = date;

    const rawDate = new Date(year, month - 1, date);
    this.dayOfWeek = rawDate.getDay();
  }

  normalized(): CalendarDate {
    const rawDate = this.rawDate;

    return new CalendarDate(
      rawDate.getFullYear(),
      rawDate.getMonth() + 1,
      rawDate.getDate()
    );
  }

  toString(): string {
    return this.dateString;
  }

  equals(another: CalendarDate): boolean {
    return this.year === another.year && this.month === another.month && this.date === another.date;
  }
}
