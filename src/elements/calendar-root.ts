import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CalendarDate } from '../calendarDate';

@customElement('calendar-root')
export class CalendarRoot extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5em;
      height: 10em;
      font-weight: lighter;
    }

    calendar-days {
      flex-grow: 1;
    }
  `;

  @property({
    converter: CalendarDate.litConverter,
    type: CalendarDate,
  })
  date = CalendarDate.today();

  render() {
    return html`
      <calendar-year-month .date=${this.date}></calendar-year-month>
      <calendar-days .date=${this.date}></calendar-days>
      <calendar-day-of-week .date=${this.date}></calendar-day-of-week>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'calendar-root': CalendarRoot;
  }
}
