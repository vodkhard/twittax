import { LitElement, html, css } from 'lit-element';
import firebase from 'firebase/app';
import 'firebase/auth';

class AppLogin extends LitElement {
  constructor() {
    super();
    this.email = '';
    this.password = '';
  }

  static get properties() {
    return {
      email: String,
      password: String,
    };
  }

  static get styles() {
    return css`
      h2 {
        margin-top: 50px;
        text-align: center;
        font-size: 18px;
      }
      button {
        background-color: #1DA1F2;
        color: white;
        font-weight: bold;
        padding: 10px 18px;
        border-radius: 30px;
        font-size: 15px;
        border: none;
        cursor: pointer;
        outline: none;
      }
      form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 20px;
        height: 180px;
      }
      input {
        background-color: #f5f8fa;
        border: none;
        border-bottom: 2px solid #657786;
        outline: none;
        padding: 10px 15px;
        font-size: 14px;
        border-radius:2px;
      }`;
  }

  handleForm(e) {
    e.preventDefault();
    if (!this.email || !this.password) return console.error('Email or password incorrect');
    return firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.email = '';
        this.password = '';
      })
      .catch(console.error);
  }

  render() {
    return html`
      <h2>Se connecter</h2>
      <form @submit="${this.handleForm}">
        <input
          type="email"
          placeholder="E-mail"
          .value="${this.email}"
          @input="${e => (this.email = e.target.value)}"
        />
        <input
          type="password"
          placeholder="Password"
          .value="${this.password}"
          @input="${e => (this.password = e.target.value)}"
        />
        <button type="submit">Se connecter</button>
      </form>
    `;
  }
}

customElements.define('app-login', AppLogin);
