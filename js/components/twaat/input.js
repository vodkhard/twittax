import { LitElement, html, css } from 'lit-element';
import ColorThief from 'color-thief';
import 'dile-modal/dile-modal';
import '../ui/icon';
import { colors } from '../ui/variables';
import twaatsRepository from '../../data/repository/twaats';
import { firestorage } from '../../db';

function readURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}

class Input extends LitElement {
  constructor() {
    super();
    this.content = '';
    this.previewPath = null;
  }

  static get properties() {
    return {
      content: String,
      modalId: String,
      handleSubmit: Function,
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      textarea {
        outline:none;
        border-radius: 8px;
        border: 1px solid ${colors.blue};
        resize: none;
        font-size: 14px;
        color: ${colors.black};
        padding: 8px;
        box-sizing: border-box;
        width: 100%;
        max-width: 550px;
        height: 55px;
        margin-bottom: 5px;
      }
      textarea::placeholder {
        color: #aaa;
      }
      button {
        background-color: ${colors.blue};
        color: #fff;
        font-weight: bold;
        padding: 6px 15px;
        border-radius: 30px;
        font-size: 13px;
        border: none;
        cursor: pointer;
        outline: none;
      }
      input[type=file] {
        display: none;
      }
      #preview {
        max-height: 200px;
        max-width: 100%;
        display: none;
      }
      dile-modal {
        --dile-modal-background-color: rgba(0, 0, 0, 0.3);
        --dile-modal-max-height: 90vh;
        --dile-modal-max-width: 80vw;
        --dile-modal-min-width: 600px;
        --dile-modal-border-radius: 5px;
        --dile-modal-content-shadow-displacement: 0;
        --dile-modal-content-shadow-blur: 0;
        --dile-modal-close-icon-color: #1da1F2;
      }
    `;
  }

  handleSubmit(e) {
    e.preventDefault();
    const payload = {
      content: this.content,
    };
    const pictures = this.shadowRoot.querySelector('input[name=picture]').files;
    if (pictures) {
      const storageRef = firestorage.ref();
      const ct = new ColorThief();
      [...pictures].forEach((picture) => {
        payload.picture_placeholder = ct.getColor(this.shadowRoot.getElementById('preview'));
        const uploadPic = storageRef.child(`twaats/${picture.name}`);
        payload.picture = uploadPic.fullPath;
        payload.thumb = storageRef.child(`twaats/thumb_${picture.name}`).fullPath;
        uploadPic.put(picture);
      });
    }
    twaatsRepository
      .add(payload)
      .then(() => {
        this.shadowRoot.getElementById('modal-input').close();
        this.content = '';
        this.togglePreview();
      });
  }

  open() {
    this.shadowRoot.getElementById('modal-input').open();
  }

  handleImageUpload() {
    const input = this.shadowRoot.querySelector('input[name=picture]');
    const picture = input.files[0];
    readURL(picture).then((path) => {
      this.togglePreview(path);
    });
  }

  togglePreview(path = null) {
    this.shadowRoot.getElementById('preview').src = path || '';
    this.shadowRoot.getElementById('preview').style.display = path ? 'unset' : 'none';
  }

  render() {
    return html`
      <button @click=${this.open}>Quoi de neuf ?</button>
      <dile-modal id="modal-input" showCloseIcon @dile-modal-closed=${() => this.togglePreview()}>
        <form @submit=${this.handleSubmit}>
          <textarea
            name="content"
            placeholder="Quoi de neuf ?"
            .value="${this.content}"
            @input=${(e) => { this.content = e.target.value; }}
          ></textarea>
          <input 
            name="picture" 
            type="file"
            accept="image/*"
            @change=${this.handleImageUpload}
          >
          <button type="submit">Twaat</button>
        </form>
        <div>
          <img src="" id="preview" alt="Preview picture">
        </div>
        <div>
          <app-icon icon="image" @click=${() => this.shadowRoot.querySelector('input[name=picture]').click()} />
        </div>
      </dile-modal>
    `;
  }
}

customElements.define('app-twaat-input', Input);
