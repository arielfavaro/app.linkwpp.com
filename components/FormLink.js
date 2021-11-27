import { useState } from 'react'
import { Formik, Field, Form } from 'formik'
import MaskedInput from 'react-text-mask'
import { MdContentCopy } from 'react-icons/md'
import * as Yup from 'yup'
import copy from 'copy-to-clipboard'
import { countryMask, numberMask } from '@/lib/masks'
import QrCode from '@/components/QrCode'
import FieldError from '@/components/FieldError'
import generateLink from '@/services/generateLink'
import styles from '@/styles/FormLink.module.css'

const gerarLinkSchema = Yup.object().shape({
    number: Yup.string()
        .min(15, 'Número incompleto')
        .max(16, 'Número inválido')
        .required('Digite um número'),
    countryCode: Yup.string().required('Obrigatório'),
    message: Yup.string().required('Digite uma mensagem').max(200, 'Máximo de 200 caracteres'),
})

export default function FormLink() {

    const [link_generated, setLinkGenerated] = useState({ link: '', link_shortened: '', copied: false, id: '', link_base: '', link_code: '' })

    const copiarLink = () => {
        if (link_generated.link_shortened) {
            copy(link_generated.link_shortened)
            setLinkGenerated({ ...link_generated, copied: true })
        }
    }

    const storeLink = (id) => {
        const previous = JSON.parse(localStorage.getItem('linkwpp.links')) || []
        localStorage.setItem('linkwpp.links', JSON.stringify([...previous, id]))
    }

    return (
        <>
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
                    <Form className="max-w-md m-auto">
                        <div className="flex gap-x-3">
                            <div>
                                <Field name="countryCode">
                                    {({ field }) => <MaskedInput {...field} mask={countryMask} guide={false} id="countryCode" placeholder="Cód. País" type="tel" className="form-control" size="3"></MaskedInput>}
                                </Field>
                                <FieldError>
                                    {errors.countryCode && touched.countryCode ? errors.countryCode : null}
                                </FieldError>
                            </div>
                            <div className="flex-grow">
                                <Field name="number">
                                    {({ field }) => <MaskedInput
                                        {...field}
                                        mask={numberMask}
                                        id="number"
                                        placeholder="Número"
                                        type="tel"
                                        guide={false}
                                        className="w-full"
                                    />}
                                </Field>
                                <FieldError>
                                    {errors.number && touched.number ? errors.number : null}
                                </FieldError>
                            </div>
                        </div>
                        <div>
                            <Field id="message" name="message" className="w-full" rows="5" maxLength="200" placeholder="Digite a mensagem que o seu cliente irá ver ao abrir o link. Exemplo: Olá, tenho interesse em seus produtos..." as="textarea" />
                            <FieldError>
                                {errors.message && touched.message ? errors.message : null}
                            </FieldError>
                        </div>
                        <div className="flex">
                            <button type="submit" className={`${link_generated.link_shortened ? 'btn-dark' : 'btn-primary'} btn-generate-link font-bold w-full`} disabled={isSubmitting}>{isSubmitting ? 'Gerando link encurtado...' : link_generated.link_shortened ? 'Gerar novamente' : 'Gerar Link'}</button>
                        </div>
                    </Form>
                )}
            </Formik>
            {link_generated.link_shortened &&
                <div className="max-w-md m-auto py-6">
                    <span className="block text-center text-xl mb-2">Link gerado 🔗</span>
                    <div>
                        <div className={`h-auto generated-link copy-link ${link_generated.copied ? 'copied' : ''}`} onClick={() => copiarLink()}>
                            {link_generated.link_shortened}
                            <MdContentCopy className="icon" />
                        </div>
                        <div className="flex mt-3 gap-x-4 justify-center">
                            <button
                                className={`${link_generated.copied ? 'btn-dark' : 'btn-primary'} px-5 copy-link`}
                                onClick={() => copiarLink()}
                            >
                                {link_generated.copied ? 'Link copiado 😉' : 'Copiar'}
                            </button>
                            <a className='btn-dark px-5'
                                href={link_generated.link_shortened}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Abrir
                            </a>
                        </div>
                    </div>
                    <div className="pt-8">
                        <QrCode link={link_generated.link_shortened} code={link_generated.link_code} />
                    </div>
                </div>
            }
        </>
    )
}