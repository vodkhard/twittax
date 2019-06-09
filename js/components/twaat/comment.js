import { LitElement, html } from 'lit-element';
import { firestore, fireauth } from '../../db';

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
      firestore
        .collection('twaats')
        .add({
          content: this.content,
          like: 0,
          retwaats: 0,
          author: firestore.collection('users').doc(fireauth.currentUser.uid),
          parent: firestore.collection('twaats').doc(this.parent),
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
