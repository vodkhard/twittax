/* eslint-disable no-tabs */
import { LitElement, html, css } from 'lit-element';
import { fireauth } from '../db';
import './twaat/input';
import './twaat/list';
import './auth/app-auth';
import './auth/app-login';
import './ui/icon';

class Twax extends LitElement {
  constructor() {
    super();
    this.user = {};
  }

  static get properties() {
    return {
      user: Object,
    };
  }

  static get styles() {
    return css`
        .active {
            border-bottom: 2px solid #1DA1F2;
        }
        .active svg {
            fill: rgba(29, 161, 242, 1.00);
        }
        .active svg:hover {
            fill: rgba(29, 161, 242, 1.00);
        }
        svg {
            fill: rgb(101, 119, 134);
        }
        svg:hover {
            fill: rgba(29, 161, 242, 1.00);
        }
        .haut {
            height: 2.2rem;
            padding: 0px 25px;
        }
        .username {
            font-weight: 800;
            font-size: 18px;
            color: rgb(20, 23, 26);
        }
        .separator {
            height: 1px;
            background-color: rgba(0, 0, 0, 0.3);
        }
        nav {
            max-height: 16vh;
            height: 3.2rem;
            flex-direction: row;
            width: 100%;
            flex-shrink: 0;
            margin: 0px;
			min-height: 0px;
			min-width: 0px;
			padding: 0px;
			position: relative;
			z-index: 0;
			flex-basis: auto;
			display: flex;
			align-items: stretch;
			border: 0 solid black;
			box-sizing: border-box;
			background-color: white;
		}
		.tab {
			box-pack: center;
			justify-content: center;
			border-bottom-width: 2px;
			box-align: center;
			align-items: center;
			outline-style: none;
			box-flex: 1;
			flex-grow: 1;
			box-direction: normal;
			box-orient: vertical;
			flex-direction: column;
			display: flex;
			flex-shrink: 0;
			margin: 0px;
			min-height: 0px;
			min-width: 0px;
			padding: 0px;
			position: relative;
			z-index: 0;
	    }
		.tab-button {
			transition: 0.1s
	    }
		.tab-button:hover {
			margin-top: -0px;
			border-radius: 999px;
			background-color: rgba(29, 161, 242, 0.1);
			padding: 8px;
			margin: -8px;
	    }
		svg {
			height: 1.75rem;
	    }
		.tweet {
			box-direction: normal;
			box-orient: horizontal;
			flex-direction: row;
			margin-left: -5px;
			margin-right: -5px;
			display: flex;
	    }
		.left {
			max-width: 46px;
			min-width:0px;
			flex-basis: 0px;
			box-flex: 1;
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
			box-flex: 7;
			flex-grow: 7;
			flex-basis: 0px;
			box-flex: 1;
			flex-grow: 1;
			margin-left: 5px;
			margin-right: 5px;
	    }
		article {
			padding: 1rem 9px;

	    }
		.content-tweet {
			box-direction: normal;
			box-orient: horizontal;
			flex-direction: row;
			margin-left: -5px;
			margin-right: -5px;
	    }
		.tweet-image {
			max-width: 46px;
			flex-basis: 0px;
			box-flex: 1;
			flex-grow: 1;
			margin-left: 5px;
			margin-right: 5px;
	    }
		.tweet-text {
			box-flex: 7;
			flex-grow: 7;
			min-width: 0px;
			flex-basis: 0px;
			margin-left: 5px;
			margin-right: 5px;
	    }
		article {
			border-bottom: 1px solid rgb(230, 236, 240);
			padding: 1rem 9px;
	    }
		.article-tweet {
			display: block 
	    }
		.name {
			font-size: 14px;
			line-height: 1.3125;
			font-weight: bold;
			color: rgb(20, 23, 26);
			margin-bottom: 2px;
	    }
		.name .at {
			color: rgb(101, 119, 134);
			font-weight: 400;
	    }
		.content {
			color: rgb(20, 23, 26);
			line-height: 1.3125;
			font-size: 14px;
			font-weight:400;
		}`;
  }

  firstUpdated() {
    fireauth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  render() {
    if (this.user) {
      return html`
        <header>
          <div>
            <div class="haut">
              <p class="username">Accueil, bonjour ${this.user.displayName}</p>
            </div>
            <nav>
              <a href="/" class="tab active">
                <div class="tab-button">
                  <div>
                    <app-icon icon="home"></app-icon>
                  </div>
                </div>
              </a>
              <a href="#" class="tab">
                <div class="tab-button">
                  <div>
                    <app-icon icon="hashtag"></app-icon>
                  </div>
                </div>
              </a>
              <a href="#" class="tab">
                <div class="tab-button">
                  <div>
                    <app-icon icon="bell"></app-icon>
                  </div>
                </div>
              </a>
              <a href="#" class="tab">
                <div class="tab-button">
                  <div>
                    <app-icon icon="user"></app-icon>
                  </div>
                </div>
              </a>
            </nav>
            <div class="separator"></div>
          </div>
        </header>
            
        <div class="article-tweet">
        <article>
          <div class="tweet">
            <div class="left">
              <img src="/assets/default_profile_400x400.png">
            </div>
            <div class="right">
              <div class="content">
                 <app-twaat-input></app-twaat-input> 
              </div>
            </div>
          </div>
        </article>
        </div>
         
        <app-twaat-list></app-twaat-list>
        `;
    }

    return html`
      <app-auth></app-auth>
      <app-login></app-login>
    `;
  }
}

customElements.define('app-twittax', Twax);
