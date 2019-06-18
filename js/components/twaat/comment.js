import { LitElement, html, css } from 'lit-element';
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

  static get styles() {
    return css`
      input {
        outline:none;
        border-radius: 8px;
        border: 1px solid #1DA1F2;
        resize: none;
        font-size: 14px;
        color: #14171A;
        padding: 8px;
        box-sizing: border-box;
        width: 100%;
        max-width: 550px;
        margin-bottom: 4px;
      }
      input::placeholder { 
        color: #aaa;
      } 
      button {
        background-color: #1DA1F2;
        color: white;
        font-weight: bold;
        padding: 6px 15px;
        border-radius: 30px;
        font-size: 13px;
        border: none;
        cursor: pointer;
        outline: none;
      }
      form {
        margin-top: 10px;
        transition: 0.2s;
      }`;
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
        <input
          type="text"
          placeholder="Répondre..."
          .value="${this.content}"
          @input=${this.twaatInput}
        />
        <br>
        <button type="submit">Twaat</button>
      </form>
    `;
  }
}

customElements.define('app-twaat-comment', Comment);
