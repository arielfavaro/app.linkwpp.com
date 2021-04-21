import Head from 'next/head';
import Header from '@/components/Header';

export default () => (
    <div className="container-fluid">
        <div className="container main p-0">
            <Head>
                <title key="title">Gerador de Link para WhatsApp</title>
                <meta key="description" name="description" content="Crie link curto para WhatsApp com QR Code e compartilhe nas redes sociais. Link com mensagem personalizada para WhatsApp. Utilize o link encurtado para WhatsApp em suas postagens, Facebook, Instagram." />
                <link key="canonical" rel="canonical" href="https://geradorlinkwhatsapp.com/" />
            </Head>
            <Header title={<>Sem <span className="text-primary">internet</span></>} description={<></>} />
            <h1 className="text-center h4">Você precisa estar conectado à internet para usar o <span className="text-primary">App</span></h1>
        </div>
    </div>
)
