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
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 4px;
    }

    div:hover {
      background-color: rgba(0, 0, 0, 0.6);
    }

    div:active {
      background-color: rgba(0, 0, 0, 0.7);
    }

    button {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: none;
      outline: none;
      appearance: none;
      color: unset;
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
