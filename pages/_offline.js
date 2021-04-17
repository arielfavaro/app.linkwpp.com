import Head from 'next/head';
import Header from '../components/Header';

export default () => {
    return (
        <div className="container-fluid">
            <div className="container main p-0">
                <Head>
                    <title key="title">Gerador de Link para WhatsApp</title>
                    <meta key="description" name="description" content="Crie link encurtado para WhatsApp com QR Code de maneira fácil e compartilhe com seus clientes." />
                    <link key="canonical" rel="canonical" href="https://geradorlinkwhatsapp.com/" />
                </Head>
                <Header title={<>Sem <span className="text-primary">internet</span></>} description={<></>} />
                <h1 className="text-center h4">Você precisa estar conectado à internet para usar o <span className="text-primary">App</span></h1>
            </div>
        </div>
    )
}