import { LitElement, css, html, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('overlay-button')
export class OverlayButton extends LitElement {
  static styles = css`
    :root {
      color: white;
    }

    div {
      width: 100%;
      height: 100%;
      background-color: var(--c-overlay-bg);
      border-radius: var(--border-radius);
    }

    div:hover {
      background-color: var(--c-overlay-bg-hover);
    }

    div:active {
      background-color: var(--c-overlay-bg-active);
    }

    button {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: none;
      appearance: none;
      color: unset;
      cursor: pointer;
    }
  ` as CSSResultGroup;

  render() {
    return html`
      <div>
        <button>
          <slot></slot>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'overlay-button': OverlayButton;
  }
}
