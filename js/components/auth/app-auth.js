import { LitElement, html, css } from 'lit-element';
import { firestore, fireauth } from '../../db';

class AppAuth extends LitElement {
  constructor() {
    super();
    this.username = '';
    this.email = '';
    this.password = '';
  }

  static get properties() {
    return {
      username: String,
      email: String,
      password: String,
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 600px;
        margin: auto;
      }
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
        height: 250px;
      }
      input {
        background-color: #f5f8fa;
        border: none;
        border-bottom: 2px solid #657786;
        outline: none;
        padding: 10px 15px;
        font-size: 14px;
        border-radius:2px;
      }
      a {
        display: block;
        text-align: center;
      }
    `;
  }

  handleForm(e) {
    e.preventDefault();
    if (!this.email || !this.password) {
      return console.error('Email or password incorrect');
    }
    const username = `@${this.username}`;
    return fireauth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(({ user }) => {
        user.updateProfile({
          displayName: username,
        });
        firestore
          .collection('users')
          .doc(user.uid)
          .set({
            name: username,
            email: user.email,
          });

        this.email = '';
        this.password = '';
        window.location = '/';
      });
  }

  render() {
    return html`
      <h2>S'inscrire</h2>
      <form @submit="${this.handleForm}">
        <label for="username">Nom d'utilisateur</label>
        <input
          type="text"
          placeholder="@username"
          id="username"
          .value="${this.username}"
          @input="${(e) => { this.username = e.target.value; }}"
        />
        <label for="email">E-mail</label>
        <input
          type="email"
          placeholder="twittax@mail.com"
          id="email"
          .value="${this.email}"
          @input="${(e) => { this.email = e.target.value; }}"
        />
        <label for="password">Mot de passe</label>
        <input
          type="password"
          placeholder="@d4$yzXV^FdfDj"
          id="password"
          .value="${this.password}"
          @input="${(e) => { this.password = e.target.value; }}"
        />
        <button type="submit">S'inscrire</button>
      </form>
      <a href="/login">J'ai déjà un compte</a>
    `;
  }
}

customElements.define('app-auth', AppAuth);
