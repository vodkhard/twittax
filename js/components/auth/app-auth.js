import { LitElement, html } from 'lit-element';
import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../../db';

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

  handleForm(e) {
    e.preventDefault();
    if (!this.email || !this.password) {
      return console.error('Email or password incorrect');
    }
    return firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(({ user }) => {
        console.log('Registration successful', user);
        localStorage.setItem('uid', user.uid);
        db.collection('users')
          .doc(user.uid)
          .set({
            name: `@${this.username}`,
          });
        this.email = '';
        this.password = '';
      })
      .catch(console.error);
  }

  render() {
    return html`
      <h2>Registration :</h2>
      <form @submit="${this.handleForm}">
        <input
          type="text"
          placeholder="Username"
          .value="${this.username}"
          @input="${e => (this.username = e.target.value)}"
        />
        <input
          type="email"
          placeholder="Email"
          .value="${this.email}"
          @input="${e => (this.email = e.target.value)}"
        />
        <input
          type="password"
          placeholder="Password"
          .value="${this.password}"
          @input="${e => (this.password = e.target.value)}"
        />
        <button type="submit">Register</button>
      </form>
    `;
  }
}

customElements.define('app-auth', AppAuth);
