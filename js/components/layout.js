import { LitElement, html, css } from 'lit-element';
import { fireauth } from '../db';
import './auth/app-auth';
import './auth/app-login';
import './header';

class Layout extends LitElement {
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
      #layout--container {
        max-width: 600px;
        border: 1px solid #e6ecf0;
        border-bottom: none;
        margin: auto;
      }
    `;
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
        <div id="layout--container">
          <slot .user=${this.user}></slot>
        </div>
        <button @click=${fireauth.signOut}>Logout</button>
      `;
    }

    return html`
      <app-auth></app-auth>
      <app-login></app-login>
    `;
  }
}

customElements.define('app-layout', Layout);
