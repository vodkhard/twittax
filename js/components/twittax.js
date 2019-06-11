import { LitElement, html } from 'lit-element';
import { fireauth } from '../db';
import './twaat/input';
import './twaat/list';
import './auth/app-auth';
import './auth/app-login';

class Twax extends LitElement {
  constructor() {
    super();
    this.user = {};
  }

  static get properties() {
    return {
      user: Object,
    };
  }

  firstUpdated() {
    fireauth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  get auth() {
    if (this.user) {
      return html`
        <div>${this.user.displayName}</div>
      `;
    }
    return html`
      <app-auth></app-auth>
      <app-login></app-login>
    `;
  }

  render() {
    return html`
      <h1>Twittax</h1>
      ${this.auth}
      <app-twaat-input></app-twaat-input>
      <app-twaat-list></app-twaat-list>
    `;
  }
}

customElements.define('app-twittax', Twax);
