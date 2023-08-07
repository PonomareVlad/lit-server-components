import OpenAI from "openai";
import {
    createCompletionsHandler
} from "open-ai/api.mjs";

const {OPENAI_API_KEY: apiKey} = process.env;

export default createCompletionsHandler(new OpenAI({apiKey}));

export const config = {runtime: "edge"};
