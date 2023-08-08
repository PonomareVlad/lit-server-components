import {Task} from "@lit-labs/task";
import {html, LitElement} from "lit";
import {unsafeHTML} from "lit/directives/unsafe-html.js";

export class OpenAI extends LitElement {

    static tag = "open-ai"

    static properties = {
        api: {type: String},
        subject: {type: String},
        messages: {type: Array, reflect: true},
    }

    static define(tag = this.tag) {
        customElements.define(tag, this);
    }

    completionTask = new Task(this,
        ([messages = []]) => this.createCompletion({messages}),
        () => [this.messages]
    )

    initState() {
        if (
            this.subject &&
            !this.messages?.length
        ) this.messages = [
            {role: "user", content: this.subject}
        ];
    }

    async createCompletion(options = {}) {
        const response = await fetch(
            new URL(this.api, location),
            {
                method: "POST",
                body: JSON.stringify(options),
                headers: {"Content-Type": "application/json"}
            }
        );
        return await response.text();
    }

    renderOutput() {
        return this.completionTask.render({
            complete: (value) => unsafeHTML(value),
            pending: () => "pending",
            initial: () => "initial",
            error: () => "error",
        });
    }

    render() {
        return html`
            <h1>${this.subject}</h1>
            <pre style="white-space: pre-line">
                ${this.renderOutput()}
            </pre>
        `
    }

}
