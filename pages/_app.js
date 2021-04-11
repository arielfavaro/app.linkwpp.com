import Head from 'next/head';
// import '../styles/globals.css'
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
                <meta key="description" name="description" content="Crie links encurtado para WhatsApp com QR Code de maneira fácil e compartilhe com seus clientes." />
                <meta key="keywords" name="keywords" content="link whatsapp, links, link do whatsapp, gerador de link whatsapp, gerar link whatsapp, gerador de link, gerador link whatsapp, criar link whatsapp, links de whatsapp, qrcode whatsapp, link qrcode, criar qrcode whatsapp" />
                <link key="canonical" rel="canonical" href="https://geradorlinkwhatsapp.com/" />
                <link rel="icon" href="/favicon.ico" />

                <title key="title">Gerador de Link para WhatsApp</title>

                <link rel="manifest" href="/manifest.json" />
                {/* <link
                    href="/icons/favicon-16x16.png"
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                />
                <link
                    href="/icons/favicon-32x32.png"
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                /> */}
                <link
                    href="/icons/icon192.png"
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                />
                <link
                    href="/icons/icon512.png"
                    rel="icon"
                    type="image/png"
                    sizes="512x512"
                />
                <link rel="apple-touch-icon" href="/icons/icon192.png"></link>
                <meta name="theme-color" content="#1fe453" />

            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
