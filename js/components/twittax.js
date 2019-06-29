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
    this.image = '';
  }

  static get properties() {
    return {
      user: Object,
    };
  }

  static get styles() {
    return css`
      .sub_header {
        padding: 1rem 9px;
        border-bottom: 1px solid #e6ecf0;
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
      img {
        max-width: 100%;
        border-radius: 999px;
        pointer-events: none;
      }`;
  }

  firstUpdated() {
    fireauth.onAuthStateChanged((user) => {
      this.user = user;
      const storageRef = firestorage.ref();
      storageRef.child(user.photoURL).getDownloadURL().then((url) => {
        this.image = url;
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  render() {
    return html`
      <div class="sub_header">
        <div class="left">
          <img src="${this.image}">
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
