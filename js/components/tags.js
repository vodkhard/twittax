import { LitElement, html } from 'lit-element';
import './twaat/list';
import './header';

class Profile extends LitElement {
  constructor() {
    super();
    this.tag = null;
  }

  static get properties() {
    return {
      tag: String,
    };
  }

  firstUpdated() {
    this.tag = `#${this.location.params.name}`;
  }

  render() {
    return html`
      ${this.tag
    ? html`<app-twaat-list .conditions=${[['tags', 'array-contains', this.tag]]} />`
    : html`<div>Fetching trending twaats...</div>`}
    `;
  }
}
customElements.define('app-twittax-tags', Profile);
