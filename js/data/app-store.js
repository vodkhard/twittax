import { LitElement } from 'lit-element';
import { firestore } from '../db';

class AppStore extends LitElement {
  constructor() {
    super();
    this.data = [];
    this.collection = '';
  }

  static get properties() {
    return {
      data: Array,
      collection: String,
    };
  }

  firstUpdated() {
    firestore
      .collection(this.collection)
      // .orderBy('date', 'asc')
      .onSnapshot((ref) => {
        ref.docChanges().forEach(({ oldIndex, doc, type }) => {
          if (type === 'added') {
            this.data = [...this.data, doc.data()];
            this.dispatchEvent(new CustomEvent('child-changed', { detail: this.data }));
          } else if (type === 'removed') {
            this.data.splice(oldIndex, 1);
            this.dispatchEvent(new CustomEvent('child-changed', { detail: this.data }));
          }
        });
      });
  }
}

export default AppStore;

customElements.define('app-store', AppStore);
