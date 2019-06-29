import { LitElement, html, css } from 'lit-element';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { fireauth } from '../../db';
import { colors } from '../ui/variables';
import twaatsRepository from '../../data/repository/twaats';
import './comment';
import './content';
import '../ui/button';
import '../ui/icon';
import '../ui/tooltip';
import { fireauth, firestore } from '../../db';

dayjs.extend(relativeTime);

class Item extends LitElement {
  constructor() {
    super();
    this.item = {};
    this.author = null;
    this.child = null;
    this.userLiked = false;
    this.userRetwaat = false;
  }

  static get properties() {
    return {
      item: Object,
      author: Object,
      child: Object,
      userLiked: Boolean,
      userRetwaat: Boolean,
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
      img {
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
      .button-container {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        max-width: 425px;
      }
      .is-retwaatax app-icon > svg {
        fill: #17bf63 !important;
      }
      app-button {
        color: ${colors.grey};
        font-weight: normal;
      }
      app-twaat-comment {
        margin-top: 10px;
      }
    `;
  }

  async firstUpdated() {
    this.userLiked = await twaatsRepository.hasUserLaaked(this.item.id);
    this.userRetwaat = await twaatsRepository.hasUserRetwaat(this.item.id);
    this.item.author.get().then((doc) => {
      this.author = doc.data();
    });
    if (this.item.child) {
      this.item.child.get().then((doc) => {
        this.child = doc.data();
      })
    }
    this.onUpdate = type => twaatsRepository.update(this.item.id, {
      [type]: this.item[type] + 1,
    });
    this.onRetwaat = async () => {
      try {
        console.log(await twaatsRepository.hasUserRetwaat(this.item.id));
        if(await twaatsRepository.hasUserRetwaat(this.item.id) === false){
          twaatsRepository.addRetwaat(this.item.id);
          twaatsRepository.add({
            child: twaatsRepository.get(this.item.id),
            laaks: [],
            retwaats: [],
          });
          this.userRetwaat = true;
        }
      } catch(e) {
        console.log(e);
      }
    };
    this.onLike = async () => {
      try {
        if(await twaatsRepository.hasUserLaaked(this.item.id)){
          twaatsRepository.delLaaked(this.item.id);
          this.userLiked = false;
        }else{
          twaatsRepository.addLaaked(this.item.id);
          this.userLiked = true;
        }
      } catch(e) {
        console.log(e);
      }
    };
    this.onDelete = () => {
      if(this.item.child){
        twaatsRepository.delRetwaat(this.item.child);
      }
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
            </div>
            <div class="button-container grey">
              <app-button icon="comment" @click=${this.onComment}>0</app-button>
              <app-button
                .color=${ this.userRetwaat ? '#17bf63' : '' }
                icon="retwaat"
                @click=${this.onRetwaat}
              >${Object.keys(this.item.retwaats).length}</app-button>
              <app-button
                .icon=${ this.userLiked ? 'like-full' : 'like' }
                .color=${ this.userLiked ? 'red' : '' }
                @click=${this.onLike}
              >${Object.keys(this.item.laaks).length}</app-button>
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
