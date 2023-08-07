import {html, LitElement} from "lit";

export class OpenAI extends LitElement {

    static tag = "open-ai"

    static define(tag = this.tag) {
        customElements.define(tag, this);
    }

    render() {
        return html`<h1>Open AI</h1>`
    }

}
