import { LitElement, html, css } from 'lit-element';
import userRepository from '../../data/repository/users';
import { colors } from '../ui/variables';
import { notification } from './notification';
import { fireauth } from '../../db';

class Content extends LitElement {
  constructor() {
    super();
    this.content = '';
  }

  static get properties() {
    return {
      content: String,
    };
  }

  static get styles() {
    return css`
      .link {
        color: ${colors.blue};
        text-decoration: none;
      }`;
  }

  get parsedContent() {
    return this.content.split(' ').map((content) => {
      if (content.startsWith('#')) {
        return html`
          <a class="link" href=${`/tags/${content.slice(1)}`}>${content}</a>
        `;
      }
      if (content.startsWith('@')) {
        userRepository.getByName(content).then((u) => {
          if (u.id === fireauth.currentUser.uid) {
            notification("You've been mentioned in a twaat !");
          }
        });
        return html`
          <a class="link" href=${`/users/${content}`}>${content}</a>
        `;
      }
      return html`
        ${content}
      `;
    });
  }

  render() {
    return html`
      <span>${this.parsedContent}</span>
    `;
  }
}
customElements.define('app-twaats-content', Content);
