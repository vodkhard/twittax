import { LitElement, html, css } from 'lit-element';
import userRepository from '../data/repositroy/users';
import { colors } from './ui/variables';
import './twaat/list';
import './header';

class Profile extends LitElement {
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
    .fetching {
      color: ${colors.black};
      font-size: 14px;
      margin: auto;
      width: 100%;
      text-align: center;
      padding-top: 20px;
    }`;
  }

  async firstUpdated() {
    this.user = await userRepository.getByName(this.location.params.name);
  }

  render() {
    return html`
      <app-header></app-header>
      ${this.user
    ? html`<app-twaat-list .conditions=${[['author', '==', userRepository.get(this.user.id)]]} />`
    : html`<div class="fetching">Fetching twaats...</div>
      `}
    `;
  }
}
customElements.define('app-twittax-profile', Profile);
