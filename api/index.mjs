import "open-ai";
import {html} from "lit";
import OpenAI from "openai";
import {render} from "lit-async/lib/render.js";
import {stream} from "lit-edge-utils/render.mjs";

const {OPENAI_API_KEY: apiKey} = process.env;

const headers = {"Content-Type": "text/html;charset=UTF-8"};

const template = html`
    <meta content="dark light" name="color-scheme">
    <style>
        * {
            font-family: -apple-system, system-ui, Helvetica, sans-serif;
        }
    </style>
    <open-ai
            api="/api/open-ai"
            .openai=${new OpenAI({apiKey})}
            subject="Why Lit does not yet support async SSR rendering ?"
    ></open-ai>
`;

export default () => new Response(stream(render(template)), {headers});

export const config = {runtime: "edge"};
