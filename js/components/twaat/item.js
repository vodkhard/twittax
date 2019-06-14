import { LitElement, html, css } from 'lit-element';
import twaatsRepository from '../../data/repositroy/twaats';
import moment from 'moment';
import 'moment/locale/en-gb'
import './comment';
import './content';

class Item extends LitElement {
  constructor() {
    super();
    this.item = {};
    this.author = null;
    this.child = null;
  }

  static get properties() {
    return {
      data: Object,
      author: Object,
      child: Object,
    };
  }

  static get styles() {
    return css`
      .small {
        font-size: 1rem;
      }
      .retwaat {
        border: 1px solid red;
      }
      .tweet {
        -webkit-box-direction: normal;
        -webkit-box-orient: horizontal;
        flex-direction: row;
        margin-left: -5px;
        margin-right: -5px;
        display: flex;
      }

.left { 
max-width: 46px;
min-width:0px;
flex-basis: 0px;
    -webkit-box-flex: 1;
    flex-grow: 1;
        margin-left: 5px;
    margin-right: 5px;
  
}
img { 
    max-width: 100%;
border-radius:999px}

.right { 
      -webkit-box-flex: 7;
    flex-grow: 7;
    flex-basis: 0px;
    -webkit-box-flex: 1;
    flex-grow: 1;
        margin-left: 5px;
    margin-right: 5px;
}

    article { 
      padding-bottom: 1rem;
      padding-top: 1rem;
      padding-left: 9px;
      padding-right: 9px;
   
    }

.content-tweet { 
      -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    flex-direction: row;
        margin-left: -5px;
    margin-right: -5px;
}

.tweet-image { 
    max-width: 46px;
    flex-basis: 0px;
        -webkit-box-flex: 1;
    flex-grow: 1;
        margin-left: 5px;
    margin-right: 5px;
    }
    
    .tweet-text { 
        -webkit-box-flex: 7;
    flex-grow: 7;
        min-width: 0px;
            flex-basis: 0px;
                margin-left: 5px;
    margin-right: 5px;
    
    }

article { 
border-bottom: 1px solid rgb(230, 236, 240);
padding-bottom: 1rem;
    padding-top: 1rem;
        padding-left: 9px;
    padding-right: 9px;
}

    .article-tweet {
      display: block
    }

    .name { 
      font-size: 14px;
      line-height: 1.3125;
      font-weight:bold;
      color: rgb(20, 23, 26);
      margin-bottom: 2px;
    }
    
    .name .at { 
    color: rgb(101, 119, 134);
    font-weight: 400;
    }

    .name .at a {
      color: rgb(101, 119, 134);
    font-weight: 400;
      text-decoration: none;
    }
    
    .content { 
        color: rgb(20, 23, 26);
        line-height: 1.3125;
         font-size: 14px;
    font-weight:400;
    }
    `;
  }

  async firstUpdated() {
    this.item.author.get().then((doc) => {
      this.author = doc.data();
    });
    if (this.item.child) {
      this.item.child.get().then((doc) => {
        this.child = doc.data();
      });
    }
    this.onUpdate = type => twaatsRepository.update(this.item.id, {
      [type]: this.item[type] + 1,
    });
    this.onRetwaat = () => {
      this.onUpdate('retwaats').then(() => {
        twaatsRepository.add({
          child: twaatsRepository.get(this.item.id),
          like: 0,
          retwaats: 0,
        });
      });
    };
    this.onDelete = () => {
      twaatsRepository.del(this.item.id);
    };
  }

  render() {
    return html`
    <div class="article-tweet">
    <article>
      <div class="tweet">
        <div class="left">
        <img src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png">
        </div>
        <div class="right">
        <div class="name">
          ${this.author
          && html`
            ${this.author.name.slice(1)}
          `} <span class="at">${this.author
          && html`
            <a href=${`/users/${this.author.name}`}>${this.author.name}</a>
          `} · ${this.item.createdAt
          && html`
            <span>${moment(this.item.createdAt.toDate()).fromNow()}</span>
          `}</span> 
        </div>
        <div class="content">
          ${this.item.content
              && html`
                <app-twaats-content .content=${this.item.content}></app-twaats-content>
              `}
            ${this.child
            && html`
              <div class="retwaat">
                <app-twaats-content .content=${this.child.content}></app-twaats-content>
              </div>
            `}
        </div>
        <div class="buttons">
            <div>
           
            ${this.item.parent
              && html`
                <i>comment</i>
              `}
            
            
            <button @click=${() => this.onUpdate('like')}>${this.item.like} likes!</button>
            <button @click=${this.onRetwaat}>${this.item.retwaats} retwaats!</button>
            <button @click=${this.onDelete}>Delete</button>
            <app-twaat-comment .parent=${this.item.id} />
          </div>
        </div>
          
        </div>
      </div>

    </article>
    </div>

      
    `;
  }
}
customElements.define('app-twaat-item', Item);
