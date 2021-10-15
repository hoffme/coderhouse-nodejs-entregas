// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";

const View = (props: { colors: string[] }) => {
    return <html>
        <head>
            <meta charSet="utf-8" />
            <title>servest</title>
        </head>
        <body>
            <div>
                <form method={"POST"} action={"/new_color"}>
                    <input name={"color"} type={"color"} />
                    <button>Guardar</button>
                </form>
                <ul>
                    { props.colors.map((color, key) => <li key={key} >{color}</li>) }
                </ul>
            </div>
        </body>
    </html>
}

export default View;