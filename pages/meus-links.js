import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import myPublicLinks from '@/services/myPublicLinks'
import PulseLoader from 'react-spinners/PulseLoader'
import { Ads } from '@/components/Ads'
import ButtonDownloadQrCode from '@/components/ButtonDownloadQrCode'
import copy from 'copy-to-clipboard'

export default function MyLinks() {

    const [links, setLinks] = useState([])
    const [is_empty, setEmpty] = useState(false)
    const [is_loading, setLoading] = useState(true)
    const [last_copied_link, setLastCopiedLink] = useState('')

    useEffect(() => {
        const storage_links = JSON.parse(localStorage.getItem('linkwpp.links'));

        (async () => {
            if (storage_links) {
                const { data } = await myPublicLinks(storage_links)
                setLinks(data)
            }
            setEmpty(!storage_links) // TODO wtf is this??
            setLoading(false)
        })()


    }, [])

    const copiarLink = (link, uuid) => {
        copy(link)
        setLastCopiedLink(uuid)
    }

    return (
        <div className="container main p-0">
            <Head>
                <title key="title">Meus Links - Gerador de Link para Whats</title>
                <meta key="description" name="description" content="Visualizar quantidade de acessos, copiar o link novamente e baixar o QrCode." />
                <link key="canonical" rel="canonical" href="https://app.linkwpp.com/meus-links" />
            </Head>
            <Header title={<>Meus <span className="text-primary">links</span></>} description={<><span className="block mb-3">Meus links gerados</span><span className="small">Em breve você poderá fazer login em nossa plataforma para acompanhar as estatísticas com mais detalhes</span></>} />

            <div className="flex flex-col lg:flex-row justify-between gap-x-4">
                <div className="w-full lg:max-w-xs order-2 lg:order-1">
                    <Ads client="ca-pub-3150319769695783" slot="6780362663" name="meus-links-1" />
                </div>
                <div className="w-full lg:max-w-xl order-1 lg:order-2">
                    {is_loading && <div className="flex justify-center"><PulseLoader color="#37d662" /></div>}
                    {is_empty && (
                        <div className="flex flex-col justify-center items-center">
                            <h6 className="text-center bg-secondary p-3 rounded">Você ainda não gerou nenhum link recentemente</h6>
                            <Link href="/"><a className="btn btn-primary font-bold text-white">Gerar</a></Link>
                        </div>
                    )}
                    {links &&
                        (
                            <ul>
                                {links.map((link) => (
                                    <li className="bg-dark-foreground p-4 mb-3 rounded" key={link.uuid}>
                                        <div>
                                            <p>+{link.phone_country_code} {link.phone_number}</p>
                                            <p>{link.message}</p>
                                            <a className="rounded mb-0 my-2 text-white block" target="_blank" rel="noreferrer" href={`${link.base}/w/${link.code}`}>{`${link.base}/w/${link.code}`}</a>
                                            <span className="block mb-2">Acessos: <span className="font-bold text-primary">{link.opens_count}</span></span>
                                            <span>Criado em: {new Date(Date.parse(link.created_at)).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</span>
                                        </div>
                                        <div className="flex flex-wrap justify-around items-center mt-3">
                                            <button className={`btn btn-sm px-3 font-bold rounded ${last_copied_link == link.uuid ? 'btn-primary' : 'btn-dark'}`} onClick={() => copiarLink(`${link.base}/w/${link.code}`, link.uuid)}>
                                                {last_copied_link == link.uuid ? 'Copiado' : 'Copiar Link'}
                                            </button>
                                            <ButtonDownloadQrCode link={`${link.base}/w/${link.code}`} code={link.code} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                </div>
                <div className="w-full lg:max-w-xs order-3 lg:order-3">
                    <Ads client="ca-pub-3150319769695783" slot="7320586004" name="meus-links-2" />
                </div>
            </div>
        </div>
    )
}
