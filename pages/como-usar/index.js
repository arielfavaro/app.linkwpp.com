import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import questions from "@/lib/questions";
import { Ads } from "@/components/Ads";

function ComoUsar() {

    const mapped_questions = () => {
        return questions.map(question => {
            return `
                {
                    "@type": "Question",
                    "name": "${question.title}",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "${question.answer}"
                    }
                }`;
        });
    }

    return (

        <div className="container-fluid">
            <div className="container main p-0">
                <Head>
                    <title key="title">Como usar - Gerador de Link para whats</title>
                    <meta key="description" name="description" content="Confira nossas dicas e veja como gerar um link para whats" />
                    <link key="canonical" rel="canonical" href="https://app.linkwpp.com/como-usar" />
                    <script type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: `{
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                ${mapped_questions()}
                            ]}`
                        }}>
                    </script>
                </Head>
                <Header title={<>Como <span className="text-primary">usar</span></>} description="Confira nossas dicas e veja como gerar um link para whats" />

                <section className="row justify-content-between">
                    <div className="col-12 col-md-3 col-lg-3 order-2 order-md-1 mt-5 mt-md-0">
                        {/* <Ads client="ca-pub-3150319769695783" slot="6780362663" name="como-usar-1" /> */}
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 order-1 order-md-2">
                        <article className="rounded bg-secondary px-3 py-3">
                            <ul className="list-unstyled">
                                {questions.map((question, index) => {
                                    return (
                                        <li key={index} className="border-bottom border-dark mb-3">
                                            <h2 className="h5">{question.title}</h2>
                                            <p>{question.answer}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </article>
                    </div>
                    <div className="col-12 col-md-3 col-lg-3 order-3 order-md-3 mt-5 mt-md-0">
                        {/* <Ads client="ca-pub-3150319769695783" slot="7320586004" name="como-usar-2" /> */}
                    </div>
                </section>
                {/* <section className="container mt-5 p-0 text-center">
                    <h2 className="font-weight-normal h5">Restou alguma dúvida ou sugestão? </h2>
                    <p>Entre em <Link href="/contato"><a className="text-primary font-weight-bold h5">contato conosco </a></Link></p>
                </section> */}
            </div>
        </div>
    )
}

export default ComoUsar;