import { LitElement, html } from 'lit-element';
import { firestore } from '../../db';

class Item extends LitElement {
  constructor() {
    super();
    this.twaat = {};
    this.author = null;
  }

  static get properties() {
    return {
      twaat: Object,
      author: Object,
    };
  }

  async firstUpdated() {
    this.twaat.author.get().then((doc) => {
      this.author = doc.data();
    });
    this.onUpdate = (type) => {
      firestore
        .collection('twaats')
        .doc(this.twaat.id)
        .update({
          [type]: this.twaat[type] + 1,
        });
    };
    this.onDelete = () => {
      firestore
        .collection('twaats')
        .doc(this.twaat.id)
        .delete();
    };
  }

  render() {
    return html`
      <div>
        <button @click=${this.onDelete}>FOR DEV (need to be restricted) : delete!</button>
        ${this.author
          && html`
            <div>${this.author.name}</div>
          `}
        <p>${this.twaat.content}</p>
        <button @click=${() => this.onUpdate('like')}>${this.twaat.like} likes!</button>
        <button @click=${() => this.onUpdate('retwaats')}>${this.twaat.retwaats} retwaats!</button>
      </div>
    `;
  }
}
customElements.define('app-twaat-item', Item);
