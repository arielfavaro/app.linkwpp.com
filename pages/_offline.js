import Head from 'next/head';
import Header from '@/components/Header';

export default function Offline() {
    return (
        <div className="container-fluid">
            <div className="container main p-0">
                <Head>
                    <title key="title">Gerador de Link para whats</title>
                    <meta key="description" name="description" content="Crie link curto para whats com QR Code com o gerador de links para o whats e compartilhe nas redes sociais. Link com mensagem personalizada para whats. Utilize o link curto para whats em suas postagens, Facebook, Instagram." />
                    <link key="canonical" rel="canonical" href="https://app.linkwpp.com/" />
                </Head>
                <Header title={<>Sem <span className="text-primary">internet</span></>} description={<></>} />
                <h1 className="text-center h4">Você precisa estar conectado à internet para usar o <span className="text-primary">App</span></h1>
            </div>
        </div>
    )
}