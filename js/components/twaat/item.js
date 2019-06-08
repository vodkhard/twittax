import { LitElement, html } from 'lit-element';

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
  }

  render() {
    return html`
      <div>
        ${this.author
          && html`
            <div>${this.author.name}</div>
          `}
        <p>${this.twaat.content}</p>
        <span>${this.twaat.like} likes!</span>
      </div>
    `;
  }
}
customElements.define('app-twaat-item', Item);
