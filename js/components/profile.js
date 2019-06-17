import { LitElement, html, css } from 'lit-element';
import userRepository from '../data/repositroy/users';
import './twaat/list';

class Profile extends LitElement {
  constructor() {
    super();
    this.user = null;
  }

  static get properties() {
    return {
      user: Object,
    };
  }

  static get styles() {
    return css `
      body {
         margin: 0px;
         font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    }
     .active {
         border-bottom: 2px solid rgb(29, 161, 242);
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
         margin-bottom: 0px;
         margin-left: 0px;
         margin-right: 0px;
         margin-top: 0px;
         min-height: 0px;
         min-width: 0px;
         padding-bottom: 0px;
         padding-left: 0px;
         padding-right: 0px;
         padding-top: 0px;
         position: relative;
         z-index: 0;
         flex-basis: auto;
         display: -webkit-flex;
         align-items: stretch;
         border: 0 solid black;
         box-sizing: border-box;
         background-color: white;
    }
     .css-4rbku5 {
         -webkit-box-pack: center;
         justify-content: center;
         border-bottom-width: 2px;
         -webkit-box-align: center;
         align-items: center;
         outline-style: none;
         -webkit-box-flex: 1;
         flex-grow: 1;
         -webkit-box-direction: normal;
         -webkit-box-orient: vertical;
         flex-direction: column;
         display: flex;
         flex-shrink: 0;
         margin-bottom: 0px;
         margin-left: 0px;
         margin-right: 0px;
         margin-top: 0px;
         min-height: 0px;
         min-width: 0px;
         padding-bottom: 0px;
         padding-left: 0px;
         padding-right: 0px;
         padding-top: 0px;
         position: relative;
         z-index: 0;
    }
    .css-1dbjc4n {
      transition: 0.1s
    }
     .css-1dbjc4n:hover {
         margin-top: -0px;
         border-radius: 999px;
         background-color: rgba(29, 161, 242, 0.1);
         padding: 8px;
         margin: -8px;
    }
     svg {
         height: 1.75rem;
    }
    .fetching {
      color: rgb(20, 23, 26);
      font-size: 14px;
      margin: auto;
      width: 100%;
      text-align: center;
      padding-top: 20px;
    }`;
  }

  async firstUpdated() {
    this.user = await userRepository.getByName(this.location.params.name);
  }

  render() {
    return html`
      <header>
      <div>
        <div class="haut">
          <p class="username">Profil de ${this.location.params.name}</p>
        </div>
        <nav>
          <a href="/" class="css-4rbku5">
            <div class="css-1dbjc4n">
              <div>
                <svg viewBox="0 0 24 24" class="r-13gxpu9">
                  <g>
                    <path d="M22.58 7.35L12.475 1.897c-.297-.16-.654-.16-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355zM12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z"></path>
                  </g>
                </svg>
                <div></div>
              </div>
            </div>
          </a>
          <a href="#" class="css-4rbku5">
            <div class="css-1dbjc4n">
              <div>
                <svg viewBox="0 0 24 24" class="r-1re7ezh r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr">
                  <g>
                    <path d="M21 7.337h-3.93l.372-4.272c.036-.412-.27-.775-.682-.812-.417-.03-.776.27-.812.683l-.383 4.4h-6.32l.37-4.27c.037-.413-.27-.776-.68-.813-.42-.03-.777.27-.813.683l-.382 4.4H3.782c-.414 0-.75.337-.75.75s.336.75.75.75H7.61l-.55 6.327H3c-.414 0-.75.336-.75.75s.336.75.75.75h3.93l-.372 4.272c-.036.412.27.775.682.812l.066.003c.385 0 .712-.295.746-.686l.383-4.4h6.32l-.37 4.27c-.036.413.27.776.682.813l.066.003c.385 0 .712-.295.746-.686l.382-4.4h3.957c.413 0 .75-.337.75-.75s-.337-.75-.75-.75H16.39l.55-6.327H21c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-6.115 7.826h-6.32l.55-6.326h6.32l-.55 6.326z"></path>
                  </g>
                </svg>
                <div></div>
              </div>
            </div>
          </a>
          <a href="#" class="css-4rbku5">
            <div class="css-1dbjc4n">
              <div>
                <svg viewBox="0 0 24 24" class="r-1re7ezh r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr">
                  <g>
                    <path d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03-.26.193-.366.53-.265.838.102.308.39.515.712.515h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514.103-.307-.003-.645-.263-.838zM12 20.478c-1.505 0-2.73-1.177-2.828-2.658h5.656c-.1 1.48-1.323 2.66-2.828 2.66zM4.38 16.32c.74-1.132 1.548-3.028 1.524-5.896-.018-2.16.644-3.982 1.913-5.267C8.91 4.05 10.397 3.437 12 3.43c1.603.008 3.087.62 4.18 1.728 1.27 1.285 1.933 3.106 1.915 5.267-.024 2.868.785 4.765 1.525 5.896H4.38z"></path>
                  </g>
                </svg>
                <div></div>
              </div>
            </div>
          </a>
          <a href="#" class="css-4rbku5 active">
            <div class="css-1dbjc4n">
              <div>
                <svg viewBox="0 0 24 24" class="r-1re7ezh r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr">
                  <g>
                    <path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"></path>
                  </g>
                </svg>
                <div ></div>
              </div>
            </div>
          </a>
        </nav>
        <div class="separator"></div>
      </div>
    </header>


      ${this.user
    ? html`
            <app-twaat-list .conditions=${[['author', '==', userRepository.get(this.user.id)]]} />
          `
    : html`
            <div class="fetching">Fetching twaats...</div>
          `}
    `;
  }
}
customElements.define('app-twittax-profile', Profile);
