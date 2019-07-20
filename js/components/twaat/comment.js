import { LitElement, html, css } from 'lit-element';
import twaatsRepository from '../../data/repository/twaats';
import { colors } from '../ui/variables';

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
      :host {
        display: block;
      }
      input {
        outline:none;
        border-radius: 8px;
        border: 1px solid ${colors.blue};
        font-size: 14px;
        color: ${colors.black};
        padding: 8px;
        box-sizing: border-box;
        width: 100%;
        max-width: 550px;
        margin-bottom: 5px;
      }
      input::placeholder { 
        color: #aaa;
      } 
      button {
        background-color: ${colors.blue};
        color: #fff;
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
      twaatsRepository
        .add({
          content: this.content,
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
