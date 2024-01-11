import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CalendarDate } from '../calendarDate';

@customElement('calendar-root')
export class CalendarRoot extends LitElement {
  static styles = css`
    div {
      display: flex;
      flex-direction: column;
      padding: 0.25em;
      height: 10em;
    }

    calendar-days {
      flex-grow: 1;
    }

    div > * {
      width: 100%;
      font-weight: lighter;
    }
  `;

  @property({
    converter: CalendarDate.litConverter,
    type: CalendarDate,
  })
  date = CalendarDate.today();

  render() {
    return html`
      <div>
        <calendar-year-month date=${this.date}></calendar-year-month>
        <calendar-days date=${this.date}></calendar-days>
        <calendar-day-of-week date=${this.date}></calendar-day-of-week>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'calendar-root': CalendarRoot;
  }
}
