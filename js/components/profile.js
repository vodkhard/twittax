import { LitElement, html, css } from 'lit-element';
import { fireauth } from '../db';
import userRepository from '../data/repository/users';
import { colors } from './ui/variables';
import './twaat/list';
import './header';
import './ui/button';

class Profile extends LitElement {
  constructor() {
    super();
    this.user = null;
    this.authUser = null;
    this.followed = false;
  }

  static get properties() {
    return {
      user: Object,
      authUser: Object,
      followed: Boolean,
    };
  }

  static get styles() {
    return css`
    .fetching {
      color: ${colors.black};
      font-size: 14px;
      margin: auto;
      width: 100%;
      text-align: center;
      padding-top: 20px;
    }`;
  }

  async firstUpdated() {
    this.user = await userRepository.getByName(this.location.params.name);
    this.authUser = fireauth.currentUser;
    this.followed = await userRepository.isFollowing(this.user.id);
  }

  toggleFollow() {
    if (this.followed) {
      userRepository.delFollower(this.user.id);
      this.followed = false;
    } else {
      userRepository.addFollower(this.user.id);
      this.followed = true;
    }
  }

  render() {
    return html`
      ${this.user
    ? html`${this.user.id === this.authUser.uid ? html`<app-button type=button>Update my profile</app-button>`
      : html`<app-button @click=${this.toggleFollow}>${this.followed ? 'Unfollax' : 'Follax'}</app-button>`
    }
            <app-twaat-list .conditions=${[['author', '==', userRepository.get(this.user.id)]]} />
          `
    : html`
            <div class="fetching">Fetching twaats...</div>
          `}
    `;
  }
}
customElements.define('app-twittax-profile', Profile);
