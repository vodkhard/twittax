import { LitElement, html, css } from 'lit-element';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import userRepository from '../../data/repository/users';
import twaatsRepository from '../../data/repository/twaats';
import { colors } from '../ui/variables';
import '../ui/button';
import '../ui/icon';
import '../ui/tooltip';

dayjs.extend(relativeTime);

class Buttons extends LitElement {
  constructor() {
    super();
    this.item = {};
    this.userLiked = false;
    this.userRetwaated = false;
  }

  static get properties() {
    return {
      item: Object,
      userLiked: Boolean,
      userRetwaated: Boolean,
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
    this.userLiked = this.item.laaks
      .find(value => value.isEqual(userRepository.getCurrentUser())) !== undefined;
    this.userRetwaated = this.item.retwaats
      .find(value => value.isEqual(userRepository.getCurrentUser())) !== undefined;
  }

  async onLike() {
    if (this.userLiked) {
      twaatsRepository.delLaaked(this.item.id);
      this.userLiked = false;
    } else {
      twaatsRepository.addLaaked(this.item.id);
      this.userLiked = true;
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
    if (this.userRetwaated === false) {
      twaatsRepository.add({
        child: twaatsRepository.get(this.item.id),
      }).then(() => {
        this.userRetwaated = true;
        twaatsRepository.addRetwaat(this.item.id);
      });
      this.userRetwaated = true;
    }
  }

  onComment() {
    // TODO: toggle le form pour commenter
  }

  render() {
    return html`
      <app-button icon="comment" @click=${this.onComment}>0</app-button>
      <app-button
        .color=${this.userRetwaated ? '#17bf63' : null}
        icon="retwaat"
        @click=${this.onRetwaat}
      >${this.item.retwaats.length}</app-button>
      <app-button
        .icon=${this.userLiked ? 'like-full' : 'like'}
        .color=${this.userLiked ? 'red' : null}
        @click=${this.onLike}
      >${this.item.laaks.length || 0}</app-button>
      <app-button icon="delete" @click=${this.onDelete}></app-button>
    `;
  }
}
customElements.define('app-twaat-item-buttons', Buttons);
