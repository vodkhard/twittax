import { LitElement, html, css } from 'lit-element';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import twaatsRepository from '../../data/repositroy/twaats';
import './comment';
import './content';
import '../ui/button';
import '../ui/icon';
import '../ui/tooltip';

dayjs.extend(relativeTime);

class Item extends LitElement {
  constructor() {
    super();
    this.item = {};
    this.author = null;
    this.child = null;
  }

  static get properties() {
    return {
      item: Object,
      author: Object,
      child: Object,
    };
  }

  static get styles() {
    const grey = css`#657786`;
    const black = css`#14171a`;

    return css`
      :host {
        display: block;
        border-bottom: 1px solid #e6ecf0;
        color: ${black};
      }
      .small {
        font-size: 14px;
      }
      .grey {
        color: ${grey};
      }
      .container {
        display: flex;
      }
      .container > div {
        margin: 0 5px;
      }
      .left {
        max-width: 46px;
        width: 100%;
      }
      .right {
        flex-grow: 1;
      }
      .header .left {
        text-align: right;
      }
      img {
        max-width: 100%;
        border-radius: 999px;
        pointer-events: none;
      }
      article {
        padding: 1rem 9px;
      }
      .name {
        font-weight: bold;
        margin-bottom: 2px;
      }
      .at {
        font-weight: normal;
      }
      .at a {
        text-decoration: none;
      }
      .button-container {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        max-width: 425px;
      }
      app-button {
        color: ${grey};
        font-weight: normal;
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
    this.onLike = () => {
      this.onUpdate('like');
    };
    this.onDelete = () => {
      twaatsRepository.del(this.item.id);
    };
    this.onComment = () => {
      console.log('TODO: toggle le form pour commenter');
    };
  }

  render() {
    const header = (this.child || this.item.parent) && html`
      <div class="container header small">
        <div class="left">
          <app-icon icon="retwaat"></app-icon>
        </div>
        <div class="right grey">
          ${this.child && 'retwaaté'}
          ${this.item.parent && 'répondu'}
        </div>
      </div>
    `;

    return html`
      <article>
        ${header}
        <div class="container">
          <div class="left">
            <img src="/assets/default_profile_400x400.png"/>
          </div>
          <div class="right">
            <div class="name small">
              ${this.author && html`${this.author.name.slice(1)}`}
              <span class="at grey">
                ${this.author && html`<a class="grey" href=${`/users/${this.author.name}`}>${this.author.name}</a>`}
                ·
                ${this.item.createdAt
                  && html`
                    <app-tooltip
                      .tooltip=${dayjs(this.item.createdAt.toDate()).format('h:mm - D MMMM YYYY').toLowerCase()}
                    >
                      ${dayjs(this.item.createdAt.toDate()).fromNow()}
                    </app-tooltip>
                  `}
                </span>
            </div>
            <div class="content">
              ${this.item.content
                && html`
                  <app-twaats-content .content=${this.item.content}></app-twaats-content>
                `}
              ${this.child
                && html`
                  <app-twaats-content .content=${this.child.content}></app-twaats-content>
                `}
            </div>
            <div class="button-container">
                <app-button icon="comment" @click=${this.onComment}>0</app-button>
              <app-button icon="retwaat" @click=${this.onRetwaat}>${this.item.retwaats}</app-button>
              <app-button icon="like" @click=${this.onLike}>${this.item.like}</app-button>
              <app-button icon="delete" @click=${this.onDelete}></app-button>
            </div>

            <app-twaat-comment .parent=${this.item.id} />
          </div>
        </div>
      </article>
    `;
  }
}
customElements.define('app-twaat-item', Item);
