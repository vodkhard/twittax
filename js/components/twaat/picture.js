import { LitElement, html, css } from 'lit-element';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { firestorage } from '../../db';
import { colors } from '../ui/variables';

dayjs.extend(relativeTime);

class Picture extends LitElement {
  constructor() {
    super();
    this.item = {};
  }

  static get properties() {
    return {
      item: Object,
    };
  }

  static get styles() {
    return css`
      .twaat_picture img {
        width: 100%;
        max-height: 250px;
        object-fit: cover;
      }
      .twaat_picture {
        line-height: 0;
        border: 2px solid ${colors.lightgrey};
      }
      .twaat_picture, .twaat_picture img {
        border-radius: 5px;
      }
    `;
  }

  async firstUpdated() {
    const [r, g, b] = this.item.picture_placeholder;
    this.picturePlaceholder = `rgb(${r}, ${g}, ${b})`;
    firestorage.ref(this.item.thumb).getDownloadURL().then((url) => {
      this.shadowRoot.querySelector('.twaat_picture > img').src = url;
    });
  }

  render() {
    return html`
      <div class="twaat_picture" .style=${`background-color: ${this.picturePlaceholder}`}>
        <img src="" alt="Twaat picture" />
      </div>
    `;
  }
}
customElements.define('app-twaat-item-picture', Picture);
