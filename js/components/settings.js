import { LitElement, html } from 'lit-element';
import { firestorage, fireauth } from '../db';
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
    uploadTask.on('state_changed', () => {
    }, (error) => {
    }, () => {
      const user = fireauth.currentUser;
      const profilImageRef = storageRef.child(`images/${this.selectedFile.name}`);
      profilImageRef.getMetadata().then((metadata) => {
        user.updateProfile({
          photoURL: metadata.fullPath,
        }).then(() => {
          console.log('profil updated');
        }).catch((error) => {

        });
      }).catch((error) => {
      });
    });
  }


  render() {
    return html`
          <app-header></app-header>         
          <div>
            <input type="file" accept="image/*" @change="${this.handleFileUploadChange}"/>
            <button @click="${this.handleFileUploadSubmit}">Valider</button>
          </div>
        `;
  }
}
customElements.define('app-twittax-settings', Settings);
