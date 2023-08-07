import "open-ai-joke";
import {html} from "lit";
import {render} from "lit-async/lib/render.js";
import {stream} from "lit-edge-utils/render.mjs";

const headers = {"Content-Type": "text/html;charset=UTF-8"};

const template = html`
    <open-ai-joke subject="Why Lit does not yet support async SSR rendering ?"></open-ai-joke>`;

export default () => new Response(stream(render(template)), {headers});

export const config = {runtime: "edge"};
