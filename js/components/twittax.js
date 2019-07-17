/* eslint-disable no-tabs */
import { LitElement, html, css } from 'lit-element';
import { fireauth } from '../db';
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
    });
  }

  render() {
    if (this.user) {
      return html`
        <app-header></app-header>
        <article class="container">
          <div class="left">
            <img src="/assets/default_profile_400x400.png">
          </div>
          <div class="right">
             <app-twaat-input></app-twaat-input> 
          </div>
        </article>

        <app-twaat-list 
          .conditions=${[['subscribers', 'array-contains', userRepository.get(this.user.uid)]]}
        ></app-twaat-list>
        `;
    }

    return html`
      <app-auth></app-auth>
      <app-login></app-login>
    `;
  }
}

customElements.define('app-twittax', Twax);
