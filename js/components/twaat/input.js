import { LitElement, html } from 'lit-element';
import db from '../../db';

class Input extends LitElement {
  constructor() {
    super();
    this.content = '';
  }

  static get properties() {
    return {
      content: String,
      handleSubmit: Function,
    };
  }

  firstUpdated() {
    this.twaatInput = (e) => {
      this.content = e.target.value;
    };

    this.handleSubmit = (e) => {
      e.preventDefault();
      db.collection('twaats')
        .add({
          content: this.content,
          like: 0,
          author: db.collection('users').doc(localStorage.getItem('uid')),
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
        <textarea
          name="content"
          rows="5"
          placeholder="Quoi de neuf ?"
          .value="${this.content}"
          @input=${this.twaatInput}
        ></textarea>
        <button type="submit">Twaat!</button>
      </form>
    `;
  }
}

customElements.define('app-twaat-input', Input);
