import { CalendarDate } from '../calendarDate';

export class DateChangeEvent extends Event {
  static readonly eventName = 'date-change';

  readonly date: CalendarDate;

  constructor(date: CalendarDate, eventInit?: EventInit) {
    super(DateChangeEvent.eventName, eventInit);
    this.date = date;
  }
}
