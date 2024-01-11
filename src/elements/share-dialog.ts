import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import useMaterialIcons from './useMaterialIcons';
import { defaultButtonStyle } from './style';

@customElement('share-dialog')
export class ShareDialog extends LitElement {
  static styles = [
    defaultButtonStyle,
    css`
      :host {
        font-weight: lighter;
        background-color: var(--c-overlay-bg);
        padding: 1em;
        border-radius: var(--border-radius);
      }

      header {
        display: flex;
      }

      header h2 {
        flex-grow: 1;
        line-height: inherit;
        font-weight: inherit;
        margin: 0;
      }

      header button > * {
        display: contents;
      }

      .url-field {
        display: block;
        padding: 0.25em 0.5em;
        border: 1px solid var(--c-text);
        border-radius: var(--border-radius);
        margin: 0.5em 0;
      }

      .url-field:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .material-symbols-outlined {
        line-height: 0;
        transform: translateY(0.25em);
      }

      span.copied {
        position: absolute;
        background-color: var(--c-overlay-bg);
        padding: 0.5em;
        border-radius: var(--border-radius);
        transform: translate(0.75em, -0.5em);
      }

      nav {
        display: flex;
      }

      nav > a {
        display: block;
        background-color: var(--c-text);
        padding: 0.5em;
        border-radius: var(--border-radius);
        color: var(--c-bg);
        text-decoration: none;
      }
    `,
  ];

  @property({ type: String })
  url: string = location.href;

  @state()
  copied = false;

  private _copyURL() {
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
    const encodedURL = encodeURI(this.url);
    const twitterShareURL = `https://twitter.com/intent/tweet?text=${encodedURL}`;

    return html`
      ${useMaterialIcons}

      <header>
        <h2>Share this ASH</h2>
        <button id="close" @click="${this._close}">
          <span class="material-symbols-outlined">
            close
          </span>
        </button>
      </header>

      <button class="url-field" @click="${this._copyURL}">
        <span>
          ${this.url}
        </span>
        <span class="material-symbols-outlined">
          content_copy
        </span>
        ${this.copied ? html`<span class="copied">Copied!</span>` : ''}
      </button>

      <nav>
        <a href="${twitterShareURL}" class="share" rel="nofollow noopener" target="_blank">
          Twitter (X)
        </a>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'share-dialog': ShareDialog;
  }
}
