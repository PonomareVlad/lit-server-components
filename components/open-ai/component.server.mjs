import {createCompletion} from "./api.mjs";
import {OpenAI as OpenAIComponent} from "./component.mjs";

export class OpenAI extends OpenAIComponent {

    static properties = {
        ...super.properties,
        openai: {state: true}
    }

    createCompletion(options = {}) {
        return createCompletion(this.openai, options);
    }

    async render() {
        this.initState();
        await this.completionTask.run();
        await this.completionTask.taskComplete;
        return super.render();
    }

}
