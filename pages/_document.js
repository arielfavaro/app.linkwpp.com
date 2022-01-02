import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '@/lib/analytics';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="pt-br">
                <Head>

                    {/* Google Tag Manager */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','${GA_TRACKING_ID}');
                            `,
                        }}
                    />
                    {/* End Google Tag Manager */}

                    {/* <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GA_ADS_ID}`} crossOrigin="anonymous"></script> */}
                </Head>
                <body>

                    {/* Google Tag Manager (noscript) */}
                    <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${GA_TRACKING_ID}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
                    {/* End Google Tag Manager (noscript) */}

                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}