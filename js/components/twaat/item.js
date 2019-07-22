import { LitElement, html, css } from 'lit-element';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { colors } from '../ui/variables';
import { firestorage } from '../../db';
import './content';
import '../ui/button';
import '../ui/icon';
import '../ui/tooltip';
import '../ui/profile-picture';
import './buttons';
import './picture';

dayjs.extend(relativeTime);

class Item extends LitElement {
  constructor() {
    super();
    this.item = {};
    this.author = null;
    this.child = null;
    this.parent = null;
    this.full = true;
    this.pp = null;
  }

  static get properties() {
    return {
      item: Object,
      author: Object,
      child: Object,
      parent: Object,
      full: Boolean,
      pp: String,
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        border-bottom: 1px solid #e6ecf0;
        color: ${colors.black};
      }
      .small {
        font-size: 14px;
      }
      .grey {
        color: ${colors.grey};
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
      img.profile {
        width: 35px;
        height: 35px;
        border-radius: 999px;
        pointer-events: none;
      }
      article {
        padding: 1rem 9px;
      }
      .content .retwaat {
        margin-top: 15px;
        border: 1px solid ${colors.lightgrey};
        border-radius: 5px;
        width: 90%;
        padding: 5px;
      }
      .name {
        margin-bottom: 2px;
      }
      .name a {
        color: ${colors.black};
        font-weight: bold;
        text-decoration: none;
      }
      .name a:hover {
        color: ${colors.blue};
      }
    `;
  }

  updateAuthor() {
    this.item.author.get().then((doc) => {
      this.author = doc.data();
      if (this.author.photoURL) {
        firestorage.ref().child(this.author.photoURL).getDownloadURL().then((url) => {
          this.pp = url;
        });
      }
    });
  }

  async firstUpdated() {
    this.updateAuthor();
    if (this.item.child) {
      this.item.child.get().then((doc) => {
        this.child = {
          id: this.item.child.id,
          ...doc.data(),
        };
        this.item = this.child;
        this.updateAuthor();
      });
    }
    if (this.item.parent) {
      this.item.parent.get().then((doc) => {
        this.parent = doc.data();
      });
    }
  }

  render() {
    return html`
      <article ?retwaat=${this.child}>
        ${(this.child || this.parent) && html`
          <div class="container header small">
            <div class="left">
              <app-icon icon="retwaat"></app-icon>
            </div>
            <div class="right grey">
              ${this.child && `${this.author.name} a retwaaté`}
              ${this.parent && 'répondu'}
            </div>
          </div>
        `}
        <div class="container">
          <div class="left">
            <app-profile-picture .source=${this.pp} />
          </div>
          <div class="right">
            <div class="name small">
              ${this.author && html`
                <app-tooltip .tooltip=${this.author.name}>
                  <a href=${`/users/${this.author.name}`}>${this.author.name.slice(1)}</a>
                </app-tooltip>
              `}
              -
              <span class="at grey">
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
              ${(this.full && this.parent) ? html`
                <div class="retwaat">
                ${this.parent
                    && html`<app-twaat-item .item=${this.parent} .full=${false} />`}
                </div>
              ` : null}
              ${this.item.picture && html`<app-twaat-item-picture .item=${this.item} />`}
            </div>
            ${this.full ? html`<app-twaat-item-buttons .item=${this.item} />` : null}
          </div>
        </div>
      </article>
    `;
  }
}

customElements.define('app-twaat-item', Item);
