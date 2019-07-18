import { LitElement, html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
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
      <app-store
        collection="twaats"
        .conditions=${this.conditions}
        @child-changed=${this.twaatsChanged}
      ></app-store>
      ${repeat(this.twaats, ({ id }) => id, data => html`<app-twaat-item .item=${data}></app-twaat-item>`)}
    `;
  }
}

customElements.define('app-twaat-list', List);
