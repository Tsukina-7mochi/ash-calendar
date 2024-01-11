import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OverlayButton } from './overlay-button';

@customElement('overlay-button-toggle')
export class OverlayButtonToggle extends OverlayButton {
  @property({ type: Boolean })
  checked = false;

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
    const content = this.checked
      ? html`<slot name="if-enabled"></slot>`
      : html`<slot name="if-disabled"></slot>`;

    return html`
      <label id="root">
        <input type="checkbox" ?checked=${this.checked} hidden />
        ${content}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'overlay-button-toggle': OverlayButtonToggle;
  }
}
