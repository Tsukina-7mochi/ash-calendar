import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CalendarDate } from '../calendarDate';

@customElement('calendar-day-of-week')
export class CalendarDayOfWeek extends LitElement {
  @property({
    converter: CalendarDate.litConverter,
    type: CalendarDate,
  })
  date = CalendarDate.today();

  render() {
    return html`
      <div class="root">
      ${this.date.dayOfWeekName}
    </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'calendar-year-month': CalendarDayOfWeek;
  }
}
