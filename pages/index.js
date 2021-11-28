import Head from 'next/head';
import Link from 'next/link';
// import styles from '@/styles/Home.module.css'
import Header from '@/components/Header';
import { Ads } from '@/components/Ads';
import FormLink from '@/components/FormLink';

export default function Home() {

    return (
        <div className="container-fluid">
            <div className="container main p-0">
                <Head>
                    <title key="title">Gerador de Link para whats</title>
                    <meta key="description" name="description" content="Crie link curto para whats com QR Code com o gerador de links para o whats e compartilhe nas redes sociais. Link com mensagem personalizada para whats. Utilize o link curto para whats em suas postagens, Facebook, Instagram." />
                    <link key="canonical" rel="canonical" href="https://app.linkwpp.com/" />
                </Head>
                <Header />
                <div className="row justify-content-between">
                    <div className="col-12 col-md-3 col-lg-3 order-2 order-md-1 mt-5 mt-md-0">
                        <Ads client="ca-pub-3150319769695783" slot="6780362663" name="home-1" />
                    </div>
                    <div className="col-12 col-md-6 col-lg-5 order-1 order-md-2">
                        <FormLink />
                        <section className="container mt-5 p-0 text-center">
                            <h2 className="font-weight-normal h6">Está com dúvidas ou quer dicas de uso? </h2>
                            <p>Visite a nossa seção <Link href="/como-usar"><a className="text-primary font-weight-bold">Como usar</a></Link></p>
                        </section>
                    </div>
                    <div className="col-12 col-md-3 col-lg-3 order-3 order-md-3 mt-5 mt-md-0">
                        <Ads client="ca-pub-3150319769695783" slot="7320586004" name="home-2" />
                    </div>
                </div>
            </div>
        </div>
    )
}
