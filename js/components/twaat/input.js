import { LitElement, html, css } from 'lit-element';
import twaatsRepository from '../../data/repositroy/twaats';

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

  static get styles() {
    return css`
      textarea {
        outline:none;
        border-radius: 8px;
        border: 1px solid #1DA1F2;
        resize: none;
        font-size: 15px;
        color: #14171A;
        padding: 8px;
        box-sizing: border-box;
        width: 100%;
        max-width: 550px;
        height: 55px;
      }
      textarea::placeholder { 
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
      }`;
  }

  firstUpdated() {
    this.twaatInput = (e) => {
      this.content = e.target.value;
    };

    this.handleSubmit = (e) => {
      e.preventDefault();
      const tags = [...this.content.matchAll(/\B\#\w+/gm)].map(([match]) => match);
      twaatsRepository
        .add({
          content: this.content,
          like: 0,
          retwaats: 0,
          tags: tags || [],
        })
        .then(() => {
          this.content = '';
        });
    };
  }

  render() {
    return html`
      <form @submit="${this.handleSubmit}">
        <textarea
          name="content"
          placeholder="Quoi de neuf ?"
          .value="${this.content}"
          @input=${this.twaatInput}
        ></textarea>
        <br>
        <button type="submit">Twaat</button>
      </form>
    `;
  }
}

customElements.define('app-twaat-input', Input);
