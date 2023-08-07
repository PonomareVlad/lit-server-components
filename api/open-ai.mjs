import {
    createCompletionsHandler
} from "open-ai/server.mjs";
import OpenAI from "openai";

const {OPENAI_API_KEY: apiKey} = process.env;

export default createCompletionsHandler(new OpenAI({apiKey}));

export const config = {runtime: "edge"};
