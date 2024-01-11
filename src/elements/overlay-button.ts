import { LitElement, css, html, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import { defaultButtonStyle } from './style';

@customElement('overlay-button')
export class OverlayButton extends LitElement {
  static styles = [
    defaultButtonStyle,
    css`
      #root {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: var(--c-overlay-bg);
        border-radius: var(--border-radius);
      }

      #root:hover {
        background-color: var(--c-overlay-bg-hover);
      }

      #root:active {
        background-color: var(--c-overlay-bg-active);
      }
    `,
  ] as CSSResultGroup;

  render() {
    return html`
      <button id="root">
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'overlay-button': OverlayButton;
  }
}
