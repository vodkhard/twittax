import { LitElement, html } from 'lit-element';
import twaatsRepository from '../../data/repositroy/twaats';

class Comment extends LitElement {
  constructor() {
    super();
    this.content = '';
  }

  static get properties() {
    return {
      content: String,
      handleSubmit: Function,
      parent: String,
    };
  }

  firstUpdated() {
    this.twaatInput = (e) => {
      this.content = e.target.value;
    };

    this.handleSubmit = (e) => {
      e.preventDefault();
      twaatsRepository
        .add({
          content: this.content,
          like: 0,
          retwaats: 0,
          parent: twaatsRepository.get(this.parent),
        })
        .then(() => {
          this.content = '';
        });
    };
  }

  render() {
    return html`
      <form @submit="${this.handleSubmit}">
        <label for="content">Twaat :</label>
        <input
          type="text"
          placeholder="Commentez le twaat..."
          .value="${this.content}"
          @input=${this.twaatInput}
        />
        <button type="submit">Comment!</button>
      </form>
    `;
  }
}

customElements.define('app-twaat-comment', Comment);
