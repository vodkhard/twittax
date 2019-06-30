/* eslint-disable no-tabs */
import { LitElement, html, css } from 'lit-element';
import { fireauth, firestorage } from '../db';
import './twaat/input';
import './twaat/list';
import './auth/app-auth';
import './auth/app-login';
import './header';

class Twax extends LitElement {
  constructor() {
    super();
    this.user = {};
    this.image = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';
  }

  static get properties() {
    return {
      user: Object,
      image: String,
    };
  }

  static get styles() {
    return css`
      article {
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
      firestorage.ref().child(user.photoURL).getDownloadURL().then((url) => {
        this.image = url;
      })
        .catch((error) => {
        });
    });
  }

  render() {
    if (this.user) {
      return html`
        <app-header></app-header>
        <article class="container">
          <div class="left">
            <img src="${this.image}">
          </div>
          <div class="right">
             <app-twaat-input></app-twaat-input> 
          </div>
        </article>

        <app-twaat-list></app-twaat-list>
        `;
    }

    return html`
      <app-auth></app-auth>
      <app-login></app-login>
    `;
  }
}

customElements.define('app-twittax', Twax);
