import { LitElement, html, css } from 'lit-element';
import { colors } from '../ui/variables';

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
