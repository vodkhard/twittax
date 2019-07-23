import { LitElement, html, css } from 'lit-element';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import userRepository from '../../data/repository/users';
import twaatsRepository from '../../data/repository/twaats';
import { colors } from '../ui/variables';
import { fieldValue, fireauth } from '../../db';
import '../ui/button';
import '../ui/icon';
import '../ui/tooltip';
import './input';

dayjs.extend(relativeTime);

class Buttons extends LitElement {
  constructor() {
    super();
    this.item = {};
    this.liked = false;
    this.retwaated = false;
  }

  static get properties() {
    return {
      item: Object,
      liked: Boolean,
      retwaated: Boolean,
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        max-width: 425px;
      }
      app-button {
        color: ${colors.grey};
        font-weight: normal;
      }
    `;
  }

  updated() {
    this.liked = this.item.laaks
      .find(value => value.isEqual(userRepository.getCurrentUser())) !== undefined;
    this.retwaated = this.item.retwaats
      .find(value => value.isEqual(userRepository.getCurrentUser())) !== undefined;
  }

  async onLike() {
    if (this.liked) {
      twaatsRepository.delLaaked(this.item.id);
      this.liked = false;
    } else {
      twaatsRepository.addLaaked(this.item.id);
      this.liked = true;
    }
    return true;
  }

  onDelete() {
    if (this.item.child) {
      twaatsRepository.unretwaat(this.item.child);
    }
    twaatsRepository.del(this.item.id);
  }

  onRetwaat() {
    if (this.retwaated === false) {
      twaatsRepository.add({
        child: twaatsRepository.get(this.item.id),
      }).then(() => {
        this.retwaated = true;
        twaatsRepository.addRetwaat(this.item.id);
      });
      this.retwaated = true;
    }
  }

  onComment({ detail: ref }) {
    twaatsRepository.update(this.item.id, {
      comments: fieldValue.arrayUnion(ref),
    });
  }

  render() {
    return html`
      <app-twaat-input .parent=${this.item} @onAdd=${this.onComment}>
        <app-button icon="comment">${this.item.comments.length}</app-button>
      </app-twaat-input>
      <app-button
        .color=${this.retwaated ? '#17bf63' : null}
        icon="retwaat"
        @click=${this.onRetwaat}
      >${this.item.retwaats.length}</app-button>
      <app-button
        .icon=${this.liked ? 'like-full' : 'like'}
        .color=${this.liked ? 'red' : null}
        @click=${this.onLike}
      >${this.item.laaks.length}</app-button>
      ${this.item.author.id === fireauth.currentUser.uid
    ? html`<app-button icon="delete" @click=${this.onDelete}></app-button>` : null}
    `;
  }
}
customElements.define('app-twaat-item-buttons', Buttons);
