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
      .new-tweet {
        outline:none;
        border-radius: 8px;
        border: 1px solid rgb(29, 161, 242);
        resize: none;
        font-size: 15px;
        color: color: rgb(20, 23, 26);
        padding: 8px;
        width: 100%;
        max-width: 550px;
        height: 50px;
      }
      .new-tweet::placeholder { 
        color: #aaa;
      } `;
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
          class="new-tweet"
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
