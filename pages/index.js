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
import { API_GERADOR } from '../lib/api';

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

    const [link, setLink] = useState('');
    const [link_shortened, setLinkShortened] = useState('');
    const [copiado, setCopiado] = useState(false);

    const copiarLink = (link) => {
        copy(link);
        setCopiado(true);
    }

    const gerarLink = async ({ countryCode, number, message }) => {

        const res = await fetch(`${API_GERADOR}/link`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                "phone_country_code": countryCode.replace(/\D/g, ''),
                "phone_number": number.replace(/\D/g, ''),
                "message": message
            })
        });

        const { shortened, original } = await res.json();

        // const link = `https://api.whatsapp.com/send?phone=${countryCode.replace(/\D/g, '')}${number.replace(/\D/g, '')}&text=${encodeURI(message)}`;

        setLinkShortened(shortened);
        setLink(original);
    }

    return (
        <div className="container-fluid">
            <div className="container main">
                <Head>
                    <title key="title">Gerador de Link para WhatsApp</title>
                    <meta key="description" name="description" content="Crie links para WhatsApp com QR Code de maneira fácil e compartilhe com seus clientes." />
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
                        await gerarLink(values);
                        setCopiado(false);
                    }}
                >
                    {({ errors, touched, isSubmitting, dirty }) => (
                        <Form>
                            <div className="row justify-content-center mt-3 mt-md-4">
                                <div className="col-12 col-md-6">
                                    <div className="form-group mb-0 d-flex">
                                        <div className="flex-shrink-1 pr-3">
                                            <Field name="countryCode">
                                                {({ field }) => <MaskedInput {...field} mask={countryMask} guide={false} id="countryCode" type="text" className="form-control" size="3"></MaskedInput>}
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
                                                    type="text"
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
                                        <button type="submit" className={`btn btn-${link ? 'dark' : 'success'} btn-generate-link font-weight-bold w-100`} disabled={isSubmitting}>{link ? 'Gerar novamente' : 'Gerar Link'}</button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                {link_shortened &&
                    <div className="row justify-content-center my-4">
                        <div className="col-12 col-md-6">
                            <span className="d-block text-center h5">Link gerado 🔗</span>
                            <div className="form-group">
                                <div className={`form-control h-auto generated-link copy-link no-resize text-truncate ${copiado ? 'copied-link' : ''}`} onClick={() => copiarLink(link_shortened)}>
                                    {link_shortened}
                                    <MdContentCopy className="icon" />
                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                    <button className={`btn btn-${copiado ? 'dark' : 'success'} px-3 px-md-5 copy-link mx-2 font-weight-bold`} onClick={() => copiarLink(link_shortened)}>{copiado ? 'Link copiado 😉' : 'Copiar'}</button>
                                    <a className='btn btn-dark font-weight-bold px-3 px-md-5 mx-2' href={link_shortened} target="_blank" rel="noreferrer">Abrir</a>
                                </div>
                            </div>
                            <div className="py-3">
                                <QrCode link={link_shortened} />
                            </div>
                        </div>
                    </div>
                }
            </div>
            <footer className="mb-2 mt-4">
                <div className="d-flex flex-column align-items-end justify-content-end">
                    <Link href="/politica-privacidade"><a>Política de Privacidade</a></Link>
                    {/* <span className="small d-block">Nenhum dado será armazenado</span> */}
                    <span className="small d-block">Ver. 0.1.4</span>
                </div>
            </footer>
        </div>
    )
}
