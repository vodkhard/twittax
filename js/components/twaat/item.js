import { LitElement, html, css } from 'lit-element';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import twaatsRepository from '../../data/repositroy/twaats';
import './comment';
import './content';
import '../ui/icon';

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
      .tweet {
        box-direction: normal;
        box-orient: horizontal;
        flex-direction: row;
        margin-left: -5px;
        margin-right: -5px;
        display: flex;
      }
      .left {
        max-width: 46px;
        min-width: 0px;
        flex-basis: 0px;
        box-flex: 1;
        flex-grow: 1;
        margin-left: 5px;
        margin-right: 5px;
      }
      img {
        max-width: 100%;
        border-radius: 999px;
        pointer-events: none;
      }
      .right {
        box-flex: 7;
        flex-grow: 7;
        flex-basis: 0px;
        box-flex: 1;
        flex-grow: 1;
        margin-left: 5px;
        margin-right: 5px;
      }
      article {
        padding: 1rem 9px;
      }
      .content-tweet {
        box-direction: normal;
        box-orient: horizontal;
        flex-direction: row;
        margin-left: -5px;
        margin-right: -5px;
      }
      .tweet-image {
        max-width: 46px;
        flex-basis: 0px;
        box-flex: 1;
        flex-grow: 1;
        margin-left: 5px;
        margin-right: 5px;
      }
      .tweet-text {
        box-flex: 7;
        flex-grow: 7;
        min-width: 0px;
        flex-basis: 0px;
        margin-left: 5px;
        margin-right: 5px;
      }
      article {
        border-bottom: 1px solid #e6ecf0;
        padding: 1rem 9px;
      }
      .article-tweet {
        display: block;
      }
      .name {
        font-size: 14px;
        line-height: 1.3125;
        font-weight: bold;
        color: #14171a;
        margin-bottom: 2px;
      }
      .name .at {
        color: #657786;
        font-weight: 400;
      }
      .name .at a {
        color: #657786;
        font-weight: 400;
        text-decoration: none;
      }
      .content {
        color: #14171a;
        line-height: 1.3125;
        font-size: 14.5px;
        font-weight: 400;
      }
      .retweet {
        box-direction: normal;
        box-orient: horizontal;
        flex-direction: row;
        margin-left: -5px;
        margin-right: -5px;
        display: flex;
      }
      .text {
        box-flex: 7;
        flex-grow: 7;
        min-width: 0px;
        flex-basis: 0px;
        box-align: start;
        align-items: flex-start;
        margin-left: 2px;
        margin-right: 5px;
      }
      .text span {
        font-weight: 400;
        font-size: 14px;
        min-width: 0px;
        line-height: 1.3125;
        color: #657786;
        box-sizing: border-box;
        display: inline;
      }
      .buttons {
        display: flex;
        max-width: 425px;
        box-direction: normal;
        box-orient: horizontal;
        flex-direction: row;
        margin-top: 10px;
        box-pack: justify;
        justify-content: space-between;
      }
      .button {
        box-pack: start;
        justify-content: flex-start;
        flex-basis: 0px;
        box-flex: 1;
        flex-grow: 1;
        box-direction: normal;
        box-orient: horizontal;
        flex-direction: row;
      }
      .button-svg:hover {
        margin-top: -0px;
        border-radius: 999px;
        background-color: rgba(29, 161, 242, 0.1);
        padding: 8px;
        margin: -8px;
      }
      .button-svg svg:hover {
        fill: #1da1f2;
      }
      .button-svg {
        font-size: 15px;
        box-pack: start;
        justify-content: flex-start;
        min-width: 0px;
        line-height: 1.3125;
        color: #657786;
        box-align: center;
        align-items: center;
        display: inline-flex;
        cursor: pointer;
        transition: 0.1s;
      }
      .button-svg svg {
        width: 1.25em;
        position: relative;
        vertical-align: text-bottom;
      }
      .count {
        display: inline-flex;
        overflow-x: hidden;
        overflow-y: hidden;
        position: absolute;
        margin-top: 1px;
      }
      .count span {
        position: relative;
        margin-left: 10px;
        color: #657786;
        min-width: 0px;
        font-size: 15px;
      }
      .tooltip {
        display: inline;
        position: relative;
        cursor: pointer;
      }
      .tooltip:hover:after {
        font-size: 12px;
        font-weight: 300;
        background: #1f2224;
        border-radius: 4px;
        bottom: 26px;
        color: #fff;
        content: attr(time);
        left: 50%;
        transform: translateX(-50%);
        padding: 8px 10px;
        position: absolute;
        z-index: 98;
        white-space: pre;
      }
      .tooltip:hover:before {
        border: solid;
        border-color: #1f2224 transparent;
        border-width: 6px 6px 0 6px;
        bottom: 20px;
        content: '';
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        z-index: 99;
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
    this.onComment = () => {
      console.log('TODO: toggle le form pour commenter');
    };
  }

  render() {
    return html`
      <div class="article-tweet">
        <article>
          ${this.child
            && html`
              <div class="retweet">
                <app-icon icon="retwaat"></app-icon>
                <div class="text">
                  <span>retweeté</span>
                </div>
              </div>
            `}
          
            ${this.item.parent
              && html`
                <div class="retweet">
                  <app-icon icon="retwaat"></app-icon>
                  <div class="text">
                    <span>répondu</span>
                  </div>
                </div>
              `}

          <div class="tweet">
            <div class="left">
              <img
                src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
              />
            </div>
            <div class="right">
              <div class="name">
                ${this.author
                  && html`
                    ${this.author.name.slice(1)}
                  `}
                <span class="at"
                  >${this.author
                    && html`
                      <a href=${`/users/${this.author.name}`}>${this.author.name}</a>
                    `}
                  ·
                  ${this.item.createdAt
                    && html`
                      <span
                        class="tooltip"
                        time="${dayjs(this.item.createdAt.toDate()).format('h:mm - D MMMM Y').toLowerCase()}"
                      >
                        ${dayjs(this.item.createdAt.toDate()).fromNow()}
                      </span>
                    `}</span
                >
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
              <div class="buttons">
                <div class="button">
                  <div class="button-svg" @click=${this.onComment}>
                    <app-icon icon="comment"></app-icon>
                  </div>
                  <div class="count"><span>0</span></div>
                </div>

                <div class="button">
                  <div class="button-svg" @click=${this.onRetwaat}>
                    <app-icon icon="retwaat"></app-icon>
                  </div>
                  <div class="count"><span>${this.item.retwaats}</span></div>
                </div>

                <div class="button">
                  <div class="button-svg" @click=${() => this.onUpdate('like')}>
                    <app-icon icon="like"></app-icon>
                  </div>
                  <div class="count"><span>${this.item.like}</span></div>
                </div>

                <div class="button" title="Supprimer">
                  <div class="button-svg" @click=${this.onDelete}>
                    <app-icon icon="delete"></app-icon>
                  </div>
                </div>
              </div>

              <app-twaat-comment .parent=${this.item.id} />
            </div>
          </div>
        </article>
      </div>
    `;
  }
}
customElements.define('app-twaat-item', Item);
