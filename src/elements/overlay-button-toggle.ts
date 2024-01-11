import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OverlayButton } from './overlay-button';

@customElement('overlay-button-toggle')
export class OverlayButtonToggle extends OverlayButton {
  @property({ type: Boolean })
  checked = false;

  static styles = [
    OverlayButton.styles,
    css`
      label {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }

      slot {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      input {
        display: none;
      }

      slot {
        display: none;
      }

      input[type=checkbox]:checked ~ slot[name="if-enabled"] {
        display: flex;
      }

      input[type=checkbox]:not(:checked) ~ slot[name="if-disabled"] {
        display: flex;
      }
    `,
  ];

  constructor() {
    super();

    this.addEventListener('click', (e) => {
      this._toggle();
      e.preventDefault();
      e.stopPropagation();
    });
  }

  private _toggle() {
    this.checked = !this.checked;

    this.dispatchEvent(
      new Event(this.checked ? 'enable' : 'disable', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div>
        <label>
          <input type="checkbox" ?checked=${this.checked} />
          <slot name="if-enabled"></slot>
          <slot name="if-disabled"></slot>
        </label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'overlay-button-toggle': OverlayButtonToggle;
  }
}
