import {html} from "lit";
import {OpenAI} from "open-ai/component.mjs";

export class OpenAIJoke extends OpenAI {

    static tag = "open-ai-joke"

    render() {
        return html`<h1>Open AI Joke</h1>`
    }

}
