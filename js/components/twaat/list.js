import { LitElement, html } from 'lit-element';
import '../../data/app-store';
import './item';

class List extends LitElement {
  constructor() {
    super();
    this.twaats = [];
    this.conditions = [];
  }

  static get properties() {
    return {
      twaats: Array,
      conditions: Array,
    };
  }

  twaatsChanged({ detail: twaats }) {
    this.twaats = twaats;
  }

  render() {
    return html`
      <h2>This is the list :</h2>
      <app-store
        collection="twaats"
        .conditions=${this.conditions}
        @child-changed=${this.twaatsChanged}
      ></app-store>
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
