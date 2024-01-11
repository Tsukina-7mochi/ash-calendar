import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import useMaterialIcons from './useMaterialIcons';

@customElement('share-dialog')
export class ShareDialog extends LitElement {
  static styles = css`
    div.root {
      font-weight: lighter;
      background-color: var(--c-background);
      padding: 1em;
      border-radius: 4px;
    }

    div.title {
      display: flex;
    }

    div.title > span:first-child {
      flex-grow: 1;
    }

    button {
      display: block;
      padding: unset;
      border: unset;
      margin: unset;
      background-color: transparent;
      appearance: none;
      color: unset;
      font-weight: unset;
      font-size: unset;
      line-height: unset;
      cursor: pointer;
    }

    button.url-field {
      padding: 0.25em 0.5em;
      border: 1px solid var(--c-text);
      border-radius: 4px;
      margin: 0.5em 0;
    }

    button.url-field:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .material-symbols-outlined {
      line-height: 0;
      transform: translateY(0.25em);
    }

    span.copied {
      position: absolute;
      background-color: var(--c-background);
      padding: 0.25em;
      border-radius: 4px;
    }

    a.share {
      background-color: var(--c-text);
      padding: 0.25em;
      border-radius: 4px;
      color: var(--c-background);
      text-decoration: none;
    }
  `;

  @property({ type: String })
  url: string = location.href;

  @state()
  copied = false;

  private _copyURL(e: MouseEvent) {
    navigator.clipboard?.writeText(this.url)?.then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1000);
    });
  }

  private _close() {
    this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      ${useMaterialIcons}
      <div class="root">
        <div class="title">
          <span>Share</span>
          <button class="close" @click="${this._close}">
            <span class="material-symbols-outlined">
              close
            </span>
          </button>
        </div>
        <button class="url-field" @click="${this._copyURL}">
          <span>
            ${this.url}
          </span>
          <span class="material-symbols-outlined">
            content_copy
          </span>
          <span class="copied">
            ${this.copied ? "Copied!" : ""}
          </span>
        </button>

        <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(this.url)}" class="share" rel="nofollow noopener" target="_blank">
          Twitter (X)
        </a>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'share-dialog': ShareDialog;
  }
}
