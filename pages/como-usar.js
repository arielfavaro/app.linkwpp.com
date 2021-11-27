import Head from 'next/head'
import Link from 'next/link'
import Header from '@/components/Header'
import questions from '@/lib/questions'
import { Ads } from '@/components/Ads'
import styles from '@/styles/ComoUsar.module.css'

export default function ComoUsar() {

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
                }`
        })
    }

    return (

        <div className="container">
            <Head>
                <title key="title">Como usar - Gerador de Link para Whats</title>
                <meta key="description" name="description" content="Confira nossas dicas e veja como gerar um link para Whats" />
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
            <Header title={<>Como <span className="text-primary">usar</span></>} description="Confira nossas dicas e veja como gerar um link para Whats" />

            <div className={styles.main}>
                <section className={styles.wrapper}>
                    <div className="w-full lg:max-w-xs order-2 lg:order-1">
                        <Ads client="ca-pub-3150319769695783" slot="6780362663" name="como-usar-1" />
                    </div>
                    <div className="w-full lg:max-w-xl order-1 lg:order-2">
                        <article className="bg-dark-foreground p-3 md:p-4 rounded-xl">
                            <ul>
                                {questions.map((question, index) => {
                                    return (
                                        <li key={index}>
                                            <h2>{question.title}</h2>
                                            <p>{question.answer}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </article>
                    </div>
                    <div className="w-full lg:max-w-xs order-3 lg:order-3">
                        <Ads client="ca-pub-3150319769695783" slot="7320586004" name="como-usar-2" />
                    </div>
                </section>
                <section className="mt-5 p-0 text-center">
                    <h2 className="font-normal">Restou alguma dúvida ou sugestão? </h2>
                    <p>Entre em <Link href="/contato"><a className="text-primary font-bold">contato conosco </a></Link></p>
                </section>
            </div>
        </div>
    )
}
