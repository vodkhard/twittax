import { LitElement, html } from 'lit-element';
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

  firstUpdated() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        localStorage.setItem('logged', false);
        return console.log('logout');
      }
      localStorage.setItem('logged', true);
      this.dispatchEvent(new CustomEvent('user-logged', { detail: { user } }));
    });
  }

  handleForm(e) {
    e.preventDefault();
    if (!this.email || !this.password) return console.error('Email or password incorrect');
    return firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(({ user }) => {
        console.log('Login successful!', user);
        localStorage.setItem('uid', user.uid);
        this.email = '';
        this.password = '';
      })
      .catch(console.error);
  }

  render() {
    return html`
      <h2>Login :</h2>
      <form @submit="${this.handleForm}">
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
        <button type="submit">Login</button>
      </form>
    `;
  }
}

customElements.define('app-login', AppLogin);
