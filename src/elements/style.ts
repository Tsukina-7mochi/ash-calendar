import { css } from 'lit';

const resetButtonStyle = css`
  button {
    appearance: unset;
    font-style: unset;
    font-variant-ligatures: unset;
    font-variant-caps: unset;
    font-variant-numeric: unset;
    font-variant-east-asian: unset;
    font-variant-alternates: unset;
    font-variant-position: unset;
    font-weight: unset;
    font-stretch: unset;
    font-size: unset;
    font-family: unset;
    font-optical-sizing: unset;
    font-kerning: unset;
    font-feature-settings: unset;
    font-variation-settings: unset;
    text-rendering: unset;
    color: unset;
    letter-spacing: unset;
    word-spacing: unset;
    line-height: unset;
    text-transform: unset;
    text-indent: unset;
    text-shadow: unset;
    display: unset;
    text-align: unset;
    align-items: unset;
    cursor: unset;
    box-sizing: unset;
    background-color: unset;
    margin: unset;
    padding-block: unset;
    padding-inline: unset;
    border-width: unset;
    border-style: unset;
    border-color: unset;
    border-image: unset;
  }
`;

const defaultButtonStyle = css`
  ${resetButtonStyle}

  button {
    cursor: pointer;
  }

  button:select {
    outline: 2px solid var(--c-text);
  }
`;

const inlineMaterialIcon = css`
  .material-symbols-outlined {
    font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24;
    line-height: 1em;
  }
`;

export { resetButtonStyle, defaultButtonStyle, inlineMaterialIcon };
