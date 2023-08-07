import {OpenAIStream, StreamingTextResponse} from "ai";

export async function createCompletion(openai, options = {}) {
    const {messages = [], stream = false, model = "gpt-3.5-turbo", ...other} = options;
    const response = await openai.chat.completions.create({model, stream, messages, ...other});
    return stream ? response : response?.choices?.pop()?.message?.content;
}

export function createCompletionsHandler(openai, options = {}) {
    return async req => {
        const {stream = true, ...other} = options;
        const payload = req.body ? await req.json() : {};
        const response = await createCompletion(openai, {...{...other, ...payload}, stream});
        return new StreamingTextResponse(OpenAIStream(response));
    }
}
