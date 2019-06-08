import { LitElement, html } from 'lit-element';
import './twaat/input';
import './twaat/list';
import './auth/app-auth';
import './auth/app-login';

class Twax extends LitElement {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <h1>Twittax</h1>
      ${localStorage.getItem('uid') === null
        && html`
          <app-auth></app-auth>
          <app-login></app-login>
        `}
      <app-twaat-input></app-twaat-input>
      <app-twaat-list></app-twaat-list>
    `;
  }
}

customElements.define('app-twittax', Twax);
