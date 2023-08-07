import {stream} from "lit-edge-utils/render.mjs";
import {render} from "@lit-labs/ssr";
import {html} from "lit";
import "open-ai-joke";

export const config = {runtime: "edge"};

export default () => new Response(stream(render(html`
    <open-ai-joke subject="Why Lit does not yet support async SSR rendering ?"></open-ai-joke>`)));
