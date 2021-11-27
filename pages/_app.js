import Head from 'next/head';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta key="description" name="description" content="Crie link curto para Whats com QR Code com o gerador de links para o Whats e compartilhe nas redes sociais. Link com mensagem personalizada para Whats. Utilize o link curto para Whats em suas postagens, Facebook, Instagram." />
                <meta key="keywords" name="keywords" content="link whats, links, link do whats, gerador de link whats, gerar link whats, gerador de link, gerador link whats, criar link whats, links de whats, qrcode whats, link qrcode, criar qrcode whats" />
                <link key="canonical" rel="canonical" href="https://app.linkwpp.com/" />
                <link rel="icon" href="/favicon.ico" />

                <title key="title">Gerador de Link para Whats</title>

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
                <meta name="theme-color" content="#37d662" />

            </Head>
            <Nav />
            <Component {...pageProps} />
            <Footer />
        </>
    )
}

export default MyApp
