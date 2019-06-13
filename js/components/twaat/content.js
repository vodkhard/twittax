import { LitElement, html } from 'lit-element';

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

  get parsedContent() {
    return this.content.split(' ').map((content) => {
      if (content.startsWith('#')) {
        return html`
          <a href=${`/tags/${content.slice(1)}`}>${content}</a>
        `;
      }
      if (content.startsWith('@')) {
        return html`
          <a href=${`/users/${content}`}>${content}</a>
        `;
      }
      return html`
        ${content}
      `;
    });
  }

  render() {
    return html`
      <p>${this.parsedContent}</p>
    `;
  }
}
customElements.define('app-twaats-content', Content);
