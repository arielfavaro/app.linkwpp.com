import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import copy from 'copy-to-clipboard'
import MaskedInput from 'react-text-mask'
import Header from '@/components/Header'
import { MdContentCopy } from 'react-icons/md'
import QrCode from '@/components/QrCode'
import FieldError from '@/components/FieldError'
import { Ads } from '@/components/Ads'
import { countryMask, numberMask } from '@/lib/masks'
import generateLink from '@/services/generateLink'

const gerarLinkSchema = Yup.object().shape({
    number: Yup.string()
        .min(15, 'Número incompleto')
        .max(16, 'Número inválido')
        .required('Digite um número'),
    countryCode: Yup.string().required('Obrigatório'),
    message: Yup.string().required('Digite uma mensagem').max(200, 'Máximo de 200 caracteres'),
})

export default function Home() {

    const [link_generated, setLinkGenerated] = useState({ link: '', link_shortened: '', copied: false, id: '', link_base: '', link_code: '' })

    const copiarLink = () => {
        if (link_generated.link_shortened) {
            copy(link_generated.link_shortened)
            setLinkGenerated({ ...link_generated, copied: true })
        }
    }

    const storeLink = (id) => {
        const previous = JSON.parse(localStorage.getItem('geradorlinkwhatsapp.links')) || []
        localStorage.setItem('geradorlinkwhatsapp.links', JSON.stringify([...previous, id]))
    }

    return (
        <div className={styles.main}>
            <Head>
                <title key="title">Gerador de Link para WhatsApp</title>
                <meta key="description" name="description" content="Crie link curto para WhatsApp com QR Code com o gerador de links para o WhatsApp e compartilhe nas redes sociais. Link com mensagem personalizada para WhatsApp. Utilize o link curto para WhatsApp em suas postagens, Facebook, Instagram." />
                <link key="canonical" rel="canonical" href="https://geradorlinkwhatsapp.com/" />
            </Head>
            <Header />
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <Ads client="ca-pub-3150319769695783" slot="6780362663" name="home-1" />
                </div>
                <div className={styles.center}>
                    <Formik
                        initialValues={{
                            countryCode: '+55',
                            number: '',
                            message: '',
                        }}
                        validationSchema={gerarLinkSchema}
                        onSubmit={async (values) => {

                            const response = await generateLink(values)
                            const { id, base, code, original, shortened } = response.data
                            setLinkGenerated({ ...link_generated, link: original, link_shortened: shortened, copied: false, id, link_base: base, link_code: code })
                            storeLink(id)
                        }}
                    >
                        {({ errors, touched, isSubmitting, dirty }) => (
                            <Form>
                                <div className="form-group mb-0 d-flex">
                                    <div className="flex-shrink-1 pr-3">
                                        <Field name="countryCode">
                                            {({ field }) => <MaskedInput {...field} mask={countryMask} guide={false} id="countryCode" placeholder="Cód. País" type="tel" className="form-control" size="3"></MaskedInput>}
                                        </Field>
                                        <FieldError>
                                            {errors.countryCode && touched.countryCode ? errors.countryCode : null}
                                        </FieldError>
                                    </div>
                                    <div className="flex-grow-1">
                                        <Field name="number" >
                                            {({ field }) => <MaskedInput
                                                {...field}
                                                mask={numberMask}
                                                id="number"
                                                placeholder="Número"
                                                type="tel"
                                                guide={false}
                                                // onChange={handleChange}
                                                // onBlur={handleBlur}
                                                className={
                                                    errors.number && touched.number
                                                        ? "form-control error"
                                                        : "form-control"
                                                }
                                            />}
                                        </Field>
                                        <FieldError>
                                            {errors.number && touched.number ? errors.number : null}
                                        </FieldError>
                                    </div>
                                </div>
                                <div className="form-group mb-0">
                                    <Field id="message" name="message" className="form-control" rows="5" maxLength="200" placeholder="Digite a mensagem que o seu cliente irá ver ao abrir o link. Exemplo: Olá, tenho interesse em seus produtos..." as="textarea" />
                                    <FieldError>
                                        {errors.message && touched.message ? errors.message : null}
                                    </FieldError>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className={`btn btn-${link_generated.link_shortened ? 'dark' : 'success'} btn-generate-link font-weight-bold w-100`} disabled={isSubmitting}>{isSubmitting ? 'Gerando link encurtado...' : link_generated.link_shortened ? 'Gerar novamente' : 'Gerar Link'}</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    {link_generated.link_shortened &&
                        <div className="my-4">
                            <span className="d-block text-center h5">Link gerado 🔗</span>
                            <div className="form-group">
                                <div className={`form-control h-auto generated-link copy-link no-resize text-truncate text-center ${link_generated.copied ? 'copied-link' : ''}`} onClick={() => copiarLink()}>
                                    {link_generated.link_shortened}
                                    <MdContentCopy className="icon" />
                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                    <button className={`btn btn-${link_generated.copied ? 'dark' : 'success'} px-3 px-md-5 copy-link mx-2 font-weight-bold`} onClick={() => copiarLink()}>{link_generated.copied ? 'Link copiado 😉' : 'Copiar'}</button>
                                    <a className='btn btn-dark font-weight-bold px-3 px-md-5 mx-2' href={link_generated.link_shortened} target="_blank" rel="noreferrer">Abrir</a>
                                </div>
                            </div>
                            <div className="py-3">
                                <QrCode link={link_generated.link_shortened} code={link_generated.link_code} />
                            </div>
                        </div>
                    }
                    <section className="container mt-5 p-0 text-center">
                        <h2 className="font-weight-normal h6">Está com dúvidas ou quer dicas de uso? </h2>
                        <p>Visite a nossa seção <Link href="/como-usar"><a className="text-primary font-weight-bold">Como usar</a></Link></p>
                    </section>
                </div>
                <div className={styles.right}>
                    <Ads client="ca-pub-3150319769695783" slot="7320586004" name="home-2" />
                </div>
            </div>
        </div>
    )
}
