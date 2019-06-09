import { LitElement } from 'lit-element';
import { firestore } from '../db';

class AppStore extends LitElement {
  constructor() {
    super();
    this.collection = '';
  }

  static get properties() {
    return {
      collection: String,
    };
  }

  firstUpdated() {
    firestore
      .collection(this.collection)
      .orderBy('createdAt', 'desc')
      .onSnapshot((ref) => {
        const data = [];
        ref.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        this.dispatchEvent(new CustomEvent('child-changed', { detail: data }));
      });
  }
}

export default AppStore;

customElements.define('app-store', AppStore);
