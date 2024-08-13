import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                {/* <meta name="title" content="DopaMint" /> */}
                {/* <meta name="description" content="DopaMint"/> */}
                {/* <link rel="icon" type="image/x-icon" href="/favicon.ico" /> */}
                <meta name="og:image" content="/icon.png"/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="dscvr:canvas:version" content="vNext" />
                {/* <title>DopaMint</title> */}
                {/* <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                /> */}
                {/* <meta property="og:url" content="https://dopamint.a2n.finance/"></meta> */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>

    )
}