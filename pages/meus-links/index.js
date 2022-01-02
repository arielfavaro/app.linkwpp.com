import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import myPublicLinks from "@/services/myPublicLinks";
import PulseLoader from "react-spinners/PulseLoader";
import { Ads } from "@/components/Ads";
import ButtonDownloadQrCode from "@/components/ButtonDownloadQrCode";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

function MyLinks() {

    const [links, setLinks] = useState([]);
    const [is_empty, setEmpty] = useState(false);
    const [is_loading, setLoading] = useState(true);
    const [last_copied_link, setLastCopiedLink] = useState('');

    useEffect(async () => {
        const storage_links = JSON.parse(localStorage.getItem('linkwpp.links'));
        if (storage_links) {
            try {
                const { data } = await myPublicLinks(storage_links);
                setLinks(data);
            } catch (error) {
                toast(`Erro ao obter os links`);
            }
        }
        setEmpty(!storage_links);
        setLoading(false);
    }, []);

    const copiarLink = (link, uuid) => {
        copy(link);
        setLastCopiedLink(uuid);
    }

    return (
        <div className="container-fluid">
            <div className="container main p-0">
                <Head>
                    <title key="title">Meus Links - Gerador de Link para whats</title>
                    <meta key="description" name="description" content="Visualizar quantidade de acessos, copiar o link novamente e baixar o QrCode." />
                    <link key="canonical" rel="canonical" href="https://app.linkwpp.com/meus-links" />
                </Head>
                <Header title={<>Meus <span className="text-primary">links</span></>} description={<><span className="d-block mb-3">Meus links gerados</span><span className="small">Em breve você poderá fazer login em nossa plataforma para acompanhar as estatísticas com mais detalhes</span></>} />

                <div className="row justify-content-between">
                    <div className="col-12 col-md-3 col-lg-3 order-2 order-md-1 mt-5 mt-md-0">
                        <Ads client="ca-pub-3150319769695783" slot="6780362663" name="meus-links-1" />
                    </div>
                    <div className="col-12 col-md-6 col-lg-5 order-1 order-md-2">
                        {is_loading && <div className="d-flex justify-content-center"><PulseLoader color="#37d662" /></div>}
                        {is_empty && (
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <h6 className="text-center bg-secondary p-3 rounded">Você ainda não gerou nenhum link recentemente</h6>
                                <Link href="/"><a className="btn btn-primary font-weight-bold text-white">Gerar</a></Link>
                            </div>
                        )}
                        {links &&
                            (
                                <ul className="list-unstyled">
                                    {links.map((link) => (
                                        <li className="bg-secondary py-3 mb-3 rounded-sm" key={link.uuid}>
                                            <div className="row m-0 align-items-center justify-content-between text-center text-md-left">
                                                <div className="flex-fill pr-3 col-12 col-md-9">
                                                    <p className="h6">+{link.phone_country_code} {link.phone_number}</p>
                                                    <p className="h6 font-weight-normal">{link.message}</p>
                                                    <div className="border-bottom border-dark"></div>
                                                    <a className="rounded mb-0 my-2 text-white d-block" target="_blank" href={`${link.base}/w/${link.code}`}>{`${link.base}/w/${link.code}`}</a>
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <span className="d-block mb-2">Acessos: <span className="font-weight-bold text-primary h5">{link.opens_count}</span></span>
                                                    <span>Criado em: {new Date(Date.parse(link.created_at)).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</span>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-wrap justify-content-around align-items-center mt-3">
                                                <button className={`btn btn-sm px-3 font-weight-bold rounded ${last_copied_link == link.uuid ? 'btn-success' : 'btn-dark'}`} onClick={() => copiarLink(`${link.base}/w/${link.code}`, link.uuid)}>
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
                    <div className="col-12 col-md-3 col-lg-3 order-3 order-md-3 mt-5 mt-md-0">
                        <Ads client="ca-pub-3150319769695783" slot="7320586004" name="meus-links-2" />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MyLinks;