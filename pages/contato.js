import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import FieldError from '@/components/FieldError'
import Header from '@/components/Header'
import sendContato from '@/services/sendContato'
import * as Yup from 'yup'
import { numberMask } from '@/lib/masks'
import MaskedInput from 'react-text-mask'

const sendContatoSchema = Yup.object().shape({
    email: Yup.string()
        .email('E-mail deve ser válido')
        .max(100, 'Máximo 100 caracteres')
        .required('Obrigatório'),
    name: Yup.string()
        .max(50, 'Máximo 50 caracteres')
        .required('Digite seu nome'),
    city: Yup.string()
        .max(100, 'Máximo 100 caracteres')
        .required('Digite sua cidade'),
    uf: Yup.string()
        .max(100, 'Máximo 100 caracteres')
        .required('Digite seu estado'),
    phone_number: Yup.string()
        .max(50, 'Máximo 50 caracteres'),
    message: Yup.string().required('Digite sua mensagem').max(250, 'Máximo de 250 caracteres'),
})

export default function Contato() {
    return (
        <div className="container-fluid">
            <div className="container main p-0">
                <Head>
                    <title key="title">Contato - Gerador de Link para Whats</title>
                    <meta key="description" name="description" content="Envie sua mensagem para nós, sugestões ou dúvidas." />
                    <link key="canonical" rel="canonical" href="https://app.linkwpp.com/contato" />
                </Head>
                <Header title={<>Entre em <span className="text-primary">contato</span></>} description={<>Envie sua mensagem para nós, <span className="block">sugestões ou dúvidas.</span></>} />

                <Formik
                    initialValues={{
                        email: '',
                        name: '',
                        city: '',
                        uf: '',
                        phone_number: '',
                        message: '',
                    }}
                    validationSchema={sendContatoSchema}
                    onSubmit={async (values, actions) => {
                        const result = await sendContato(values)

                        if (result.status == 201) {
                            actions.resetForm({})
                            actions.setStatus({ success: true })
                        }
                    }}
                >
                    {({ errors, touched, isSubmitting, dirty, status }) => (
                        <Form>
                            <div className="row justify-center">
                                <div className="col-12 col-md-6">
                                    <div className="row m-0">
                                        <div className="col-12 px-0 col-md-5">
                                            <div className="form-group mb-0">
                                                <Field id="name" name="name" className="form-control" maxLength="100" placeholder="Seu nome" type="text" />
                                                <FieldError>
                                                    {errors.name && touched.name ? errors.name : null}
                                                </FieldError>
                                            </div>
                                        </div>
                                        <div className="col-12 px-0 col-md-7">
                                            <div className="form-group mb-0">
                                                <Field id="email" name="email" className="form-control" maxLength="100" placeholder="Seu e-mail" type="email" />
                                                <FieldError>
                                                    {errors.email && touched.email ? errors.email : null}
                                                </FieldError>
                                            </div>
                                        </div>
                                        <div className="col-6 px-0 col-md-5">
                                            <div className="form-group mb-0">
                                                <Field id="city" name="city" className="form-control" maxLength="100" placeholder="Cidade" type="text" />
                                                <FieldError>
                                                    {errors.city && touched.city ? errors.city : null}
                                                </FieldError>
                                            </div>
                                        </div>
                                        <div className="col-6 px-0 col-md-3">
                                            <div className="form-group mb-0">
                                                <Field id="uf" name="uf" className="form-control" maxLength="100" placeholder="Estado" type="text" />
                                                <FieldError>
                                                    {errors.uf && touched.uf ? errors.uf : null}
                                                </FieldError>
                                            </div>
                                        </div>
                                        <div className="col-12 px-0 col-md-4">
                                            <div className="form-group mb-0">
                                                <Field name="phone_number">
                                                    {({ field }) => <MaskedInput {...field} mask={numberMask} guide={false} id="phoneNumber" placeholder="Celular" type="tel" className="form-control"></MaskedInput>}
                                                </Field>
                                                <FieldError>
                                                    {errors.phone_number && touched.phone_number ? errors.phone_number : null}
                                                </FieldError>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-12 p-0">
                                            <div className="form-group mb-0">
                                                <Field id="message" name="message" className="form-control" rows="5" maxLength="200" placeholder="Sua mensagem" as="textarea" />
                                                <FieldError>
                                                    {errors.message && touched.message ? errors.message : null}
                                                </FieldError>
                                            </div>
                                            <div className="flex justify-center">
                                                <button type="submit" className={`btn btn-success btn-generate-link font-bold w-100`} disabled={isSubmitting}>{isSubmitting ? 'Enviando...' : 'Enviar'}</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center py-3 font-bold">
                                        {!!status && !!status.success && 'Contato Enviado'}
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
