import { LitElement, html, css } from 'lit-element';
import { fireauth } from '../db';
import './auth/app-auth';
import './auth/app-login';
import './header';
import logo from '/assets/logo.jpg';
import { colors } from './ui/variables';

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
      #layout--home {
        max-width: 600px;
        margin: 20vh auto auto;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      a {
        text-decoration: none;
        background-color: ${colors.blue};
        color: #fff;
        padding: 6px 15px;
        border-radius: 30px;
        font-size: 24px;
        border: none;
        cursor: pointer;
        outline: none;
        width: 150px;
        text-align: center;
        margin: 10px 0;
      }
      a#register {
        background-color: #fff;
        border: 1px solid ${colors.blue};
        color: ${colors.blue};
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
      `;
    }

    return html`
      <div id="layout--home">
        <div>
          <img src=${logo} alt="logo" width="300" />
        </div>
        <a href="/login" id="login" aria-label="Login">Login</a>
        <a href="/register" id="register" aria-label="Register">Register</a>
      </div>
    `;
  }
}

customElements.define('app-layout', Layout);
