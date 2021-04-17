import Head from 'next/head';
import Link from 'next/link';
// import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import copy from 'copy-to-clipboard';
import MaskedInput from "react-text-mask";
import Header from '@/components/Header';
import { MdContentCopy } from "react-icons/md";
import QrCode from '@/components/QrCode';
import { countryMask, numberMask } from "@/lib/masks";
import generateLink from "@/services/generateLink";
import FieldError from '@/components/FieldError';
import { AdsLeft, AdsRight } from '@/components/Ads';

const gerarLinkSchema = Yup.object().shape({
    number: Yup.string()
        .min(15, 'Número incompleto')
        .max(16, 'Número inválido')
        .required('Digite um número'),
    countryCode: Yup.string().required('Obrigatório'),
    message: Yup.string().required('Digite uma mensagem').max(200, 'Máximo de 200 caracteres'),
});

export default function Home() {

    const [link_generated, setLinkGenerated] = useState({ link: '', link_shortened: '', copied: false, id: '', link_base: '', link_code: '' });

    const copiarLink = () => {
        if (link_generated.link_shortened) {
            copy(link_generated.link_shortened);
            setLinkGenerated({ ...link_generated, copied: true });
        }
    }

    const storeLink = (id) => {
        const previous = JSON.parse(localStorage.getItem('geradorlinkwhatsapp.links')) || [];
        localStorage.setItem('geradorlinkwhatsapp.links', JSON.stringify([...previous, id]));
    }

    return (
        <div className="container-fluid">
            <div className="container main p-0">
                <Head>
                    <title key="title">Gerador de Link para WhatsApp</title>
                    <meta key="description" name="description" content="Crie link encurtado para WhatsApp com QR Code de maneira fácil e compartilhe com seus clientes." />
                    <link key="canonical" rel="canonical" href="https://geradorlinkwhatsapp.com/" />
                </Head>
                <Header />
                <div className="row justify-content-center">
                    <div className="col-12 col-md-3 order-2 order-md-1">
                        <AdsLeft />
                    </div>
                    <div className="col-12 col-md-6 order-1 order-md-2">
                        <Formik
                            initialValues={{
                                countryCode: '+55',
                                number: '',
                                message: '',
                            }}
                            validationSchema={gerarLinkSchema}
                            onSubmit={async (values) => {

                                const response = await generateLink(values);
                                const { id, link_base, link_code, original, shortened } = response.data;
                                setLinkGenerated({ ...link_generated, link: original, link_shortened: shortened, copied: false, id, link_base, link_code })
                                storeLink(id);
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
                            <div className="row justify-content-center my-4">
                                <div className="col-12 col-md-6">
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
                                        <QrCode link={link_generated.link_shortened} />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-12 col-md-3 order-3 order-md-3">
                        <AdsRight />
                    </div>
                </div>
            </div>
            <section className="container mt-5 p-0 text-center">
                <h2 className="font-weight-normal h6">Está com dúvidas ou quer dicas de uso? </h2>
                <p>Visite a nossa seção <Link href="/como-usar"><a className="text-primary font-weight-bold">Como usar</a></Link></p>
            </section>
        </div>
    )
}
