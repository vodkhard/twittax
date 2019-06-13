import { LitElement, html, css } from 'lit-element';
import twaatsRepository from '../../data/repositroy/twaats';
import './comment';
import './content';

class Item extends LitElement {
  constructor() {
    super();
    this.item = {};
    this.author = null;
    this.child = null;
  }

  static get properties() {
    return {
      data: Object,
      author: Object,
      child: Object,
    };
  }

  static get styles() {
    return css`
      .small {
        font-size: 1rem;
      }
      .retwaat {
        border: 1px solid red;
      }
    `;
  }

  async firstUpdated() {
    this.item.author.get().then((doc) => {
      this.author = doc.data();
    });
    if (this.item.child) {
      this.item.child.get().then((doc) => {
        this.child = doc.data();
      });
    }
    this.onUpdate = type => twaatsRepository.update(this.item.id, {
      [type]: this.item[type] + 1,
    });
    this.onRetwaat = () => {
      this.onUpdate('retwaats').then(() => {
        twaatsRepository.add({
          child: twaatsRepository.get(this.item.id),
          like: 0,
          retwaats: 0,
        });
      });
    };
    this.onDelete = () => {
      twaatsRepository.del(this.item.id);
    };
  }

  render() {
    return html`
      <div>
        ${this.author
          && html`
            <a href=${`/users/${this.author.name}`}>${this.author.name}</a>
          `}
        ${this.item.parent
          && html`
            <i>comment</i>
          `}
        ${this.item.content
          && html`
            <app-twaats-content .content=${this.item.content}></app-twaats-content>
          `}
        ${this.child
          && html`
            <div class="retwaat">
              <app-twaats-content .content=${this.child.content}></app-twaats-content>
            </div>
          `}
        ${this.item.createdAt
          && html`
            <div class="small">${this.item.createdAt.toDate().toLocaleString()}</div>
          `}
        <button @click=${() => this.onUpdate('like')}>${this.item.like} likes!</button>
        <button @click=${this.onRetwaat}>${this.item.retwaats} retwaats!</button>
        <button @click=${this.onDelete}>Delete</button>
        <app-twaat-comment .parent=${this.item.id} />
      </div>
    `;
  }
}
customElements.define('app-twaat-item', Item);
