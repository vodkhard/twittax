import { LitElement, html, css } from 'lit-element';

class Tooltip extends LitElement {
  static get properties() {
    return {
      tooltip: String,
    };
  }

  static get styles() {
    return css`
      .tooltip {
        display: inline;
        position: relative;
        cursor: pointer;
      }
      .tooltip:hover:after {
        font-size: 12px;
        font-weight: 300;
        background: #1f2224;
        border-radius: 4px;
        bottom: 26px;
        color: #fff;
        content: attr(content);
        left: 50%;
        transform: translateX(-50%);
        padding: 8px 10px;
        position: absolute;
        z-index: 98;
        white-space: pre;
      }
      .tooltip:hover:before {
        border: solid;
        border-color: #1f2224 transparent;
        border-width: 6px 6px 0 6px;
        bottom: 20px;
        content: '';
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        z-index: 99;
      }
    `;
  }

  render() {
    return html`<span class="tooltip" content=${this.tooltip}><slot></slot></span>`;
  }
}

customElements.define('app-tooltip', Tooltip);
