// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

import View from './view.tsx';

const app = createApp();
const colors: string[] = [];

app.post("/new_color", async (req) => {
    const form = await req.formData();
      
    const color = form.value('color');
    if (color) colors.push(color);

    await req.redirect('/');
});

app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(<View colors={colors} />),
  });
});

app.listen({ port: 8899 });