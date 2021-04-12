import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header";
import questions from "../../lib/questions";

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
                    <title key="title">Como usar - Gerador de Link para WhatsApp</title>
                    <meta key="description" name="description" content="Confira nossas dicas e veja como gerar um link para WhatsApp" />
                    <link key="canonical" rel="canonical" href="https://geradorlinkwhatsapp.com/como-usar" />
                    <script type="application/ld+json">
                        {`
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                ${mapped_questions()}
                            ]
                        `}
                    </script>
                </Head>
                <Header title={<>Como <span className="text-primary">usar</span></>} description="Confira nossas dicas e veja como gerar um link para WhatsApp" />

                <section className="row justify-content-center">
                    <div className="col-12 col-md-8">
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
                </section>
                <section className="container mt-5 p-0 text-center">
                    <h2 className="font-weight-normal h5">Restou alguma dúvida ou sugestão? </h2>
                    <p>Entre em <Link href="/contato"><a className="text-primary font-weight-bold h5">contato conosco </a></Link></p>
                </section>
            </div>
        </div>
    )
}

export default ComoUsar;