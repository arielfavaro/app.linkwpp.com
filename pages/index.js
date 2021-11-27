import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import { Ads } from '@/components/Ads'
import FormLink from '@/components/FormLink'

export default function Home() {

    return (
        <div className={styles.main}>
            <Head>
                <title key="title">Gerador de Link para Whats</title>
                <meta key="description" name="description" content="Crie link curto para Whats com QR Code com o gerador de links para o Whats e compartilhe nas redes sociais. Link com mensagem personalizada para Whats. Utilize o link curto para Whats em suas postagens, Facebook, Instagram." />
                <link key="canonical" rel="canonical" href="https://app.linkwpp.com/" />
            </Head>
            <Header />
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <Ads client="ca-pub-3150319769695783" slot="6780362663" name="home-1" />
                </div>
                <div className={styles.center}>
                    <FormLink />
                    <section className="mt-5 container text-center">
                        <h2>Está com dúvidas ou quer dicas de uso? </h2>
                        <p>Visite a nossa seção <Link href="/como-usar"><a className="font-bold">Como usar</a></Link></p>
                    </section>
                </div>
                <div className={styles.right}>
                    <Ads client="ca-pub-3150319769695783" slot="7320586004" name="home-2" />
                </div>
            </div>
        </div>
    )
}
