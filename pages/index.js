import Head from 'next/head';
import Link from 'next/link';
// import styles from '../styles/Home.module.css'
import { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import copy from 'copy-to-clipboard';
import MaskedInput from "react-text-mask";
import Header from '../components/Header';
import { MdContentCopy } from "react-icons/md";
import QrCode from '../components/QrCode';
import { countryMask, numberMask } from "../lib/masks";
import generateLink from "../services/generateLink";

const gerarLinkSchema = Yup.object().shape({
    number: Yup.string()
        .min(15, 'Número incompleto')
        .max(16, 'Número inválido')
        .required('Digite um número'),
    countryCode: Yup.string().required('Obrigatório'),
    message: Yup.string().required('Digite uma mensagem').max(200, 'Máximo de 200 caracteres'),
});

function FieldError({ children }) {
    return (
        <div className="text-warning field-error">{children}</div>
    )
}

export default function Home() {

    const [link_generated, setLinkGenerated] = useState({ link: '', link_shortened: '', copiado: false });

    const copiarLink = () => {
        if (link_generated.link_shortened) {
            copy(link_generated.link_shortened);
            setLinkGenerated({ ...link_generated, copiado: true });
        }
    }

    return (
        <div className="container-fluid">
            <div className="container main p-0">
                <Head>
                    <title key="title">Gerador de Link para WhatsApp</title>
                    <meta key="description" name="description" content="Crie links encurtado para WhatsApp com QR Code de maneira fácil e compartilhe com seus clientes." />
                    <link key="canonical" rel="canonical" href="https://geradorlinkwhatsapp.com/" />
                </Head>
                <Header />
                <Formik
                    initialValues={{
                        countryCode: '+55',
                        number: '',
                        message: '',
                    }}
                    validationSchema={gerarLinkSchema}
                    onSubmit={async (values) => {
                        await generateLink(values, { link_generated, setLinkGenerated });
                    }}
                >
                    {({ errors, touched, isSubmitting, dirty }) => (
                        <Form>
                            <div className="row justify-content-center mt-3 mt-md-4">
                                <div className="col-12 col-md-6">
                                    <div className="form-group mb-0 d-flex">
                                        <div className="flex-shrink-1 pr-3">
                                            <Field name="countryCode">
                                                {({ field }) => <MaskedInput {...field} mask={countryMask} guide={false} id="countryCode" type="tel" className="form-control" size="3"></MaskedInput>}
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
                                        <Field id="message" name="message" className="form-control" rows="5" maxLength="200" placeholder="Digite a mensagem que o seu cliente irá ver ao abrir o link" as="textarea" />
                                        <FieldError>
                                            {errors.message && touched.message ? errors.message : null}
                                        </FieldError>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className={`btn btn-${link_generated.link_shortened ? 'dark' : 'success'} btn-generate-link font-weight-bold w-100`} disabled={isSubmitting}>{isSubmitting ? 'Gerando link encurtado...' : link_generated.link_shortened ? 'Gerar novamente' : 'Gerar Link'}</button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                {link_generated.link_shortened &&
                    <div className="row justify-content-center my-4">
                        <div className="col-12 col-md-6">
                            <span className="d-block text-center h5">Link gerado 🔗</span>
                            <div className="form-group">
                                <div className={`form-control h-auto generated-link copy-link no-resize text-truncate text-center ${link_generated.copiado ? 'copied-link' : ''}`} onClick={() => copiarLink()}>
                                    {link_generated.link_shortened}
                                    <MdContentCopy className="icon" />
                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                    <button className={`btn btn-${link_generated.copiado ? 'dark' : 'success'} px-3 px-md-5 copy-link mx-2 font-weight-bold`} onClick={() => copiarLink()}>{link_generated.copiado ? 'Link copiado 😉' : 'Copiar'}</button>
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
            <footer className="mb-2 mt-4">
                <div className="d-flex flex-column align-items-end justify-content-end">
                    <Link href="/politica-privacidade"><a>Política de Privacidade</a></Link>
                    {/* <span className="small d-block">Nenhum dado será armazenado</span> */}
                    <span className="small d-block">Ver. 0.1.5</span>
                </div>
            </footer>
        </div>
    )
}
