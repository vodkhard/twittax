import { LitElement, html, css } from 'lit-element';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { colors } from '../ui/variables';
import './comment';
import './content';
import '../ui/button';
import '../ui/icon';
import '../ui/tooltip';
import './buttons';
import './picture';

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
        max-width: 100%;
        border-radius: 999px;
        pointer-events: none;
      }
      article {
        padding: 1rem 9px;
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
      app-twaat-comment {
        margin-top: 10px;
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
            <img class="profile" src="/assets/default_profile_400x400.png"/>
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
              ${this.child
                && html`
                  <app-twaats-content .content=${this.child.content}></app-twaats-content>
                `}
              ${this.item.picture && html`<app-twaat-item-picture .item=${this.item} />`}
            </div>
            <app-twaat-item-buttons .item=${this.item} />
            <app-twaat-comment .parent=${this.item.id} />
          </div>
        </div>
      </article>
    `;
  }
}
customElements.define('app-twaat-item', Item);
