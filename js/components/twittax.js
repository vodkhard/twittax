import { LitElement, html } from 'lit-element';
import { fireauth } from '../db';
import './twaat/input';
import './twaat/list';
import './auth/app-auth';
import './auth/app-login';

const auth = (user = null) => {
  if (user) {
    return html`
      <div>${user.displayName}</div>
    `;
  }
  return html`
    <app-auth></app-auth>
    <app-login></app-login>
  `;
};

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

  render() {
    return html`
      <h1>Twittax</h1>
      ${auth(this.user)}
      <app-twaat-input></app-twaat-input>
      <app-twaat-list></app-twaat-list>
    `;
  }
}

customElements.define('app-twittax', Twax);
