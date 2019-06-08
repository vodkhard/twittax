import { LitElement, html } from "lit-element";
import dayjs from "dayjs/esm/index";
import { database } from "../db";

class TwaatInput extends LitElement {
  constructor() {
    super();
    this.text = "test";
  }

  static get properties() {
    return {
      text: {
        type: String,
        reflect: true
      },
      handleSubmit: {
        type: Function
      }
    };
  }

  firstUpdated() {
    this.handleSubmit = e => {
      e.preventDefault();
      database
        .ref("/twaats")
        .child('@vodkhard')
        .set({
          content: this.text,
          createdAt: dayjs().valueOf()
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
          .value="${this.text}"
        ></textarea>
        <button type="submit">Twaat!</button>
      </form>
    `;
  }
}

customElements.define("app-twaat-input", TwaatInput);
