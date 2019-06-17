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
        border-radius: 999px;
        pointer-events: none;
      }
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
        font-size: 14.5px;
        font-weight:400;
      }
      .retweet {
        -webkit-box-direction: normal;
        -webkit-box-orient: horizontal;
        flex-direction: row;
        margin-left: -5px;
        margin-right: -5px;
        display: flex;
      }
      .icone {
        max-width: 49px;
        -webkit-box-align: end;
        align-items: flex-end;
        min-width: 0px;
        flex-basis: 0px;
        -webkit-box-flex: 1;
        flex-grow: 1;
        margin-left: 5px;
        margin-right: 3px;
      }
      svg {
        width: 12px;
        color: rgb(101, 119, 134);
        fill: rgb(101, 119, 134);
        vertical-align: text-bottom;
        position: relative;
        height: 1.35em;
        display: inline-block;
        float: right;
      }
      .text {
        -webkit-box-flex: 7;
        flex-grow: 7;
        min-width: 0px;
        flex-basis: 0px;
        -webkit-box-align: start;
        align-items: flex-start;
        margin-left: 2px;
        margin-right: 5px;
      }
      .text span {
        font-weight: 400;
        font-size: 14px;
        min-width: 0px;
        line-height: 1.3125;
        color: rgb(101, 119, 134);
        box-sizing: border-box;
        display: inline;
      }
      .buttons {
        display: flex;
        max-width: 425px;
        -webkit-box-direction: normal;
        -webkit-box-orient: horizontal;
        flex-direction: row;
        margin-top:10px;
        -webkit-box-pack: justify;
        justify-content: space-between;
      }
      .button {
        -webkit-box-pack: start;
        justify-content: flex-start;
        flex-basis: 0px;
        -webkit-box-flex: 1;
        flex-grow: 1;
        -webkit-box-direction: normal;
        -webkit-box-orient: horizontal;
        flex-direction: row;
      }
      .button-svg:hover {
         margin-top: -0px;
         border-radius: 999px;
         background-color: rgba(29, 161, 242, 0.1);
         padding: 8px;
         margin: -8px;
      }
      .button-svg svg:hover {
        fill: rgb(29, 161, 242);
      }
      .button-svg {
        font-size: 15px;
        -webkit-box-pack: start;
        justify-content: flex-start;
        min-width: 0px;
        line-height: 1.3125;
        color: rgb(101, 119, 134);
        -webkit-box-align: center;
        align-items: center;
        display: inline-flex;
        cursor: pointer;
        transition: 0.1s;
      }
      .button-svg svg {
        width: 1.25em;
        position: relative;
        vertical-align: text-bottom;
      }
      .count {
        display: inline-flex;
        overflow-x: hidden;
        overflow-y: hidden;
        position: absolute;
        margin-top: 1px;
      }
      .count span {
        position: relative;
        margin-left: 10px;
        color: rgb(101, 119, 134);
        min-width: 0px;
        font-size: 15px;
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
    this.onComment = () => {
      console.log('TODO: toggle le form pour commenter')
    }
  }

  render() {
    return html`
    <div class="article-tweet">
    <article>
      ${this.child
            && html`
        <div class="retweet">
          <div class="icone">
            <svg viewBox="0 0 24 24"><g><path d="M23.615 15.477c-.47-.47-1.23-.47-1.697 0l-1.326 1.326V7.4c0-2.178-1.772-3.95-3.95-3.95h-5.2c-.663 0-1.2.538-1.2 1.2s.537 1.2 1.2 1.2h5.2c.854 0 1.55.695 1.55 1.55v9.403l-1.326-1.326c-.47-.47-1.23-.47-1.697 0s-.47 1.23 0 1.697l3.374 3.375c.234.233.542.35.85.35s.613-.116.848-.35l3.375-3.376c.467-.47.467-1.23-.002-1.697zM12.562 18.5h-5.2c-.854 0-1.55-.695-1.55-1.55V7.547l1.326 1.326c.234.235.542.352.848.352s.614-.117.85-.352c.468-.47.468-1.23 0-1.697L5.46 3.8c-.47-.468-1.23-.468-1.697 0L.388 7.177c-.47.47-.47 1.23 0 1.697s1.23.47 1.697 0L3.41 7.547v9.403c0 2.178 1.773 3.95 3.95 3.95h5.2c.664 0 1.2-.538 1.2-1.2s-.535-1.2-1.198-1.2z"></path></g></svg>
          </div>
          <div class="text">
            <span>retweeté</span>
          </div>
        </div>`
      }

      ${this.item.parent
            && html`
        <div class="retweet">
          <div class="icone">
            <svg viewBox="0 0 24 24"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788z"></path></g></svg>
          </div>
          <div class="text">
            <span>répondu</span>
          </div>
        </div>`
      }

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
              <app-twaats-content .content=${this.child.content}></app-twaats-content>
            `}
        </div>
        <div class="buttons">
          <div class="button">
            <div class="button-svg" @click=${this.onComment}><svg viewBox="0 0 24 24" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg></div>
            <div class="count"><span>0</span></div>
          </div>

          <div class="button">
            <div class="button-svg" @click=${this.onRetwaat}><svg viewBox="0 0 24 24" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg></div>
            <div class="count"><span>${this.item.retwaats}</span></div>
          </div>

          <div class="button">
            <div class="button-svg" @click=${() => this.onUpdate('like')}><svg viewBox="0 0 24 24" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg></div>
            <div class="count"><span>${this.item.like}</span></div>
          </div>

          <div class="button" title="Supprimer">
            <div class="button-svg" @click=${this.onDelete}><svg viewBox="0 0 24 24" class="r-1re7ezh r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-zso239 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M12 1.25C6.072 1.25 1.25 6.072 1.25 12S6.072 22.75 12 22.75 22.75 17.928 22.75 12 17.928 1.25 12 1.25zm0 1.5c2.28 0 4.368.834 5.982 2.207L4.957 17.982C3.584 16.368 2.75 14.282 2.75 12c0-5.1 4.15-9.25 9.25-9.25zm0 18.5c-2.28 0-4.368-.834-5.982-2.207L19.043 6.018c1.373 1.614 2.207 3.7 2.207 5.982 0 5.1-4.15 9.25-9.25 9.25z"></path></g></svg></div>
          </div>
        </div>

        <app-twaat-comment .parent=${this.item.id} />
          
        </div>
      </div>

    </article>
    </div>

      
    `;
  }
}
customElements.define('app-twaat-item', Item);
