import Document, { Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../lib/gtag'

export default class BetterDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_TRACKING_ID}', {
                            page_path: window.location.pathname,
                            });
                        `,
                        }}
                    />
                    <link rel="stylesheet"
                        href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/styles/default.min.css" />
                    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/highlight.min.js"></script>
                    <script charSet="UTF-8"
                        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/languages/javascript.min.js"></script>
                    <script charSet="UTF-8"
                        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/languages/go.min.js"></script>
                </Head>
                    <body>
                        <Main />
                        <NextScript />
                    </body>
            </html>
        )
    }
}