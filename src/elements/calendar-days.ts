import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CalendarDate } from '../calendarDate';
import { DateChangeEvent } from './dateChangeEvent';

@customElement('calendar-days')
export class CalendarDays extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      width: 100%;
      height: 100%;
      font-size: 1.5em;
    }

    .day {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .today {
      font-size: 2em;
    }
  `;

  @property({
    converter: CalendarDate.litConverter,
    type: CalendarDate,
  })
  date = CalendarDate.today();

  @property({ type: Number })
  dayRange = 3;

  render() {
    const days = new Array(this.dayRange * 2 + 1).fill(0).map((_, i) => {
      const date = new CalendarDate(
        this.date.year,
        this.date.month,
        this.date.date + i - this.dayRange
      ).normalized();
      const selectDate = () => {
        const event = new DateChangeEvent(date, {
          bubbles: true,
          composed: true,
        });
        console.log(event);

        this.dispatchEvent(event);
      };

      return html`
        <div @click="${selectDate}" class="${
          i === this.dayRange ? 'today day' : 'day'
        }">
          ${date.date}
        </div>
      `;
    });

    return html`${days}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'calendar-days': CalendarDays;
  }
}
