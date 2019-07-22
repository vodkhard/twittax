import { LitElement, html, css } from 'lit-element';
import { colors } from './ui/variables';
import './ui/icon';

class Header extends LitElement {
  static get styles() {
    return css`
      .active {
        border-bottom: 2px solid ${colors.blue};
      }
      .active svg, .active svg:hover {
        fill: ${colors.blue};
      }
      app-icon {
        height: 1.75rem;
      }
      .top {
        height: 2.2rem;
        padding: 0px 25px;
      }
      .username {
        font-weight: 800;
        font-size: 18px;
        color: ${colors.black};
      }
      nav {
        height: 3.2rem;
        display: flex;
      }
      .tab {
        justify-content: center;
        align-items: center;
        outline-style: none;
        flex-grow: 1;
        flex-direction: column;
        display: flex;
      }
      .tab-button {
        transition: 0.1s
      }
      .tab-button:hover {
        border-radius: 999px;
        background-color: rgba(29, 161, 242, 0.1);
        padding: 6px 8px;
        margin: -8px;
      }
    `;
  }

  render() {
    return html`
      <header>
          <nav>
            <a href="/" class="tab active" aria-label="home">
              <div class="tab-button">
                <app-icon icon="home"></app-icon>
              </div>
            </a>
            <a href="/settings" class="tab" aria-label="settings">
              <div class="tab-button">
                <app-icon icon="user"></app-icon>
              </div>
            </a>
          </nav>
        </header>
    `;
  }
}

customElements.define('app-header', Header);
