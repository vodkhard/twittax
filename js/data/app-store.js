import { LitElement } from 'lit-element';
import { firestore } from '../db';

class AppStore extends LitElement {
  constructor() {
    super();
    this.collection = '';
    this.conditions = [];
  }

  static get properties() {
    return {
      collection: String,
      conditions: Array,
    };
  }

  firstUpdated() {
    let query = firestore.collection(this.collection);

    this.conditions.forEach((condition) => {
      console.log(condition);
      query = query.where(...condition);
    });

    query.orderBy('createdAt', 'desc').onSnapshot((ref) => {
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
