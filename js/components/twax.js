import { LitElement, html } from "lit-element";
import "./twaat-input";

class Twax extends LitElement {
  render() {
    return html`
      <div>Salut</div>
      <app-twaat-input></app-twaat-input>
    `;
  }
}

customElements.define("app-twax", Twax);
