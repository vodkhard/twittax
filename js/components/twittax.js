/* eslint-disable no-tabs */
import { LitElement, html, css } from 'lit-element';
import { fireauth, firestorage } from '../db';
import userRepository from '../data/repository/users';
import './twaat/input';
import './twaat/list';
import './auth/app-auth';
import './auth/app-login';
import './header';

class Twax extends LitElement {
  constructor() {
    super();
    this.user = null;
  }

  static get properties() {
    return {
      user: Object,
      image: String,
    };
  }

  static get styles() {
    return css`
      .sub_header {
        padding: 1rem 10px;
        border-bottom: 1px solid #e6ecf0;
        display: flex;
        align-items: center;
      }
      .container {
        display: flex;
      }
      .container > div {
        margin: 0 5px;
      }
      .right {
        flex-grow: 1;
        margin-left: 10px;
      }`;
  }

  firstUpdated() {
    fireauth.onAuthStateChanged((user) => {
      this.user = user;
      if (user) {
        firestorage.ref().child(user.photoURL).getDownloadURL().then((url) => {
          this.image = url;
        });
      }
    });
  }

  render() {
    return html`
      <div class="sub_header">
        <div class="left">
          <app-profile-picture .source=${this.image} />
        </div>
        <div class="right">
           <app-twaat-input></app-twaat-input> 
        </div>
      </div>

      ${this.user && html`<app-twaat-list 
        .conditions=${[['subscribers', 'array-contains', userRepository.get(this.user.uid)]]}
      ></app-twaat-list>`}
    `;
  }
}

customElements.define('app-twittax', Twax);
