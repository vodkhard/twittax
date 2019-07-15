
import { LitElement, html, css } from 'lit-element';
import { colors } from '../ui/variables';
import twaatsRepository from '../../data/repository/twaats';

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
      :host {
        display: block;
      }
      textarea {
        outline:none;
        border-radius: 8px;
        border: 1px solid ${colors.blue};
        resize: none;
        font-size: 14px;
        color: ${colors.black};
        padding: 8px;
        box-sizing: border-box;
        width: 100%;
        max-width: 550px;
        height: 55px;
        margin-bottom: 5px;
      }
      textarea::placeholder { 
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
