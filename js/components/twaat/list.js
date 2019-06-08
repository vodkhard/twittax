import { LitElement, html } from 'lit-element';
import '../../data/app-store';
import './item';

class List extends LitElement {
  constructor() {
    super();
    this.twaats = [];
  }

  static get properties() {
    return {
      twaats: Array,
    };
  }

  twaatsChanged({ detail }) {
    this.twaats = detail;
  }

  render() {
    return html`
      <h2>This is the list :</h2>
      <app-store collection="twaats" @child-changed=${this.twaatsChanged}></app-store>
      ${this.twaats.map(
    twaat => html`
          <app-twaat-item .twaat=${twaat}></app-twaat-item>
          <hr />
        `,
  )}
    `;
  }
}

customElements.define('app-twaat-list', List);
