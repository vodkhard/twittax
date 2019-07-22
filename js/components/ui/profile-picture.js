import { LitElement, html, css } from 'lit-element';
import defaultPic from '/assets/default_profile_400x400.png';

class ProfilePicture extends LitElement {
  constructor() {
    super();
    this.source = defaultPic;
  }

  static get properties() {
    return {
      source: String,
    };
  }

  static get styles() {
    return css`
      img {
        width: 50px;
        height: 50px;
        border-radius: 999px;
        pointer-events: none;
        object-fit: cover;
      }
    `;
  }

  updated() {
    if (this.source === undefined || this.source === null) {
      this.source = defaultPic;
    }
  }

  render() {
    return html`
      <img class="profile" src=${this.source} alt="profile picture" />
    `;
  }
}

customElements.define('app-profile-picture', ProfilePicture);
