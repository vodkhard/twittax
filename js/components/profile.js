import { LitElement, html } from 'lit-element';
import userRepository from '../data/repositroy/users';
import './twaat/list';

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

  async firstUpdated() {
    this.user = await userRepository.getByName(this.location.params.name);
  }

  render() {
    return html`
      <div>Salut ${this.location.params.name}</div>
      ${this.user
    ? html`
            <app-twaat-list .conditions=${[['author', '==', userRepository.get(this.user.id)]]} />
          `
    : html`
            <div>Fetching twaats...</div>
          `}
    `;
  }
}
customElements.define('app-twittax-profile', Profile);
