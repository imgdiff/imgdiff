import { LitElement, html, css } from 'https://unpkg.com/lit-element/lit-element.js?module';

class Router extends LitElement {
    firstUpdated(changedProperties) {
        const u = new URL(window.location);
        const url = u.origin + u.hash.substring(1);
        window.history.replaceState(null, null, url);
        this.expandUrl(url);
    }

    async expandUrl(url) {
        const u = new URL(url);
        const m = u.pathname.match(/^\/([a-zA-Z0-9_]+)\/?$/);
        if (m) {
            const id = m[1];
            const data = await ((await fetch(`https://is.gd/forward.php?format=json&shorturl=${id}`)).json());
            console.log(data);
        }
    }
}

customElements.define('id-router', Router, { mode: 'open' });

class App extends LitElement {

    constructor() {
        super();
        this.router = new Router();
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-content: stretch;
                align-items: stretch;
            }

            .sidebar {
                order: 0;
                flex: 0 0 270px;
                align-self: auto;

                display: flex;
                flex-direction: column;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-content: stretch;
                align-items: stretch;

                background-color: #252525;
            }

            .logo {
                order: 0;
                flex: 0 0 125px;
                align-self: auto;

                display: flex;
                align-items: center;
                justify-content: center;

                font-size: 35px;
                font-family: 'Molle', 'sans-serif';
            }

            .controls {
                order: 0;
                flex: 0 0 32px;
                align-self: auto;

                background-color: #383838;
            }

            .groups {
                order: 0;
                flex: 1 1 auto;
                align-self: auto;
            }

            .main {
                order: 0;
                flex: 1 1 auto;
                align-self: auto;
            }
        `;
    }

    render() {
        return html`
            ${this.router}
            <div class="sidebar">
                <div class="logo">Image Diff</div>
                <div class="controls">
                    <button class="control-btn">New</button>
                    <button class="control-btn">Share</button>
                    <hr>
                    <button class="control-btn">Tracing Slide</button>
                    <button class="control-btn">Dragging Slide</button>
                    <button class="control-btn">Hovering</button>
                    <button class="control-btn">Hovering</button>
                    <button class="control-btn">Clicking</button>
                </div>
                <div class="groups"></div>
            </div>
            <div class="main"></div>
        `;
    }
}

customElements.define('id-app', App, { mode: 'open' });
