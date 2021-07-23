import Head from 'next/head'
import Link from 'next/link'
import Header from '@/components/Header'

export default function Custom404() {
    return (
        <div className="container">
            <Head>
                <title key="title">404 - Gerador de Link para WhatsApp</title>
                <link key="canonical" rel="canonical" href="https://geradorlinkwhatsapp.com/404" />
            </Head>
            <Header />
            <h1 className="text-center my-5 text-danger display-2 font-weight-bold">404</h1>
            <div className="d-flex justify-content-center">
                <img src="/icons/astronaut-404.svg" width="220" height="220" alt="Página não encontrada" />
            </div>
            <h1 className="text-center mt-2 text-danger display-3"><span className="d-block">Houston,</span> we have a problem!</h1>
            <div className="d-flex justify-content-center my-4">
                <Link href="/"><a className="btn btn-success font-weight-bold text-uppercase">Voltar</a></Link>
            </div>
        </div>
    )
}
