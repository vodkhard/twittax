import { LitElement, html } from 'lit-element';
import firebase from 'firebase/app';
import 'firebase/auth';
import './twaat/input';
import './twaat/list';
import './auth/app-auth';
import './auth/app-login';

class Twax extends LitElement {
  constructor() {
    super();
    this.logged = true;
  }

  static get properties() {
    return {
      logged: Boolean,
    };
  }

  firstUpdated() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        localStorage.setItem('uid', user.uid);
        this.logged = true;
      } else {
        localStorage.removeItem('uid');
        this.logged = false;
      }
    });
  }

  render() {
    return html`
      <h1>Twittax</h1>
      ${!this.logged
    ? html`
            <app-auth></app-auth>
            <app-login></app-login>
          `
    : ''}
      <app-twaat-input></app-twaat-input>
      <app-twaat-list></app-twaat-list>
    `;
  }
}

customElements.define('app-twittax', Twax);
