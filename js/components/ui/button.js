import { LitElement, html, css } from 'lit-element';
import { colors } from './variables';

class Button extends LitElement {
  constructor() {
    super();
    this.icon = null;
    this.color = null;
  }

  static get properties() {
    return {
      icon: String,
      color: String,
    };
  }

  static get styles() {
    return css`
      button {
        display: flex;
        border: 0;
        background-color: transparent;
        cursor: pointer;
      }
      button:hover {
        color: ${colors.blue};
      }
      app-icon {
        margin-right: 5px;
      }
    `;
  }

  render() {
    return html`
      <style>
        button {
          color: ${this.color}
        }
      </style>
      <button type="button" aria-label="button">
        <app-icon .icon=${this.icon} .color=${this.color}></app-icon>
        <div>
          <slot></slot>
        </div>
      </button>
    `;
  }
}

customElements.define('app-button', Button);
