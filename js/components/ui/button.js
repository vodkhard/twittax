import { LitElement, html, css } from 'lit-element';

class Button extends LitElement {
  constructor() {
    super();
    this.icon = null;
  }

  static get properties() {
    return {
      icon: String,
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
      app-icon {
        margin-right: 5px;
      }
    `;
  }

  render() {
    return html`
      <button type="button" @click=${() => this.dispatchEvent(new Event('click'))}>
        <app-icon .icon=${this.icon}></app-icon>
        <div>
          <slot></slot>
        </div>
      </button>
    `;
  }
}

customElements.define('app-button', Button);
