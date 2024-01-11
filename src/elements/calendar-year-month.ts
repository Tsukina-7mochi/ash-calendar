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
    return html`
      <div class="root">
        ${this.date.monthName} ${this.date.year}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'calendar-year-month': CalendarYearMonth;
  }
}
