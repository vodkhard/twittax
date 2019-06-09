import { LitElement, html, css } from 'lit-element';
import twaatsRepository from '../../data/repositroy/twaats';
import './comment';

class Item extends LitElement {
  constructor() {
    super();
    this.twaat = {};
    this.author = null;
    this.child = null;
  }

  static get properties() {
    return {
      twaat: Object,
      author: Object,
      child: Object,
    };
  }

  static get styles() {
    return css`
      .small {
        font-size: 0.5rem;
      }
    `;
  }

  async firstUpdated() {
    this.twaat.author.get().then((doc) => {
      this.author = doc.data();
    });
    if (this.twaat.child) {
      this.twaat.child.get().then((doc) => {
        this.child = doc.data();
      });
    }
    this.onUpdate = type => twaatsRepository.update(this.twaat.id, {
      [type]: this.twaat[type] + 1,
    });
    this.onRetwaat = () => {
      this.onUpdate('retwaats').then(() => {
        twaatsRepository.add({
          child: twaatsRepository.get(this.twaat.id),
          like: 0,
          retwaats: 0,
        });
      });
    };
    this.onDelete = () => {
      twaatsRepository.del(this.twaat.id);
    };
  }

  render() {
    return html`
      <div>
        ${this.author
          && html`
            <div>${this.author.name}</div>
          `}
        ${this.twaat.parent
          && html`
            <i>comment</i>
          `}
        <p>${this.twaat.content}</p>
        ${this.child
          && html`
            <i>retwaat</i><br />
            <p>${this.child.content}</p>
            <i>end retwaat</i><br />
          `}
        <div class="small">${this.twaat.createdAt.toDate().toLocaleString()}</div>
        <button @click=${() => this.onUpdate('like')}>${this.twaat.like} likes!</button>
        <button @click=${this.onRetwaat}>${this.twaat.retwaats} retwaats!</button>
        <button @click=${this.onDelete}>Delete</button>
        <app-twaat-comment .parent=${this.twaat.id} />
      </div>
    `;
  }
}
customElements.define('app-twaat-item', Item);
