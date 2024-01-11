import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CalendarDate } from '../calendarDate';

@customElement('calendar-year-month')
export class CalendarYearMonth extends LitElement {
  @property({
    converter: CalendarDate.litConverter,
    type: CalendarDate,
  })
  date = CalendarDate.today();

  render() {
    return html`${this.date.monthName} ${this.date.year}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'calendar-year-month': CalendarYearMonth;
  }
}
