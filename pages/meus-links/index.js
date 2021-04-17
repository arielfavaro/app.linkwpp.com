import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import myPublicLinks from "@/services/myPublicLinks";
import PulseLoader from "react-spinners/PulseLoader";

function MyLinks() {

    const [links, setLinks] = useState([]);
    const [is_empty, setEmpty] = useState(false);
    const [is_loading, setLoading] = useState(true);

    useEffect(async () => {
        const storage_links = JSON.parse(localStorage.getItem('geradorlinkwhatsapp.links'));
        if (storage_links) {
            const { data } = await myPublicLinks(storage_links);
            setLinks(data);
        }
        setEmpty(!storage_links);
        setLoading(false);
    }, []);

    return (
        <div className="container-fluid">
            <div className="container main p-0">
                <Head>
                    <title key="title">Meus Links - Gerador de Link para WhatsApp</title>
                    <meta key="description" name="description" content="Meus links" />
                    <link key="canonical" rel="canonical" href="https://geradorlinkwhatsapp.com/meus-links" />
                    <meta name="robots" content="noindex, nofollow" />
                </Head>
                <Header title={<>Meus <span className="text-primary">links</span></>} description={<><span className="d-block mb-3">Meus links gerados</span><span className="small">Em breve você poderá fazer login em nossa plataforma para acompanhar as estatísticas com mais detalhes</span></>} />

                {is_loading && <div className="d-flex justify-content-center"><PulseLoader color="#37d662" /></div>}
                {is_empty && (
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h6 className="text-center bg-secondary p-3 rounded">Você ainda não gerou nenhum link recentemente</h6>
                        <Link href="/"><a className="btn btn-primary font-weight-bold text-white">Gerar</a></Link>
                    </div>
                )}
                {links &&
                    (
                        <div className="row justify-content-center m-0">
                            <ul className="list-unstyled col-12 col-md-6">
                                {links.map((link) => (
                                    <li className="bg-secondary py-3 mb-3 rounded-sm row align-items-center justify-content-between text-center text-md-left" key={link.uuid}>
                                        <div className="flex-fill pr-3 col-12 col-md-9">
                                            <p className="h6">+{link.phone_country_code} {link.phone_number}</p>
                                            <p className="h6 font-weight-normal">{link.message}</p>
                                            <div className="border-bottom border-dark"></div>
                                            <a className="rounded mb-0 my-2 text-white d-block" target="_blank" href={`https://linkwpp.com/w/${link.code}`}>https://linkwpp.com/w/{link.code}</a>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <span className="d-block mb-2">Acessos: <span className="font-weight-bold text-primary h5">{link.opens_count}</span></span>
                                            <span>Criado em: {new Date(Date.parse(link.created_at)).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                }

            </div>
        </div >
    )
}

export default MyLinks;