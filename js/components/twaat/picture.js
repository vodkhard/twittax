import {
  LitElement, html, css, unsafeCSS,
} from 'lit-element';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { firestorage } from '../../db';
import { colors } from '../ui/variables';

dayjs.extend(relativeTime);

class Picture extends LitElement {
  constructor() {
    super();
    this.item = {};
    this.fullHeight = false;
  }

  static get properties() {
    return {
      item: Object,
      fullHeight: Boolean,
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        min-height: 200px;
        line-height: 0;
        border: 2px solid ${colors.lightgrey};
      }
      img {
        width: 100%;
        max-height: 250px;
        object-fit: cover;
        cursor: pointer;
      }
      img[full] {
        max-height: unset;
      }
      :host, img {
        border-radius: 5px;
      }
    `;
  }

  async firstUpdated() {
    firestorage.ref(this.item.picture).getDownloadURL().then((url) => {
      this.shadowRoot.querySelector('img').dataset.src = url;
      if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver(((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        }));

        lazyImageObserver.observe(this.shadowRoot.querySelector('img'));
      }
    });
    // firestorage.ref(this.item.thumb).getDownloadURL().then((url) => {
    //   const image = this.shadowRoot.querySelector('img');
    //   if (image.src === '') {
    //     console.log(url);
    //     image.src = url;
    //   }
    // });
  }

  render() {
    const [r, g, b] = this.item.picture_placeholder;
    return html`
      <style>
        :host {
          background-color: ${unsafeCSS(`rgb(${r}, ${g}, ${b})`)};
        }
      </style>
      <img 
        src="" 
        data-src="" 
        alt="Twaat picture" 
        ?full=${this.fullHeight} 
        @click=${() => { this.fullHeight = !this.fullHeight; }} 
      />
    `;
  }
}
customElements.define('app-twaat-item-picture', Picture);
