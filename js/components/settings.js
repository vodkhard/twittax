import { LitElement, html } from 'lit-element';
import { firestorage, fireauth } from '../db';
import userRepository from '../data/repository/users';
import './header';

class Settings extends LitElement {
  constructor() {
    super();
    this.selectedFile = {};
  }

  static get properties() {
    return {
      selectedFile: Object,
    };
  }

  handleFileUploadChange(e) {
    this.selectedFile = e.target.files[0];
  }

  handleFileUploadSubmit() {
    const storageRef = firestorage.ref();
    const uploadTask = storageRef.child(`images/${this.selectedFile.name}`).put(this.selectedFile);
    uploadTask.on('state_changed', () => {}, () => {}, () => {
      const user = fireauth.currentUser;
      const profilImageRef = storageRef.child(`images/${this.selectedFile.name}`);
      profilImageRef.getMetadata().then((metadata) => {
        user.updateProfile({
          photoURL: metadata.fullPath,
        }).then(() => {
          userRepository.update(user.uid, {
            photoURL: metadata.fullPath,
          });
          window.location = '/';
        });
      });
    });
  }


  render() {
    return html`
      <div>
        <input type="file" accept="image/*" @change="${this.handleFileUploadChange}"/>
        <button @click="${this.handleFileUploadSubmit}">Valider</button>
      </div>
      <button @click=${() => fireauth.signOut()}>Logout</button>
    `;
  }
}
customElements.define('app-twittax-settings', Settings);
